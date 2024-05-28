import UiButton from './UiButton.vue'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiButton', () => {
    test('should be render', () => {
        const wrapper = mount(UiButton, {
            slots: {
                default: 'Button'
            }
        })

        expect(wrapper.text()).toEqual('Button')
        expect(wrapper.classes()).toContain('ui-button')
    })
})
