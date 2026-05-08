import React from 'react';
import { FlatList } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import CategoryChip from '@presentation/components/shared/CategoryChip';
import type { Category } from '@domain/entities';

interface Props {
    categories: Category[];
    onPressCategory?: (category: Category) => void;
}

const CategoryList = ({ categories, onPressCategory }: Props) => (
    <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
            <Animated.View entering={FadeInRight.delay(index * 50).duration(300)}>
                <CategoryChip category={item} onPress={() => onPressCategory?.(item)} />
            </Animated.View>
        )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        showsHorizontalScrollIndicator={false}
    />
);

export default CategoryList;
