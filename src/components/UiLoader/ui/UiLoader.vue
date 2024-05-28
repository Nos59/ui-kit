<script setup lang="ts">
    import { computed } from 'vue'

    interface LoaderProps {
        size?: number,
        stroke?: number,
    }

    const props = withDefaults(defineProps<LoaderProps>(), {
        size: 50,
        stroke: 7
    })

    const loaderStyle = computed(() => {
        return [
            { 'width' : `${props.size}px` },
            { 'height' : `${props.size}px` },
            { 'border-width' : `${props.stroke}px` }
        ]
    })
</script>

<template>
    <div class="ui-loader">
        <div class="ui-loader__circle" :style="loaderStyle"/>
    </div>
</template>

<style lang="scss" scoped>
    .ui-loader {
        display: inline-block;
        vertical-align: middle;

        &__circle {
            border-radius: 50%;
            border-style: solid;
            border-color: $color-secondary-opacity-1;
            border-left-color: $color-secondary-100;
            animation: ui-loader 1s infinite linear;
        }
    }

    @keyframes ui-loader {
        0% {
            transform:rotate(0deg)
        }
        to {
            transform:rotate(1turn)
        }
    }
</style>

