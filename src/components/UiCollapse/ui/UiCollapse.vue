<script setup lang="ts">
    import Arrow from '@/assets/img/icon/arrow.svg'
    import { ref } from 'vue'

    interface CollapseProps {
        title?: string
        width?: string
    }

    const props = withDefaults(defineProps<CollapseProps>(), {
        title: '',
        width: '100%'
    })

    const isOpen = ref<boolean>(false)
    const toggleShow = () => {
        isOpen.value =!isOpen.value
    }
</script>

<template>
    <div class="ui-collapse" :class="{'ui-collapse--opened': isOpen}" :style="{ width: props.width }">
        <div class="ui-collapse__header" @click.self="toggleShow">
            <slot name="title" @click="toggleShow">{{ props.title }}</slot>
            <Arrow @click="toggleShow"/>
        </div>
        <div class="ui-collapse__body">
            <div class="ui-collapse__content">
                <slot/>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .ui-collapse {
        font-size: 14px;
        color: $color-black;
        user-select: none;

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            svg {
                rotate: 90deg;
                transition: all .2s ease-out;
            }
        }

        &__body {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows .2s ease-in-out;
        }

        &__content {
            overflow: hidden;
        }

        &--opened {
            .ui-collapse__header {
                svg {
                    rotate: -90deg;
                }
            }
            .ui-collapse__body {
                grid-template-rows: 1fr;
            }
        }
    }
</style>
