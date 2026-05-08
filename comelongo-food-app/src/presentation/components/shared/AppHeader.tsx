import React from 'react';
import { Text, View } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import Icon, { IconName } from './Icon';

interface Props {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightIcons?: { name: IconName; onPress?: () => void; badge?: boolean }[];
    serif?: boolean;
}

const ICON_BTN = 'w-10 h-10 rounded-full items-center justify-center bg-paper border border-border relative';

const AppHeader = ({ title = 'Comelongo', showBack, onBack, rightIcons = [], serif = true }: Props) => (
    <View className="flex-row items-center justify-between px-3 py-2.5 bg-cream">
        {showBack ? (
            <AnimatedPressable onPress={onBack} className={ICON_BTN}>
                <Icon name="chevron-left" size={22} />
            </AnimatedPressable>
        ) : (
            <View className={ICON_BTN.replace('bg-paper border border-border', 'bg-transparent')} />
        )}

        <Text
            className={
                serif
                    ? 'font-display italic text-2xl text-ink'
                    : 'font-ui text-lg font-bold text-ink'
            }
        >
            {title}
        </Text>

        <View className="flex-row gap-2">
            {rightIcons.map((r, i) => (
                <AnimatedPressable key={i} onPress={r.onPress} className={ICON_BTN}>
                    <Icon name={r.name} size={20} />
                    {r.badge && (
                        <View className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-orange border-[1.5px] border-paper" />
                    )}
                </AnimatedPressable>
            ))}
            {rightIcons.length === 0 && (
                <View className={ICON_BTN.replace('bg-paper border border-border', 'bg-transparent')} />
            )}
        </View>
    </View>
);

export default AppHeader;
