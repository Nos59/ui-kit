<script setup lang="ts">
    import ArrowLeft from '@/assets/img/icon/arrow-left.svg'
    import ArrowRight from '@/assets/img/icon/arrow-right.svg'
    import moment from 'moment'
    import { UiButton } from '../../UiButton/index'
    import { computed, defineModel, ref } from 'vue'
    import { useCalendar } from '../lib/calendar'

    interface CalendarProps {
        minDate?: string
        maxDate?: string
    }

    const props = withDefaults(defineProps<CalendarProps>(), {
        minDate: '01.01.1900',
        maxDate: '01.01.3000'
    })

    const { getDaysRange, today, week, getMonthsRange } = useCalendar()

    const modelValue = defineModel<string>()

    const date = ref<moment.Moment>(moment(modelValue.value || today, 'DD.MM.YYYY'))
    const rangeDays = computed(() => getDaysRange(date.value))
    const rangeMonths = computed(() => getMonthsRange(date.value))

    const transitionName = ref<string>('')
    const transitionSectionName = ref<string>('')

    const section = ref<string>('months')
    const changeSection = () => {
        transitionSectionName.value = section.value ==='months' ? 'back' : 'forward'
        section.value = section.value ==='months' ? 'years' : 'months'
    }

    const isBetween = (date: string) => {
        const min = moment(props.minDate, 'DD.MM.YYYY')
        const max = moment(props.maxDate, 'DD.MM.YYYY')
        return moment(date, 'DD.MM.YYYY').isBetween(min, max)
    }

    const minusDate = () => {
        transitionName.value = 'right'
        date.value = date.value.clone().add(-1, section.value)
    }
    const plusDate = () => {
        transitionName.value = 'left'
        date.value = date.value.clone().add(1, section.value)
    }
    const setDate = (value: number) => {
        date.value = date.value.clone().set(section.value, value)
    }
    const selectMonth = (value: number) => {
        changeSection()
        setDate(value)
    }
    const selectDate = (value) => {
        modelValue.value = value
    }
</script>

<template>
    <div class="ui-calendar">
        <div class="ui-calendar__control">
            <div class="ui-calendar__control-icon">
                <ArrowLeft @click="minusDate"/>
            </div>
            <UiButton ghost @click.stop="changeSection">
                <span class="ui-calendar__control-title">{{ section ==='years'? date.format('YYYY') : date.format('MMMM YYYY') }}</span>
            </UiButton>
            <div class="ui-calendar__control-icon">
                <ArrowRight @click="plusDate"/>
            </div>
        </div>
        <Transition :name="transitionSectionName">
            <TransitionGroup
                v-if="section === 'months'"
                :name="transitionName"
                class="ui-calendar__days"
                tag="div"
            >
                <div v-for="item in week" :key="item" class="ui-calendar__week">
                    {{ item }}
                </div>
                <div
                    v-for="(item, index) in rangeDays"
                    :key="index + item.date"
                    class="ui-calendar__days-item"
                    :class="{
                        'ui-calendar__days--inactive': item.hide,
                        'ui-calendar__days--disabled': !isBetween(item.date),
                        'ui-calendar__days--today': item.date === today,
                        'ui-calendar__days--active': item.date === modelValue
                    }"
                    @click.stop="selectDate(item.date)"
                >
                    {{ item.day }}
                </div>
            </TransitionGroup>
            <TransitionGroup
                v-else-if="section === 'years'"
                :name="transitionName"
                class="ui-calendar__months"
                tag="div"
            >
                <div
                    v-for="(item, index) in rangeMonths"
                    :key="item.month + item.year"
                    class="ui-calendar__months-item"
                    @click="selectMonth(index)"
                >
                    {{ item.month }}
                </div>
            </TransitionGroup>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
    .ui-calendar {
        width: 285px;
        height: 325px;
        padding: 20px;
        display: grid;
        grid-template-rows: min-content 1fr;
        align-items: center;
        justify-content: center;
        gap: 16px;
        font-size: 14px;

        &__control {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 244px;
            color: $color-black;
            text-transform: capitalize;

            &-title {
                text-transform: capitalize;
            }

            &-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: $color-primary-100;

                &:active {
                    transform: translate3d(0, 1px, 0);
                    box-shadow: none;
                }
            }
        }
        &__week {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            color: $color-black;
            text-transform: uppercase;
            user-select: none;
        }
        &__days {
            display: grid;
            align-items: center;
            justify-content: center;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;

            &-item {
                width: 30px;
                height: 30px;
                user-select: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;

                &:hover {
                    color: $color-white;
                    background-color:$color-primary-100;
                }
            }

            &--today {
                border: 1px solid $color-primary-100;
            }

            &--inactive {
                color: $color-grey-30;
                pointer-events: none;
            }

            &--active {
                background-color: $color-primary-100;
                color: $color-white;
            }

            &--disabled {
                color: $color-black-opacity-3;
                pointer-events: none;
                text-decoration: line-through;
            }
        }
        &__months {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            font-size: 14px;
            font-weight: 400;

            &-item {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 4px 5px;
                cursor: pointer;
                text-transform: capitalize;
            }
        }
    }

    .right-enter-active, .left-enter-active {
        transition: all .5s;
    }

    .right-leave-active {
        opacity: 0;
        position: absolute;
    }

    .right-enter-from {
        transform: translateX(-50px);
        opacity: 0;
    }

    .left-leave-active {
        opacity: 0;
        position: absolute;
    }

    .left-enter-from {
        transform: translateX(50px);
        opacity: 0;
    }

    .forward-enter-active, .back-enter-active {
        transition: all .5s;
    }

    .forward-leave-active {
        transform: scale(1.5);
        opacity: 0;
    }

    .forward-enter-from {
        transform: scale(.5);
        opacity: 0;
    }

    .back-leave-active {
        transform: scale(.5);
        opacity: 0;
    }

    .back-enter-from {
        transform: scale(1.5);
        opacity: 0;
    }

</style>
