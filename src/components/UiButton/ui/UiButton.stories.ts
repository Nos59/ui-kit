import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from './UiButton.vue'

const meta: Meta<typeof UiButton> = {
    title: 'UiButton',
    component: UiButton,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'warning', 'danger', 'success'],
            control: { type: 'radio' }
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'primary',
        outline: false,
        ghost: false,
        loading: false,
        disabled: false
    },
    render: (args) => ({
        components: { UiButton },
        setup() {
            return { args }
        },
        template: '<UiButton v-bind="args">Button</UiButton>'
    })
}
