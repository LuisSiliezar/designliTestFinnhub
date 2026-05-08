import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
        renderItem={({ item }) => (
            <CategoryChip category={item} onPress={() => onPressCategory?.(item)} />
        )}
        horizontal
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
    />
);

const styles = StyleSheet.create({
    list: { paddingHorizontal: 16, gap: 8 },
});

export default CategoryList;
