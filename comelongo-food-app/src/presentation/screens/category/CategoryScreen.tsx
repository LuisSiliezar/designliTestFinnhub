import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppHeader, DishCard } from '@presentation/components/shared';
import { useDishesByCategory } from '@presentation/hooks';

const CategoryScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const category: string = params?.category ?? 'Beef';
    const { dishes, isLoading } = useDishesByCategory(category);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader
                title={category}
                serif={false}
                showBack
                onBack={() => navigation.goBack()}
                rightIcons={[{ name: 'filter' }]}
            />

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                <Animated.View entering={FadeIn.duration(360)}>
                    <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                        TOP IN CATEGORY
                    </Text>
                    <Text
                        className="font-display text-ink mt-1 mb-4"
                        style={{ fontSize: 30, lineHeight: 34, letterSpacing: -0.6 }}
                    >
                        The {category.toLowerCase()}{'\n'}you can't miss.
                    </Text>
                </Animated.View>

                {isLoading ? (
                    <ActivityIndicator color="#FF5B1F" style={{ marginTop: 40 }} />
                ) : (
                    <View className="flex-row flex-wrap -mx-2">
                        {dishes.map((d, idx) => (
                            <Animated.View
                                key={d.id}
                                entering={FadeInDown.delay(idx * 60).duration(320).springify()}
                                className="w-1/2 p-2"
                            >
                                <DishCard
                                    id={d.id}
                                    name={d.name}
                                    image={d.image}
                                    score={d.score}
                                    restaurantName={d.category}
                                    onPress={() => navigation.navigate('DishDetail', { id: d.id })}
                                />
                            </Animated.View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryScreen;
