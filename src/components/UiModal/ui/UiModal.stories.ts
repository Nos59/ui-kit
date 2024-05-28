import UiButton from '@/components/UiButton/ui/UiButton.vue'
import UiModal from '@/components/UiModal/ui/UiModal.vue'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof UiModal> = {
    title: 'UiModal',
    component: UiModal
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        components: { UiButton, UiModal },
        setup() {
            const show = ref<boolean>(false)
            return { show }
        },
        template: '<UiButton @click="show = true">Button</UiButton><UiModal v-model="show"/>'
    })
}
