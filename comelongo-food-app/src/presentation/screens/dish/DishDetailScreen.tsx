import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    AnimatedPressable,
    AnimatedScoreBadge,
    CTAButton,
    Icon,
    Pill,
    SaveButton,
    ScoreBadge,
} from '@presentation/components/shared';
import { useDishDetail } from '@presentation/hooks';
import { MockDataService } from '@infrastructure/services';

const HERO_BTN = 'w-10 h-10 rounded-full bg-black/45 items-center justify-center';

const DishDetailScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const id: string = params?.id;
    const { dish, isLoading } = useDishDetail(id);

    if (isLoading || !dish) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-cream">
                <ActivityIndicator color="#FF5B1F" />
            </SafeAreaView>
        );
    }

    const restaurant = MockDataService.restaurantForDish(dish.id, dish.name, dish.image);

    return (
        <View className="flex-1 bg-cream">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Animated.Image
                        entering={FadeIn.duration(320)}
                        source={{ uri: dish.image }}
                        className="w-full bg-warm-gray"
                        style={{ height: 360 }}
                    />
                    <SafeAreaView edges={['top']} className="absolute top-0 left-0 right-0">
                        <View className="flex-row justify-between p-4">
                            <AnimatedPressable className={HERO_BTN} onPress={() => navigation.goBack()}>
                                <Icon name="chevron-left" size={20} color="#FFFFFF" />
                            </AnimatedPressable>
                            <View className="flex-row gap-2">
                                <View className={HERO_BTN}>
                                    <SaveButton color="#FFFFFF" />
                                </View>
                                <AnimatedPressable className={HERO_BTN}>
                                    <Icon name="share" size={18} color="#FFFFFF" />
                                </AnimatedPressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(420).springify()}
                    className="p-5 bg-cream rounded-t-[28px] -mt-7"
                >
                    <View className="flex-row gap-3 items-start">
                        <View className="flex-1">
                            {dish.category && (
                                <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                    {dish.category.toUpperCase()}
                                </Text>
                            )}
                            <Text
                                className="font-display text-ink mt-1"
                                style={{ fontSize: 28, lineHeight: 32, letterSpacing: -0.6 }}
                            >
                                {dish.name}
                            </Text>
                            <Text className="font-ui text-sm text-muted mt-1">
                                {restaurant.name} · {restaurant.city}
                            </Text>
                        </View>
                        {typeof dish.score === 'number' && (
                            <AnimatedScoreBadge score={dish.score} size={64} />
                        )}
                    </View>

                    {dish.tags && dish.tags.length > 0 && (
                        <Animated.View
                            entering={FadeIn.delay(150).duration(300)}
                            className="flex-row gap-1.5 mt-3.5 flex-wrap"
                        >
                            {dish.tags.slice(0, 4).map(t => (
                                <Pill key={t} label={t} />
                            ))}
                        </Animated.View>
                    )}

                    {dish.description && (
                        <Text className="font-ui text-[15px] leading-[22px] text-ink-soft mt-4">
                            {dish.description}
                        </Text>
                    )}

                    <View className="mt-6">
                        <Text className="font-display text-xl text-ink tracking-tight">
                            The score
                        </Text>
                        <View className="flex-row gap-2 mt-3">
                            {[
                                { label: 'Taste', value: 9.2 },
                                { label: 'Value', value: 8.4 },
                                { label: 'Vibe', value: 8.7 },
                            ].map((s, i) => (
                                <Animated.View
                                    key={s.label}
                                    entering={FadeInDown.delay(200 + i * 80).duration(320)}
                                    className="flex-1 bg-paper rounded-md p-3.5 items-center border border-border"
                                >
                                    <Text className="font-display text-[22px] text-ink">
                                        {s.value.toFixed(1)}
                                    </Text>
                                    <Text className="font-ui text-[10px] font-bold text-muted tracking-wider mt-0.5">
                                        {s.label.toUpperCase()}
                                    </Text>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    <AnimatedPressable
                        className="mt-6 mb-8 bg-paper p-4 rounded-lg border border-border"
                        onPress={() => navigation.navigate('RestaurantDetail', { id: restaurant.id })}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text className="font-display text-xl text-ink tracking-tight">
                                {restaurant.name}
                            </Text>
                            <Icon name="chevron-right" size={20} color="#6F675C" />
                        </View>
                        <Text className="font-ui text-[13px] text-muted mt-1.5">
                            {restaurant.address} · {restaurant.hours}
                        </Text>
                        <Text className="font-ui text-[13px] font-bold text-green mt-1">
                            {restaurant.isOpenNow ? '● Open now' : 'Closed'}
                        </Text>
                    </AnimatedPressable>
                </Animated.View>
            </ScrollView>

            <View className="p-4 bg-cream border-t border-border">
                <CTAButton
                    label="Write a review"
                    variant="orange"
                    onPress={() => navigation.navigate('CreatePost', { dishId: dish.id, dishName: dish.name })}
                />
            </View>
        </View>
    );
};

export default DishDetailScreen;
