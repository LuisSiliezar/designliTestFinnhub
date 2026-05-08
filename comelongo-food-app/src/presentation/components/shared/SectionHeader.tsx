import React from 'react';
import { Text, View } from 'react-native';
import AnimatedPressable from './AnimatedPressable';

interface Props {
    label: string;
    actionLabel?: string;
    onAction?: () => void;
    eyebrow?: boolean;
    serif?: boolean;
}

const SectionHeader = ({ label, actionLabel, onAction, eyebrow, serif }: Props) => {
    let labelClass = 'font-ui text-base font-bold text-ink tracking-tight';
    if (eyebrow) labelClass = 'font-ui text-[13px] font-bold text-muted tracking-wider';
    if (serif) labelClass = 'font-display text-[22px] text-ink tracking-tighter';

    return (
        <View className="flex-row items-baseline justify-between px-5 py-2.5">
            <Text className={labelClass}>
                {eyebrow ? label.toUpperCase() : label}
            </Text>
            {actionLabel && (
                <AnimatedPressable onPress={onAction}>
                    <Text className="font-ui text-[13px] font-bold text-orange">
                        {actionLabel}
                    </Text>
                </AnimatedPressable>
            )}
        </View>
    );
};

export default SectionHeader;
