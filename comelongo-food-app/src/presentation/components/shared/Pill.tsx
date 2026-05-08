import React from 'react';
import { Text, ViewStyle } from 'react-native';
import AnimatedPressable from './AnimatedPressable';

interface PillProps {
    label: string;
    onPress?: () => void;
    primary?: boolean;
    selected?: boolean;
    dark?: boolean;
    style?: ViewStyle;
}

const Pill = ({ label, onPress, primary, selected, dark, style }: PillProps) => {
    const bgClass = primary
        ? 'bg-orange border-orange'
        : selected
            ? 'bg-ink border-ink'
            : dark
                ? 'bg-white/10 border-white/15'
                : 'bg-paper border-border';

    const textClass = primary || selected
        ? 'text-paper'
        : dark
            ? 'text-paper'
            : 'text-ink';

    return (
        <AnimatedPressable
            onPress={onPress}
            className={`self-start rounded-pill border px-3.5 py-2 ${bgClass}`}
            style={style}
        >
            <Text className={`font-ui text-[13px] font-semibold tracking-tight ${textClass}`}>
                {label}
            </Text>
        </AnimatedPressable>
    );
};

export default Pill;
