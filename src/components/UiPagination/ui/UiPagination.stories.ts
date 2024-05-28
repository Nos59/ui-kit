import UiPagination from './UiPagination.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof UiPagination> = {
    title: 'UiPagination',
    component: UiPagination
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        perPage: 10,
        size: 7,
        total: 100,
        page: 1
    }
}
