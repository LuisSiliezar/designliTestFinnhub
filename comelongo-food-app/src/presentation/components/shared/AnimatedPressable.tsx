import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
    className?: string;
    scaleTo?: number;
    haptic?: boolean;
}

const AnimatedPressable = ({
    children,
    onPressIn,
    onPressOut,
    scaleTo = 0.96,
    style,
    ...rest
}: Props) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <AnimatedPressableBase
            {...rest}
            onPressIn={(e) => {
                scale.value = withSpring(scaleTo, { damping: 18, stiffness: 220 });
                opacity.value = withTiming(0.85, { duration: 90 });
                onPressIn?.(e);
            }}
            onPressOut={(e) => {
                scale.value = withSpring(1, { damping: 16, stiffness: 200 });
                opacity.value = withTiming(1, { duration: 120 });
                onPressOut?.(e);
            }}
            style={[animatedStyle, style as any]}
        >
            {children as any}
        </AnimatedPressableBase>
    );
};

export default AnimatedPressable;
