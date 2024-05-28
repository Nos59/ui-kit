import UiSelect from './UiSelect.vue'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

describe('UiSelect', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(UiSelect, {
            props: {
                label: 'label',
                disabled: false,
                loading: false,
                width: '100%',
                options: [],
                error: '',
                modelValue: undefined,
                'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should be render', () => {
        expect(wrapper.classes()).toContain('ui-select')
    })
})
