import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DishCard from '@presentation/components/shared/DishCard';
import type { Dish } from '@domain/entities';

interface Props {
    dishes: Dish[];
    onPressDish?: (dish: Dish) => void;
    horizontal?: boolean;
    ListHeaderComponent?: React.ReactElement;
}

const DishList = ({ dishes, onPressDish, horizontal, ListHeaderComponent }: Props) => (
    <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={horizontal ? styles.horizontalItem : styles.verticalItem}>
                <DishCard
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    score={item.score}
                    restaurantName={item.restaurantName ?? item.category}
                    city={item.city}
                    onPress={() => onPressDish?.(item)}
                />
            </View>
        )}
        horizontal={horizontal}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={horizontal ? styles.horizontalList : styles.verticalList}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    />
);

const styles = StyleSheet.create({
    verticalList: { paddingBottom: 120, paddingHorizontal: 16 },
    horizontalList: { paddingHorizontal: 16, gap: 12 },
    verticalItem: { marginVertical: 8 },
    horizontalItem: { width: 220, marginRight: 12 },
});

export default DishList;
