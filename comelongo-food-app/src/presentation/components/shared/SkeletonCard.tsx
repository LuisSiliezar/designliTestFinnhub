import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

const Shimmer = ({ className = '' }: { className?: string }) => {
    const opacity = useSharedValue(0.55);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, { duration: 850, easing: Easing.inOut(Easing.ease) }),
            -1,
            true,
        );
    }, [opacity]);

    const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

    return (
        <Animated.View
            style={style}
            className={`bg-warm-gray ${className}`}
        />
    );
};

const SkeletonCard = () => (
    <View className="bg-paper rounded-lg border border-border mx-4 my-2 p-3.5">
        <Shimmer className="h-52 rounded-md mb-3" />
        <Shimmer className="h-3 rounded-md my-1" />
        <Shimmer className="h-3 rounded-md my-1 w-1/2" />
    </View>
);

export default SkeletonCard;
