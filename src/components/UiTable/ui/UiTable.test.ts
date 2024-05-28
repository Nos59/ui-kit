import UiTable from './UiTable.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiTable', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiTable, {
            props: {
                headers: [],
                rows: [],
                loading: false
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-table')
    })
})
