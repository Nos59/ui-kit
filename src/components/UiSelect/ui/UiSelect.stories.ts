import type { Meta, StoryObj } from '@storybook/vue3'

import UiSelect from './UiSelect.vue'

const meta: Meta<typeof UiSelect> = {
    title: 'UiSelect',
    component: UiSelect
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'label',
        disabled: false,
        width: '100%',
        loading: false,
        options: [{ id: 1, label: '123' }, { id: 2, label: '456' }, { id: 3, label: '789' }],
        error: ''
    }
}
