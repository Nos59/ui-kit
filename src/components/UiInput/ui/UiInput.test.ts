import UiInput from './UiInput.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'


describe('UiInput', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiInput, {
            props: {
                label: 'label',
                placeholder: 'placeholder',
                clearable: true,
                disabled: false,
                readonly: false,
                loading: false,
                width: '100%',
                type: 'text',
                error: 'test error',
                modelValue: 'test value',
                'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-input')
        expect(wrapper.find('.ui-input__label').text()).toBe('label')
        expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder')
        expect(wrapper.classes()).toContain('ui-input--error')
    })

    test('modelValue should be update', async () => {
        await wrapper.find('input').setValue('New Test Value')
        expect(wrapper.props('modelValue')).toBe('New Test Value')
    })

    test('should update input field type when props change', async () => {
        await wrapper.setProps({ type: 'password' })
        expect(wrapper.find('input').attributes('type')).toBe('password')
    })

    test('should show loading icon when loading is true', async () => {
        await wrapper.setProps({ loading: true })
        expect(wrapper.find('.ui-loader').exists()).toBe(true)
    })

    test('should apply and display the input field error attribute', async () => {
        await wrapper.setProps({ error: 'new test error' })
        expect(wrapper.find('.ui-input__error').text()).toBe('new test error')
    })

    test('should apply and display the input field disabled attribute', async () => {
        await wrapper.setProps({ disabled: true })
        expect(wrapper.classes()).toContain('ui-input--disabled')
    })

    test('should clear the input field value when click', async () => {
        await wrapper.find('.ui-input__clearable').trigger('click')
        expect(wrapper.find('input').element.value).toBe('')
        expect(wrapper.props('modelValue')).toBe('')
    })
})
