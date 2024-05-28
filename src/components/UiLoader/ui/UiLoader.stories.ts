import type { Meta, StoryObj } from '@storybook/vue3'

import UiLoader from './UiLoader.vue'

const meta: Meta<typeof UiLoader> = {
    title: 'UiLoader',
    component: UiLoader
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        size: 50,
        stroke: 7
    }
}
