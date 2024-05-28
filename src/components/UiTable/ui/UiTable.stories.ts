import UiTable from './UiTable.vue'
import { headers, rows } from '@/mocks/table'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof UiTable> = {
    title: 'UiTable',
    component: UiTable
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        headers: headers,
        rows: rows,
        loading: false
    }
}
