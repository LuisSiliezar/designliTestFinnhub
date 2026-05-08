import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    AnimatedPressable,
    CTAButton,
    Icon,
    ScoreBadge,
} from '@presentation/components/shared';
import { MockDataService } from '@infrastructure/services';

const RestaurantDetailScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const id: string = params?.id ?? 'rest-1';
    const restaurant = MockDataService.restaurantForDish(
        id,
        'Specialty',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
    );

    return (
        <View className="flex-1 bg-cream">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 280 }}>
                    {restaurant.coverImage && (
                        <Animated.Image
                            entering={FadeIn.duration(320)}
                            source={{ uri: restaurant.coverImage }}
                            className="w-full h-full bg-warm-gray"
                        />
                    )}
                    <SafeAreaView edges={['top']} className="absolute top-0 left-0 right-0">
                        <View className="p-4">
                            <AnimatedPressable
                                onPress={() => navigation.goBack()}
                                className="w-10 h-10 rounded-full bg-black/45 items-center justify-center"
                            >
                                <Icon name="chevron-left" size={20} color="#FFFFFF" />
                            </AnimatedPressable>
                        </View>
                    </SafeAreaView>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(420).springify()}
                    className="p-5 -mt-7 bg-cream rounded-t-[28px]"
                >
                    <View className="flex-row gap-3 items-start">
                        <View className="flex-1">
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                {restaurant.category?.toUpperCase()}
                            </Text>
                            <Text
                                className="font-display text-ink mt-1"
                                style={{ fontSize: 30, lineHeight: 34, letterSpacing: -0.6 }}
                            >
                                {restaurant.name}
                            </Text>
                            <Text className="font-ui text-sm text-muted mt-1">
                                {restaurant.address}
                            </Text>
                        </View>
                        {typeof restaurant.averageScore === 'number' && (
                            <ScoreBadge score={restaurant.averageScore} size={64} />
                        )}
                    </View>

                    <View className="flex-row gap-4 mt-4">
                        <View className="flex-row gap-1.5 items-center">
                            <Icon name="location" size={16} color="#6F675C" />
                            <Text className="font-ui text-[13px] text-muted">{restaurant.city}</Text>
                        </View>
                        <View className="flex-row gap-1.5 items-center">
                            <Icon name="fire" size={16} color="#FF5B1F" />
                            <Text className="font-ui text-[13px] text-muted">
                                {restaurant.reviewsCount} reviews
                            </Text>
                        </View>
                    </View>

                    <Text className="font-display text-xl text-ink mt-6 mb-2 tracking-tight">
                        Hours
                    </Text>
                    <Text className="font-ui text-sm text-ink-soft leading-5">
                        {restaurant.hours}
                    </Text>
                    <Text
                        className={`font-ui text-sm leading-5 ${restaurant.isOpenNow ? 'text-green' : 'text-muted'}`}
                    >
                        {restaurant.isOpenNow ? '● Open now' : 'Closed'}
                    </Text>

                    <Text className="font-display text-xl text-ink mt-6 mb-2 tracking-tight">
                        Top dishes
                    </Text>
                    <View className="flex-row flex-wrap -mx-1.5 mt-2">
                        {[1, 2, 3, 4].map((i, idx) => (
                            <Animated.View
                                key={i}
                                entering={FadeInDown.delay(idx * 80).duration(320)}
                                className="w-1/2 p-1.5"
                            >
                                <View className="w-full aspect-square bg-warm-gray rounded-md" />
                                <Text className="font-ui text-[13px] font-semibold text-ink mt-1.5">
                                    Dish #{i}
                                </Text>
                            </Animated.View>
                        ))}
                    </View>
                </Animated.View>
            </ScrollView>

            <View className="p-4 bg-cream border-t border-border">
                <CTAButton
                    label="Add a review"
                    variant="primary"
                    onPress={() => navigation.navigate('CreatePost', { restaurantId: restaurant.id })}
                />
            </View>
        </View>
    );
};

export default RestaurantDetailScreen;
