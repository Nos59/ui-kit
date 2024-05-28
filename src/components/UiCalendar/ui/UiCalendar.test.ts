import UiCalendar from './UiCalendar.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiCalendar', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiCalendar, {
            props: {
                minDate: '01.01.1900',
                maxDate: '01.01.3000'
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-calendar')
    })
})
