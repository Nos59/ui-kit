<script setup lang="ts">
    import Arrow from '@/assets/img/icon/arrow.svg'
    import { UiInput } from '@/components/UiInput'
    import { UiPopover } from '@/components/UiPopover'
    import { computed, defineModel, ref } from 'vue'

    interface Option {
        id: string | number;
        label: string
    }

    interface SelectProps {
        label?: string,
        disabled?: boolean,
        width?: string,
        loading?: boolean,
        options?: Option[],
        error?: string,
    }
    const props = withDefaults(defineProps<SelectProps>(), {
        label: 'Выберите значения',
        disabled: false,
        loading: false,
        width: '100%',
        options: () => [],
        error: ''
    })

    const modelValue = defineModel<string | number | undefined>({ required: true })
    const isOptionsVisible = ref<boolean>(false)
    const input = ref<InstanceType<typeof UiInput>>(null)
    const name = computed<string>(() => {
        const item = props.options.find(item => item.id === modelValue.value)
        return item?.label || ''
    })

    const selectItem = (id: string | number) => {
        modelValue.value = id
        input.value.input.blur()
        isOptionsVisible.value = false
    }
</script>

<template>
    <div
        class="ui-select"
        :class="{ 'ui-select--disabled': props.disabled }"
    >
        <UiPopover
            v-model="isOptionsVisible"
            ref="popover"
            :offset="8"
            :style="{ width: props.width }"
            :position="['bottom']"
        >
            <template #trigger="{ togglePopover }">
                <UiInput
                    ref="input"
                    :model-value="name"
                    :label="props.label"
                    :loading="props.loading"
                    :disabled="props.disabled"
                    :error="props.error"
                    readonly
                    class="ui-select__input"
                    @click="togglePopover"
                >
                    <template #right>
                        <Arrow
                            class="ui-select__arrow"
                            :class="{'ui-select__arrow--rotate': isOptionsVisible}"
                            v-if="!props.loading"
                        />
                    </template>
                </UiInput>
            </template>
            <template #content="{ trigger }">
                <div class="ui-select__option" :style="{ width: trigger.width + 'px' }">
                    <div
                        v-for="item in props.options"
                        :key="item.id"
                        @click="selectItem(item.id)"
                        @mousedown.prevent="input.input.focus()"
                        class="ui-select__option-item text-overflow"
                    >
                        {{ item.label }}
                    </div>
                    <div v-if="props.options.length === 0" class="ui-select__option--empty">
                        Нет данных
                    </div>
                </div>
            </template>
        </UiPopover>
    </div>
</template>


<style lang="scss" scoped>
    .ui-select {
        font-size: 15px;
        min-width: 200px;

        &__option {
            background-color: $color-white;
            border: 1px solid $color-grey-60;
            z-index: 2000;
            display: flex;
            flex-direction: column;
            max-height: 250px;
            min-height: 38px;
            overflow: auto;
            border-radius: 12px;

            &-item {
                padding: 7px 16px;
                min-height: 38px;
                cursor: pointer;
                &:hover {
                    background-color: $color-grey-20;
                }
            }

            &--empty {
                padding: 7px 16px;
                min-height: 38px;
                color: $color-black-opacity-5;
            }
        }

        &--disabled {
            pointer-events: none;
        }

        &__arrow {
            transition: all .2s ease-out;
            transform: rotate(90deg);
        }

        &__arrow--rotate {
            transform: rotate(-90deg);
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
