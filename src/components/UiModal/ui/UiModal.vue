<script setup lang="ts">
    import Cancel from '@/assets/img/icon/cancel.svg'
    import { defineModel } from 'vue'
    import { vOnClickOutside } from '@vueuse/components'

    const modelValue = defineModel<boolean>({ default: false })

    const close = () => {
        modelValue.value = false
    }
</script>

<template>
    <Teleport to="body">
        <div v-if="modelValue" class="ui-modal-mask">
            <div class="ui-modal"  v-on-click-outside="close">
                <div class="ui-modal__header">
                    <slot name="header"/>
                </div>

                <div class="ui-modal__body">
                    <slot/>
                </div>

                <div class="ui-modal__footer">
                    <slot name="footer"/>
                </div>

                <div class="ui-modal__close">
                    <Cancel @click="close"/>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
    .ui-modal-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $color-grey-opacity-3;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .ui-modal {
        z-index: 1001;
        position: relative;
        background-color: $color-white;
        display: grid;
        grid-template-rows: min-content 1fr min-content;
        min-width: 450px;
        min-height: 450px;
        box-shadow: $shadow-medium-20;
        padding: 30px;
        border-radius: 8px;

        &__close {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            padding: 8px;
            cursor: pointer;
        }
    }
</style>
