import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from './Icon';

interface Props {
    onToggle?: (saved: boolean) => void;
    size?: number;
    color?: string;
}

const SaveButton = ({ onToggle, size = 20, color = '#0E0E0E' }: Props) => {
    const [saved, setSaved] = useState(false);
    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    const onPress = () => {
        const next = !saved;
        setSaved(next);
        scale.value = withSequence(
            withSpring(1.3, { damping: 5, stiffness: 240 }),
            withTiming(1, { duration: 140 }),
        );
        rotate.value = withSequence(
            withTiming(next ? -10 : 10, { duration: 80 }),
            withSpring(0, { damping: 8 }),
        );
        onToggle?.(next);
    };

    const style = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotateZ: `${rotate.value}deg` },
        ],
    }));

    return (
        <Pressable hitSlop={8} onPress={onPress}>
            <Animated.View style={style}>
                <Icon name="bookmark" size={size} color={saved ? '#FF5B1F' : color} />
            </Animated.View>
        </Pressable>
    );
};

export default SaveButton;
