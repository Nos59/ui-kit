<script setup lang="ts">
    import Cancel from '@/assets/img/icon/cancel.svg'
    import { InputTypeHTMLAttribute, computed, defineModel, ref } from 'vue'
    import { UiLoader } from '@/components/UiLoader'

    interface InputProps {
        label?: string,
        placeholder?: string,
        clearable?: boolean,
        disabled?: boolean,
        readonly?: boolean,
        loading?: boolean,
        width?: string,
        type?: InputTypeHTMLAttribute,
        error?: string,
    }

    const props = withDefaults(defineProps<InputProps>(), {
        label: '',
        placeholder: '',
        clearable: false,
        disabled: false,
        readonly: false,
        loading: false,
        width: '100%',
        type: 'text',
        error: ''
    })

    const input = ref<HTMLInputElement>()
    const modelValue = defineModel<string | number | undefined>({ required: true })
    const isRemoveIconVisible = computed<boolean>(() => {
        return props.clearable && !props.disabled && !!modelValue.value
    })

    const clearInput = () => {
        modelValue.value = ''
    }
    defineExpose({
        input
    })
</script>

<template>
    <div
        class="ui-input"
        :class="{ 'ui-input--disabled': props.disabled, 'ui-input--loading': props.loading, 'ui-input--error': !!props.error }"
        :style="{ width: props.width }"
    >
        <label class="ui-input__label" :class="{ 'ui-input__label--active': modelValue }">
            {{ props.label }}
        </label>
        <div class="ui-input__inner">
            <div v-if="$slots.left" class="ui-input__control">
                <slot name="left"/>
            </div>

            <input
                ref="input"
                v-model="modelValue"
                class="ui-input__field"
                :disabled="props.disabled"
                :type="props.type"
                :readonly="props.readonly"
                :placeholder="props.placeholder"
            />

            <div v-if="$slots.right || props.loading || isRemoveIconVisible" class="ui-input__control" tabindex="0">
                <Cancel v-if="isRemoveIconVisible" class="ui-input__clearable" @click.stop="clearInput"/>
                <slot name="right"/>
                <UiLoader v-if="props.loading" :size="20" :stroke="3"/>
            </div>
        </div>
        <Transition>
            <div v-if="!!props.error" class="ui-input__error">
                {{ props.error }}
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
    .ui-input {
        font-size: 14px;
        position: relative;
        background-color: $color-white;
        height: 40px;

        &__label {
            font-size: 13px;
            position: absolute;
            left: 12px;
            top: 12px;
            padding: 0 7px;
            color: $color-black-opacity-5;
            transform-origin: 0 0;
            transition: all 0.2s ease-in-out;
            background-color: inherit;
            pointer-events: none;
            z-index: 1;
        }

        &__label--active {
            transform: translateY(-20px);
        }

        &__inner {
            background-color: inherit;
            border: 1px solid $color-grey-60;
            position: relative;
            display: flex;
            @include roundCorners-l();
            gap: 8px;
            padding: 0 12px 0 16px;
            overflow: hidden;
            height: 100%;
            color: $color-black;
        }

        &__control {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        &__field {
            background-color: transparent;
            outline: none;
            border: unset;
            transition: .2s all ease-in-out;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            color: inherit;
            padding: 0;
        }

        &__clearable {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: $color-danger-100;
        }

        &__error {
            padding: 10px 16px;
            color: $color-danger-100;
            background-color: $color-danger-opacity-1;
            @include roundCorners-s();
            margin-top: 2px;
        }

        &--disabled {
            pointer-events: none;
            opacity: .5;
        }

        &--loading {
            pointer-events: none;
        }

        &:focus-within:not(.ui-input--error) {
            .ui-input__inner {
                border-color: $color-secondary-100;
                box-shadow: 0 0 0 1px $color-secondary-100;
            }

            .ui-input__label {
                transform: translateY(-20px);
                color: $color-secondary-100;
            }

            input::placeholder {
                color: $color-black-opacity-5;
            }
        }

        &--disabled {
            pointer-events: none;
            opacity: .5;
        }

        &--error {
            .ui-input__inner {
                border-color: $color-danger-100;
                box-shadow: 0 0 0 1px $color-danger-100;
            }

            .ui-input__label {
                transform: translateY(-20px);
                color: $color-danger-100;
            }
        }

        input::placeholder {
            user-select: none;
            color: transparent;
        }

        @include transition-down();
    }
</style>
