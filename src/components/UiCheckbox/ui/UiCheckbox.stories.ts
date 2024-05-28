import type { Meta, StoryObj } from '@storybook/vue3'

import UiCheckbox from './UiCheckbox.vue'

const meta: Meta<typeof UiCheckbox> = {
    title: 'UiCheckbox',
    component: UiCheckbox,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'warning', 'danger', 'success'],
            control: { type: 'radio' }
        },
        label: {
            control: { type: 'text' }
        },
        disabled: {
            control: { type: 'boolean' }
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'primary',
        label: 'label',
        disabled: false
    }
}


