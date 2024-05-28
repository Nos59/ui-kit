import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
moment.locale('ru')

/**
 * хук для управления состоянием календаря
 */
export const useCalendar = () => {
    const today = moment().format('DD.MM.YYYY')

    /**
     * Возвращает массив дат для текущего месяца
     * @param {Moment.moment} date - Дата, для которой нужно получить массив.
     * @returns {object[]} Массив объектов, содержащих день, месяц, неделю и дату каждого дня в месяце.
     */
    const getDaysRange = (date) => {
        const start = moment(date).startOf('month').startOf('isoWeek')
        const end = moment(date).endOf('month').endOf('isoWeek')
        const range = moment.range(start, end)
        return Array.from(range.by('days')).map(item => {
            return {
                day: item.format('DD'),
                month: item.format('MMMM'),
                week: item.format('ddd'),
                hide: moment(date).get('month') !== item.get('month'),
                date: item.format('DD.MM.YYYY')
            }
        })
    }

    /**
     * Возвращает массив месяцев для текущего года.
     * @param {Moment.moment} date - Дата, для которой нужно получить месяцы.
     * @returns {object[]} Массив объектов, содержащих месяц и год для каждого месяца в году.
     */
    const getMonthsRange = (date) => {
        const start = moment(date).startOf('year')
        const end = moment(date).endOf('year')
        const range = moment.range(start, end)
        return Array.from(range.by('month')).map(item => {
            return {
                month: item.format('MMMM'),
                year: item.format('YYYY')
            }
        })
    }

    const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

    return {
        today,
        getDaysRange,
        getMonthsRange,
        week
    }
}
