<template>
    <div ref="popover" class="ui-popover">
        <Teleport to="body">
            <Transition name="fade">
                <div
                    v-if="isVisible"
                    ref="popup"
                    class="ui-popover-popup"
                    :style="{ transform: `translate(${getLeftCoordinate(positionAvailable, props.offset)}px, ${getTopCoordinate(positionAvailable, props.offset)}px)`}"
                    v-on-click-outside="clickOutside"
                >
                    <div class="ui-popover-popup__content">
                        <slot name="content" v-bind="{ togglePopover, showPopover, hidePopover, trigger, isVisible, position:positionAvailable }"/>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <slot name="trigger" v-bind="{ togglePopover, showPopover, hidePopover, trigger, isVisible, position:positionAvailable }"/>
    </div>
</template>

<script setup lang="ts">
    import { Position } from '@/components/UiPopover'
    import { computed, defineModel, ref, watch } from 'vue'
    import { useDebounceFn } from '@vueuse/core'
    import { usePopover } from '../lib/popover'
    import { vOnClickOutside } from '@vueuse/components'

    interface PopoverProps {
        disableClickAway?: boolean,
        offset?: number;
        position?: Position[];
    }

    const props = withDefaults(defineProps<PopoverProps>(), {
        disableClickAway: false,
        offset: 0,
        position: () => ['bottom']
    })

    const modelValue = defineModel<boolean>({ default: false })

    const popover = ref<HTMLElement>()
    const popup = ref<HTMLElement>()
    const { getLeftCoordinate, getTopCoordinate, trigger, isPositionAvailable } = usePopover(popover, popup)
    const isVisible = ref<boolean>(false)

    watch(() => modelValue.value, (value) => {
        isVisible.value = value
    })

    const showPopover = () => {
        isVisible.value = true
        modelValue.value = true
    }

    const hidePopover = useDebounceFn(() => {
        isVisible.value = false
        modelValue.value = false
    }, 1)

    const togglePopover  = () => {
        isVisible.value = !isVisible.value
        modelValue.value = isVisible.value
    }

    const clickOutside = () => {
        if (!props.disableClickAway) {
            hidePopover()
        }
    }

    const positionAvailable = computed( () => {
        return props.position.reduceRight((acc, item) => {
            if (isPositionAvailable(item, props.offset)) {
                acc = item
            }
            return acc
        })
    })
</script>

<style lang="scss" scoped>
    .ui-popover {
        width: max-content;
        &-popup {
            position: absolute;
            top: 0;
            left: 0;
            background-color: $color-white;
            box-shadow: 0 3px 8px 0 rgba(31, 59, 160, 0.25);
            z-index: 4000;
            border-radius: 12px;
            &__content {
                height: 100%;
                max-height: inherit;
                max-width: inherit;
            }
        }
    }

    .fade {
        &-enter-active,
        &-leave-active {
            transition: opacity .3s ease-out;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
</style>
