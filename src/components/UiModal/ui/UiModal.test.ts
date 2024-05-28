import UiModal from './UiModal.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'


describe('UiModal', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiModal, {
            props: {
                modelValue: false,
                'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
            },
            global: {
                stubs: {
                    teleport: true
                }
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', async () => {
        await wrapper.setProps({ modelValue: true })
        expect(wrapper.find('.ui-modal-mask').exists()).toBe(true)
        expect(wrapper.find('.ui-modal').exists()).toBe(true)
    })
})
