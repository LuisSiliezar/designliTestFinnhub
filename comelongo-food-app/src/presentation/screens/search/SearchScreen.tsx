import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
    AnimatedPressable,
    AppHeader,
    Icon,
    ScoreBadge,
} from '@presentation/components/shared';
import { useSearchDishes } from '@presentation/hooks';

const SUGGESTIONS = ['Pizza margherita', 'Smash burger', 'Tacos al pastor', 'Ramen tonkotsu', 'Pad thai'];

const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const [query, setQuery] = useState('');
    const { results, isLoading } = useSearchDishes(query);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader title="Search" serif={false} showBack onBack={() => navigation.goBack()} />

            <View className="flex-row items-center gap-2.5 bg-paper mx-4 my-2 px-3.5 py-3 rounded-md border border-border">
                <Icon name="search" size={18} color="#6F675C" />
                <TextInput
                    className="flex-1 font-ui text-[15px] text-ink p-0"
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Dishes, restaurants, places…"
                    placeholderTextColor="#A39B8E"
                    autoFocus
                    returnKeyType="search"
                />
                {query.length > 0 && (
                    <AnimatedPressable onPress={() => setQuery('')}>
                        <Icon name="close" size={18} color="#6F675C" />
                    </AnimatedPressable>
                )}
            </View>

            {query.length === 0 ? (
                <Animated.View entering={FadeIn.duration(280)} className="p-4">
                    <Text className="font-ui text-[11px] font-bold text-muted tracking-wider mb-3">
                        TRENDING SEARCHES
                    </Text>
                    {SUGGESTIONS.map((s, i) => (
                        <Animated.View
                            key={s}
                            entering={FadeInDown.delay(i * 60).duration(280)}
                        >
                            <AnimatedPressable
                                onPress={() => setQuery(s)}
                                className="flex-row items-center gap-3 py-3 border-b border-border"
                            >
                                <Icon name="fire" size={18} color="#FF5B1F" />
                                <Text className="flex-1 font-ui text-[15px] text-ink">{s}</Text>
                                <Icon name="arrow-right" size={16} color="#A39B8E" />
                            </AnimatedPressable>
                        </Animated.View>
                    ))}
                </Animated.View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <Animated.View entering={FadeInDown.delay(index * 40).duration(260)}>
                            <AnimatedPressable
                                className="flex-row items-center gap-3 p-3 mx-4 my-1 bg-paper rounded-md border border-border"
                                onPress={() => navigation.navigate('DishDetail', { id: item.id })}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-14 h-14 rounded-sm bg-warm-gray"
                                />
                                <View className="flex-1">
                                    <Text className="font-ui text-[15px] font-bold text-ink" numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text className="font-ui text-xs text-muted mt-0.5" numberOfLines={1}>
                                        {item.category}
                                    </Text>
                                </View>
                                {typeof item.score === 'number' && (
                                    <ScoreBadge score={item.score} size={42} showLabel={false} />
                                )}
                            </AnimatedPressable>
                        </Animated.View>
                    )}
                    ListEmptyComponent={
                        <Text className="text-center font-ui text-muted p-6">
                            {isLoading ? 'Searching…' : 'No matches yet.'}
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default SearchScreen;
