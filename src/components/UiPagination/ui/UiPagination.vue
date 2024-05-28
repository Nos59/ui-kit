<script setup lang="ts">
    import Arrow from '@/assets/img/icon/arrow.svg'
    import { computed, defineModel } from 'vue'

    interface PaginationProps {
        perPage?: number,
        size?: number,
        total?: number
    }

    const props = withDefaults(defineProps<PaginationProps>(), {
        perPage: 10,
        size: 7,
        total: 100
    })

    const page = defineModel<number>('page', { default: 1 })

    const totalPages = computed(() => {
        return Math.ceil(props.total / props.perPage)
    })

    const pages = computed(() => {
        if (props.size >= totalPages.value) {
            return range(1, totalPages.value)
        }

        const middlePages = Math.floor((props.size - 4) / 2)
        const leftLimit = 3 + middlePages
        const rightLimit = totalPages.value - 2 - middlePages

        if (page.value <= leftLimit) {
            return [...range(1, props.size - 2), '...', totalPages.value]
        }

        if (page.value >= rightLimit) {
            return [1, '...', ...range(rightLimit - middlePages, props.size - 2)]
        }

        return [1, '...', ...range(page.value - middlePages, props.size - 4), '...', totalPages.value]

    })

    const range = (start: number, count: number) => {
        return Array.from({ length: count }, (_, index) => start + index)
    }

    const paginate = (value: number) => {
        page.value = value
    }

    const next = () => {
        if (page.value < totalPages.value) {
            page.value = page.value + 1
        }
    }

    const prev = () => {
        if (page.value > 1) {
            page.value = page.value - 1
        }
    }
</script>

<template>
    <div class="ui-pagination">
        <div class="ui-pagination__item ui-pagination__item--select">
            <Arrow class="ui-pagination__arrow-left" @click="prev"/>
        </div>
        <template v-for="item in pages" :key="item">
            <div class="ui-pagination__item" v-if="item === '...'">{{ item }}</div>
            <div
                class="ui-pagination__item ui-pagination__item--select"
                v-else
                @click="paginate(Number(item))"
                :class="[{'ui-pagination__item--active': item === page}]">
                {{ item }}
            </div>
        </template>
        <div class="ui-pagination__item ui-pagination__item--select">
            <Arrow class="ui-pagination__arrow-right" @click="next"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ui-pagination {
        display: flex;
        gap: 5px;

        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            user-select: none;
            &--select {
                cursor: pointer;

                &:hover {
                    color: $color-primary-100;
                }
            }

            &--active {
                background-color: #13263933;
            }
        }

        &__arrow-left {
            rotate: 180deg;
        }

        &__arrow-right {
            rotate: 0deg;
        }
    }
</style>
