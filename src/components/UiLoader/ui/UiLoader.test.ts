import UiLoader from './UiLoader.vue'
import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'

describe('UiLoader', () => {
    test('should be render', () => {
        const wrapper = shallowMount(UiLoader)

        expect(wrapper.classes()).toContain('ui-loader')
    })
})
