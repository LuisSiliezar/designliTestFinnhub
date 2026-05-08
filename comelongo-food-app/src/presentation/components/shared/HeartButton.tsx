import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from './Icon';

interface Props {
    initialLikes?: number;
    onToggle?: (liked: boolean) => void;
}

const HeartButton = ({ initialLikes = 0, onToggle }: Props) => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialLikes);
    const scale = useSharedValue(1);

    const onPress = () => {
        const next = !liked;
        setLiked(next);
        setCount(c => c + (next ? 1 : -1));
        scale.value = withSequence(
            withSpring(1.4, { damping: 4, stiffness: 220 }),
            withTiming(1, { duration: 140 }),
        );
        onToggle?.(next);
    };

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable hitSlop={6} onPress={onPress} className="flex-row items-center gap-1.5">
            <Animated.View style={style}>
                <Icon
                    name="heart"
                    size={20}
                    color={liked ? '#FF5B1F' : '#0E0E0E'}
                />
            </Animated.View>
            <Text className="font-ui text-[13px] font-semibold text-ink">
                {count}
            </Text>
        </Pressable>
    );
};

export default HeartButton;
