import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { scoreColor } from '@presentation/theme';
import type { ScoreBadgeProps } from '@infrastructure/interfaces';

const AnimatedScoreBadge = ({ score, size = 56, showLabel = true }: ScoreBadgeProps) => {
    const color = scoreColor(score);
    const pulse = useSharedValue(1);

    useEffect(() => {
        pulse.value = withSequence(
            withSpring(1.12, { damping: 6, stiffness: 220 }),
            withTiming(1, { duration: 160 }),
        );
    }, [score, pulse]);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    return (
        <Animated.View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderColor: color,
                },
                style,
            ]}
            className="bg-paper border-[1.5px] items-center justify-center"
        >
            <Text
                style={{ color, fontSize: size * 0.42 }}
                className="font-display"
            >
                {score.toFixed(1)}
            </Text>
            {showLabel && size >= 50 && (
                <Text className="font-ui text-[8px] text-subtle font-semibold tracking-wider mt-px">
                    /10
                </Text>
            )}
        </Animated.View>
    );
};

export default AnimatedScoreBadge;
