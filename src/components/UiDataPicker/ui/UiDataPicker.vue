<script setup lang="ts">
    import Plus from '@/assets/img/icon/plus.svg'
    import { UiCalendar } from '@/components/UiCalendar'
    import { UiInput } from '@/components/UiInput'
    import { UiPopover } from '@/components/UiPopover'
    import { defineModel, ref } from 'vue'

    interface DataPickerProps {
        label?: string,
        disabled?: boolean,
        width?: string,
        error?: string,
        minDate?: string,
        maxDate?: string
    }

    const props = withDefaults(defineProps<DataPickerProps>(), {
        label: 'Выберите дату',
        disabled: false,
        width: '100%',
        error: '',
        minDate: undefined,
        maxDate: undefined
    })

    const modelValue = defineModel<string | undefined>({ required: true })
    const isOptionsVisible = ref<boolean>(false)
    const input = ref<InstanceType<typeof UiInput>>(null)

    const selectDate = (value) => {
        modelValue.value = value
        input.value.input.blur()
        isOptionsVisible.value = false
    }
</script>

<template>
    <div
        class="ui-date-picker"
        :class="{ 'ui-date-picker--disabled': props.disabled }"
    >
        <UiPopover
            :offset="8"
            v-model="isOptionsVisible"
            :style="{ width: props.width }"
            :position="['bottom']"
        >
            <template #trigger="{ showPopover }">
                <UiInput
                    ref="input"
                    v-model="modelValue"
                    :label="props.label"
                    :disabled="props.disabled"
                    readonly
                    @click="showPopover"
                >
                    <template #right>
                        <Plus/>
                    </template>
                </UiInput>
            </template>
            <template #content>
                <UiCalendar
                    :modelValue="modelValue"
                    :max-date="props.maxDate"
                    :min-date="props.minDate"
                    @mousedown.prevent="input.input.focus()"
                    @update:model-value="selectDate"
                />
            </template>
        </UiPopover>
    </div>
</template>

<style lang="scss" scoped>
    .ui-date-picker {
        &--disabled {
            pointer-events: none;
        }

        &:deep(.ui-input) {
            .ui-input__inner {
                cursor: pointer;
            }
            .ui-input__field {
                cursor: pointer;
                user-select: none;
            }
        }
    }
</style>
