import type { Meta, StoryObj } from '@storybook/vue3'

import UiCalendar from './UiCalendar.vue'

const meta: Meta<typeof UiCalendar> = {
    title: 'UiCalendar',
    component: UiCalendar,
    argTypes: {
        minDate: {
            control: { type: 'text' }
        },
        maxDate: {
            control: { type: 'text' }
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        minDate: '01.01.2000',
        maxDate: '01.01.2100'
    }
}
