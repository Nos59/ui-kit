import type { Meta, StoryObj } from '@storybook/vue3'

import UiInput from './UiInput.vue'

const meta: Meta<typeof UiInput> = {
    title: 'UiInput',
    component: UiInput
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'label',
        placeholder: 'placeholder',
        clearable: false,
        disabled: false,
        loading: false,
        error: '',
        width: '100%',
        type: 'text'
    }
}
