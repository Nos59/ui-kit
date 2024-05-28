import UiCollapse from './UiCollapse.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiCollapse', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiCollapse, {
            props: {
                title: '',
                width: '100%'
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-collapse')
    })
})
