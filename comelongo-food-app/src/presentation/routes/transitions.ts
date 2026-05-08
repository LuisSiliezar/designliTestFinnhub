import { Easing } from 'react-native';
import {
    StackCardInterpolationProps,
    TransitionSpec,
} from '@react-navigation/stack/lib/typescript/src/types';

const SPRING: TransitionSpec = {
    animation: 'spring',
    config: {
        stiffness: 220,
        damping: 26,
        mass: 1,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const TIMING = (duration = 240): TransitionSpec => ({
    animation: 'timing',
    config: {
        duration,
        easing: Easing.out(Easing.cubic),
    },
});

export const slideFadeFromRight = ({
    current,
    next,
    layouts: { screen },
}: StackCardInterpolationProps) => ({
    cardStyle: {
        transform: [
            {
                translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screen.width, 0],
                }),
            },
            {
                scale: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.96],
                    })
                    : 1,
            },
        ],
        opacity: current.progress.interpolate({
            inputRange: [0, 0.6, 1],
            outputRange: [0, 0.9, 1],
        }),
    },
    overlayStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.35],
        }),
    },
});

export const fadeUp = ({ current, layouts: { screen } }: StackCardInterpolationProps) => ({
    cardStyle: {
        transform: [
            {
                translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screen.height * 0.06, 0],
                }),
            },
        ],
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    },
});

export const modalSlideUp = ({
    current,
    layouts: { screen },
}: StackCardInterpolationProps) => ({
    cardStyle: {
        transform: [
            {
                translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screen.height, 0],
                }),
            },
        ],
    },
    overlayStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
        }),
    },
});

export const transitionSpec = {
    open: SPRING,
    close: TIMING(220),
};

export const fadeTransitionSpec = {
    open: TIMING(280),
    close: TIMING(220),
};
