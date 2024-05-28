import { reactive } from 'vue'
import { useElementBounding } from '@vueuse/core'
export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>

/**
 * Возвращает объект с методами для вычисления позиции всплывающего окна относительно триггерного элемента и для проверки доступности позиции.
 * @param {HTMLElement} popover - Элемент, представляющий popover.
 * @param {HTMLElement} popup - Элемент, представляющий всплывающее окно.
 */
export const usePopover = (popover: HTMLElement, popup: HTMLElement) => {
    const trigger = reactive<UseElementBoundingReturn>(useElementBounding(popover))
    const content = reactive<UseElementBoundingReturn>(useElementBounding(popup))
    const container = reactive<UseElementBoundingReturn>(useElementBounding(document.querySelector('body')))


    const getLeftCoordinate = (position: string, offset: number = 0): number => {
        const pos = new Set(position.split('-'))
        trigger.update()
        const getLeft = () => {
            if (pos.has('left')) return trigger.left - content.width - offset
            if (pos.has('right')) return trigger.right + offset
            if (pos.has('start')) return trigger.left
            if (pos.has('end')) return trigger.right - content.width
            return trigger.left + trigger.width / 2 - content.width / 2
        }
        return Math.round(getLeft())
    }

    const getTopCoordinate = (position: string, offset: number = 0): number => {
        const pos = new Set(position.split('-'))
        trigger.update()
        const getTop = () => {
            if (pos.has('top')) return trigger.top - content.height - offset
            if (pos.has('bottom')) return trigger.bottom + offset
            if (pos.has('start')) return trigger.top
            if (pos.has('end')) return trigger.bottom - content.height
            return trigger.top + trigger.height / 2 - content.height / 2
        }
        return Math.round(getTop())
    }

    const isPositionAvailable = (position: string, offset: number = 0): boolean => {
        const cordsTop: number = getTopCoordinate(position, offset)
        const coordsLeft: number = getLeftCoordinate(position, offset)
        return (
            cordsTop > 0 &&
            coordsLeft > 0 &&
            container.height > cordsTop + content.height + offset &&
            container.width > coordsLeft + content.width + offset
        )
    }

    return {
        getLeftCoordinate,
        getTopCoordinate,
        isPositionAvailable,
        trigger,
        content
    }
}
