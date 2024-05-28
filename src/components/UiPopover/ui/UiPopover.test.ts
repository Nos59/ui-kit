import UiPopover from './UiPopover.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiPopover', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiPopover, {
            props: {
                offset: 0,
                position: ['bottom'],
                disableClickAway: false
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-popover')
    })
})
