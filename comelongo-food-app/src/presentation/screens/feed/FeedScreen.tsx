import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { colors, typography } from '@presentation/theme';

const FILTERS = ['Following', 'Nearby', 'Trending', 'Under $20', 'Open now'];

const FeedScreen = () => {
    const navigation = useNavigation<any>();
    const { reviews, isLoading } = useFeed();
    const { categories } = useCategories();
    const [active, setActive] = React.useState('Following');

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader
                title="Comelongo"
                rightIcons={[
                    { name: 'search', onPress: () => navigation.navigate('Search') },
                    { name: 'chat', badge: true },
                ]}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.filters}>
                    {FILTERS.map(f => (
                        <Pill
                            key={f}
                            label={f}
                            selected={active === f}
                            onPress={() => setActive(f)}
                            style={styles.filterPill}
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
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : reviews.length === 0 ? (
                    <Text style={styles.empty}>No reviews yet — pull to refresh.</Text>
                ) : (
                    reviews.map(r => <ReviewCard key={r.id} review={r} />)
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    scroll: { paddingBottom: 100 },
    filters: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexWrap: 'wrap',
    },
    filterPill: { marginRight: 4, marginBottom: 4 },
    empty: {
        textAlign: 'center',
        fontFamily: typography.ui,
        color: colors.textMuted,
        padding: 24,
    },
});

export default FeedScreen;
