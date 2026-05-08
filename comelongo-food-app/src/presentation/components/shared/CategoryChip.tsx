import React from 'react';
import { Image, Text, View } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import type { Category } from '@domain/entities';

interface Props {
    category: Category;
    onPress?: () => void;
}

const CategoryChip = ({ category, onPress }: Props) => (
    <AnimatedPressable onPress={onPress} className="w-24 items-center">
        <View className="w-20 h-20 rounded-lg overflow-hidden bg-warm-gray border border-border">
            {category.image && (
                <Image source={{ uri: category.image }} className="w-full h-full" />
            )}
        </View>
        <Text
            className="mt-2 font-ui text-xs font-bold text-ink text-center"
            numberOfLines={1}
        >
            {category.name}
        </Text>
    </AnimatedPressable>
);

export default CategoryChip;
