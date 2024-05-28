<script setup lang="ts">
    import { defineModel } from 'vue'

    interface Checkbox {
        label?: ''
        variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success'
        disabled?: false
    }

    const props = withDefaults(defineProps<Checkbox>(), {
        label: '',
        variant: 'primary',
        disabled: false
    })

    const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
    <div class="ui-checkbox" :class="{'ui-checkbox--disabled': props.disabled}" @click="modelValue = !modelValue">
        <div
            class="ui-checkbox__checkbox"
            :class="[`ui-checkbox__checkbox--${props.variant}`,{'ui-checkbox__checkbox--checked': modelValue}]"
        >
            <div v-show="modelValue" class="ui-checkbox__checkbox-mark"/>
        </div>
        <span class="ui-checkbox__label">
            <slot>{{ props.label }}</slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .ui-checkbox {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        cursor: pointer;
        height: 20px;
        width: min-content;
    }

    .ui-checkbox input {
        display: none;
    }

    .ui-checkbox__checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: .2s all ease-in-out;
        height: 16px;
        width: 16px;
        border: 1px solid $color-grey-40;
    }

    .ui-checkbox__checkbox-mark {
        width: 16px;
        height: 16px;
        margin-top: 2px;
        background-repeat: no-repeat;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 1 19 18" fill="none"><path d="M4 7.71143L7 10.7114L12 5.71143" stroke="%23F8F8FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    }

    .ui-checkbox__label {
        display: flex;
        align-items: center;
        color: $color-black;
        text-overflow: ellipsis;
        white-space: nowrap;
        user-select: none;
        gap: 5px;
    }

    .ui-checkbox--disabled {
        pointer-events: none;
    }
    .ui-checkbox--disabled .ui-checkbox__checkbox {
        border-color: $color-grey-40;
    }

    .ui-checkbox--disabled .ui-checkbox__checkbox.ui-checkbox__checkbox--checked {
        background-color: $color-grey-40;
    }

    .ui-checkbox__checkbox--primary.ui-checkbox__checkbox:hover {
        border-color: $color-primary-100;
    }

    .ui-checkbox__checkbox--primary.ui-checkbox__checkbox--checked {
        border-color: $color-primary-100;
        background-color: $color-primary-100;
    }

    .ui-checkbox__checkbox--secondary.ui-checkbox__checkbox:hover {
        border-color: $color-secondary-100;
    }

    .ui-checkbox__checkbox--secondary.ui-checkbox__checkbox--checked {
        border-color: $color-secondary-100;
        background-color: $color-secondary-100;
    }

    .ui-checkbox__checkbox--warning.ui-checkbox__checkbox:hover {
        border-color: $color-orange-100;
    }

    .ui-checkbox__checkbox--warning.ui-checkbox__checkbox--checked {
        border-color: $color-orange-100;
        background-color: $color-orange-100;
    }

    .ui-checkbox__checkbox--danger.ui-checkbox__checkbox:hover {
        border-color: $color-danger-100;
    }

    .ui-checkbox__checkbox--danger.ui-checkbox__checkbox--checked {
        border-color: $color-danger-100;
        background-color: $color-danger-100;
    }

    .ui-checkbox__checkbox--success.ui-checkbox__checkbox:hover {
        border-color: $color-green-100;
    }

    .ui-checkbox__checkbox--success.ui-checkbox__checkbox--checked {
        border-color: $color-green-100;
        background-color: $color-green-100;
    }
</style>
