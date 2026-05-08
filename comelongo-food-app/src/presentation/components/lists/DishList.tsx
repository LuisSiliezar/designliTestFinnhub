import React from 'react';
import { FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
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
        renderItem={({ item, index }) => (
            <Animated.View
                entering={FadeInDown.delay(index * 60).duration(360).springify()}
                className={horizontal ? 'w-[220px] mr-3' : 'my-2'}
            >
                <DishCard
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    score={item.score}
                    restaurantName={item.restaurantName ?? item.category}
                    city={item.city}
                    onPress={() => onPressDish?.(item)}
                />
            </Animated.View>
        )}
        horizontal={horizontal}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={
            horizontal
                ? { paddingHorizontal: 16, gap: 12 }
                : { paddingHorizontal: 16, paddingBottom: 120 }
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    />
);

export default DishList;
