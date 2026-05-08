import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
    AppHeader,
    Pill,
    ReviewCard,
    SectionHeader,
    SkeletonCard,
} from '@presentation/components/shared';
import CategoryList from '@presentation/components/lists/CategoryList';
import { useCategories, useFeed } from '@presentation/hooks';

const FILTERS = ['Following', 'Nearby', 'Trending', 'Under $20', 'Open now'];

const FeedScreen = () => {
    const navigation = useNavigation<any>();
    const { reviews, isLoading } = useFeed();
    const { categories } = useCategories();
    const [active, setActive] = React.useState('Following');

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader
                title="Comelongo"
                rightIcons={[
                    { name: 'search', onPress: () => navigation.navigate('Search') },
                    { name: 'chat', badge: true },
                ]}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="flex-row gap-2 px-4 py-2 flex-wrap">
                    {FILTERS.map(f => (
                        <Pill
                            key={f}
                            label={f}
                            selected={active === f}
                            onPress={() => setActive(f)}
                            style={{ marginRight: 4, marginBottom: 4 }}
                        />
                    ))}
                </View>

                <SectionHeader label="Hot near you" eyebrow actionLabel="See map" />
                {categories.length > 0 && (
                    <CategoryList
                        categories={categories.slice(0, 8)}
                        onPressCategory={(c) => navigation.navigate('Category', { category: c.name })}
                    />
                )}

                <SectionHeader label="Latest from your circle" eyebrow />
                {isLoading ? (
                    <Animated.View entering={FadeIn.duration(200)}>
                        <SkeletonCard />
                        <SkeletonCard />
                    </Animated.View>
                ) : reviews.length === 0 ? (
                    <Text className="text-center font-ui text-muted p-6">
                        No reviews yet — pull to refresh.
                    </Text>
                ) : (
                    reviews.map(r => <ReviewCard key={r.id} review={r} />)
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default FeedScreen;
