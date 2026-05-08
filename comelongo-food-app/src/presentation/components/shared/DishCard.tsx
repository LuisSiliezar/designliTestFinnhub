import React from 'react';
import { Image, Text, View } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import ScoreBadge from './ScoreBadge';
import type { DishCardProps } from '@infrastructure/interfaces';

const SHADOW = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
};

const DishCard = ({ name, image, score, restaurantName, city, onPress }: DishCardProps) => (
    <AnimatedPressable
        onPress={onPress}
        className="bg-paper rounded-lg border border-border overflow-hidden"
        style={SHADOW}
    >
        <View className="h-44 bg-warm-gray relative">
            {image && <Image source={{ uri: image }} className="w-full h-full" />}
            {typeof score === 'number' && (
                <View className="absolute top-2.5 right-2.5">
                    <ScoreBadge score={score} size={44} showLabel={false} />
                </View>
            )}
        </View>
        <View className="p-3.5">
            {restaurantName && (
                <Text className="font-ui text-[11px] font-bold text-muted tracking-wider mb-1">
                    {restaurantName.toUpperCase()}
                </Text>
            )}
            <Text className="font-ui text-base font-bold text-ink" numberOfLines={1}>
                {name}
            </Text>
            {city && (
                <Text className="font-ui text-xs text-muted mt-0.5">{city}</Text>
            )}
        </View>
    </AnimatedPressable>
);

export default DishCard;
