import UiDataPicker from './UiDataPicker.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiDataPicker', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiDataPicker, {
            props: {
                label: 'label',
                disabled: false,
                width: '100%',
                error: '',
                minDate: undefined,
                maxDate: undefined,
                modelValue: undefined,
                'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-date-picker')
    })
})
