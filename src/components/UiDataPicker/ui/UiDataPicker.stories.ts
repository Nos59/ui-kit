import type { Meta, StoryObj } from '@storybook/vue3'

import UiDataPicker from './UiDataPicker.vue'

const meta: Meta<typeof UiDataPicker> = {
    title: 'UiDataPicker',
    component: UiDataPicker
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'label',
        disabled: false,
        width: '100%',
        error: '',
        minDate: undefined,
        maxDate: undefined
    }
}


