import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from '@/components/UiButton/ui/UiButton.vue'
import UiPopover from './UiPopover.vue'
import { ref } from 'vue'

const meta: Meta<typeof UiPopover> = {
    title: 'UiPopover',
    component: UiPopover,
    argTypes: {
        position: {
            options: ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
            control: { type: 'multi-select' }
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        offset: 0,
        position: ['bottom'],
        disableClickAway: false
    },
    render: (args) => ({
        components: { UiButton, UiPopover },
        setup() {
            return { args }
        },
        template:
            '<UiPopover v-bind="args">' +
                '<template #trigger="{ togglePopover }"><UiButton @click="togglePopover">Trigger</UiButton></template>' +
                '<template #content><div>123</div><div>456</div><div>789</div></template>' +
            '</UiPopover>'
    })
}

export const WithModel: Story = {
    args: {
        offset: 0,
        position: 'bottom',
        disableClickAway: false
    },
    render: (args) => ({
        components: { UiButton, UiPopover },
        setup() {
            const show = ref<boolean>(false)
            return { args, show }
        },
        template:
            '{{ show }}' +
            '<UiPopover v-bind="args" v-model="show">' +
                '<template #trigger="{ togglePopover }"><UiButton @click="togglePopover">Trigger</UiButton></template>' +
                '<template #content><div>123</div><div>456</div><div>789</div></template>' +
            '</UiPopover>'
    })
}
