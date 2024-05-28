import UiCheckbox from './UiCheckbox.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiCheckbox', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiCheckbox, {
            props: {
                label: 'label',
                variant: 'primary',
                disabled: false
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-checkbox')
    })
})
