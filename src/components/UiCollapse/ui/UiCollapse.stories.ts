import type { Meta, StoryObj } from '@storybook/vue3'

import UiCollapse from './UiCollapse.vue'

const meta: Meta<typeof UiCollapse> = {
    title: 'UiCollapse',
    component: UiCollapse
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Title',
        width: '100%'
    },
    render: (args) => ({
        components: { UiCollapse },
        setup() {
            return { args }
        },
        template: '<UiCollapse v-bind="args">Content</UiCollapse>'
    })
}


