<script setup lang="ts">
    import { UiLoader } from '../../UiLoader/index'
    import { computed } from 'vue'

    interface ButtonProps {
        outline?: boolean
        ghost?: boolean
        loading?: boolean
        disabled?: boolean
        variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success'
    }

    const props = withDefaults(defineProps<ButtonProps>(), {
        outline: false,
        ghost: false,
        loading: false,
        disabled: false,
        variant: 'primary'
    })

    const buttonClass = computed(() => {
        return [
            { 'ui-button--disabled': props.disabled },
            { 'ui-button--loading': props.loading },
            { 'ui-button--outline': props.outline },
            { 'ui-button--ghost': props.ghost },
            `ui-button--${props.variant}`
        ]
    })
</script>

<template>
    <button
        class="ui-button"
        :class="buttonClass"
        :tabindex="0"
        role="button"
    >
        <div class="ui-button__content">
            <div class="ui-button__label">
                <slot/>
            </div>
        </div>

        <UiLoader
            v-if="props.loading"
            :size="24"
            :stroke="3"
        />
    </button>
</template>

<style lang="scss" scoped>
    .ui-button {
        position: relative;
        display: inline-flex;
        flex: 0 1 auto;
        outline: 0;
        text-decoration: none;
        user-select: none;
        border: 1px solid transparent;
        @include roundCorners-l();
        cursor: pointer;
        font-size: 14px;
        padding: 9px 16px;
        font-weight: normal;
        vertical-align: bottom;
        height: 40px;

        &--disabled {
            cursor: default;
            pointer-events: none;
            opacity: 0.4;
            box-shadow: none;
        }

        &--loading {
            cursor: default;
            pointer-events: none;

            .ui-button__content {
                opacity: 0;
            }
        }

        &--outline {
            background-color: transparent;
            box-shadow: none;

            &:active {
                transform: none;
            }
        }

        &--ghost {
            height: min-content;
            padding: 0;
            border: none;
            background-color: transparent;
            box-shadow: none;
        }

        &__content {
            align-items: center;
            border-radius: inherit;
            color: inherit;
            display: flex;
            height: 100%;
            flex: 1 0 auto;
            justify-content: center;
            margin: 0 auto;
            white-space: nowrap;
        }

        &__label {
            white-space: nowrap;
        }

        .ui-loader {
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%,-50%);
        }

        &:active {
            transform: translate3d(0, 1px, 0);
            box-shadow: none;
        }

        &--primary {
            color: $color-white;
            background-color: $color-primary-90;

            &:hover {
                background-color: $color-primary-100;
            }

            &.ui-button--outline {
                color: $color-primary-90;
                border-color: $color-primary-90;
                background-color: transparent;

                &:hover {
                    background-color: $color-primary-100;
                    border-color: $color-primary-100;
                    color: $color-white
                }
            }

            &.ui-button--ghost {
                color: $color-primary-90;
                background-color: transparent;

                &:hover {
                    color: $color-primary-100;
                }
            }
        }

        &--secondary {
            color: $color-white;
            background-color: $color-secondary-90;

            &:hover {
                background-color: $color-secondary-100;
            }

            &.ui-button--outline {
                color: $color-secondary-90;
                border-color: $color-secondary-90;
                background-color: transparent;

                &:hover {
                    background-color: $color-secondary-100;
                    border-color: $color-secondary-100;
                    color: $color-white
                }
            }

            &.ui-button--ghost {
                color: $color-secondary-90;
                background-color: transparent;

                &:hover {
                    color: $color-secondary-100;
                }
            }
        }

        &--warning {
            color: $color-white;
            background-color: $color-orange-90;

            &:hover {
                background-color: $color-orange-100;
            }

            &.ui-button--outline {
                color: $color-orange-90;
                border-color: $color-orange-90;
                background-color: transparent;

                &:hover {
                    background-color: $color-orange-100;
                    border-color: $color-orange-100;
                    color: $color-white
                }
            }

            &.ui-button--ghost {
                color: $color-orange-90;
                background-color: transparent;

                &:hover {
                    color: $color-orange-100;
                }
            }
        }

        &--danger {
            color: $color-white;
            background-color: $color-danger-90;

            &:hover {
                background-color: $color-danger-100;
            }

            &.ui-button--outline {
                color: $color-danger-90;
                border-color: $color-danger-90;
                background-color: transparent;

                &:hover {
                    background-color: $color-danger-100;
                    border-color: $color-danger-100;
                    color: $color-white
                }
            }

            &.ui-button--ghost {
                color: $color-danger-90;
                background-color: transparent;

                &:hover {
                    color: $color-danger-100;
                }
            }
        }

        &--success {
            color: $color-white;
            background-color: $color-green-90;

            &:hover {
                background-color: $color-green-100;
            }

            &.ui-button--outline {
                color: $color-green-90;
                border-color: $color-green-90;
                background-color: transparent;

                &:hover {
                    background-color: $color-green-100;
                    border-color: $color-green-100;
                    color: $color-white
                }
            }

            &.ui-button--ghost {
                color: $color-green-90;
                background-color: transparent;

                &:hover {
                    color: $color-green-100;
                }
            }
        }
    }
</style>
