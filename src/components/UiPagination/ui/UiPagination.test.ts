import UiPagination from './UiPagination.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiPagination', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiPagination, {
            props: {
                perPage: 10,
                size: 7,
                total: 100,
                page: 1
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-pagination')
    })
})
