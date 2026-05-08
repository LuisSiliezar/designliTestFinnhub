import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CTAButton, Icon, ScoreBadge } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';
import { MockDataService } from '@infrastructure/services';

const RestaurantDetailScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const id: string = params?.id ?? 'rest-1';
    const restaurant = MockDataService.restaurantForDish(id, 'Specialty', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80');

    return (
        <View style={styles.flex}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.heroWrap}>
                    {restaurant.coverImage && (
                        <Image source={{ uri: restaurant.coverImage }} style={styles.hero} />
                    )}
                    <SafeAreaView edges={['top']} style={styles.heroOverlay}>
                        <View style={styles.heroBar}>
                            <Icon name="chevron-left" size={20} color={colors.paper} />
                        </View>
                    </SafeAreaView>
                </View>

                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <View style={styles.flex}>
                            <Text style={styles.eyebrow}>{restaurant.category?.toUpperCase()}</Text>
                            <Text style={styles.title}>{restaurant.name}</Text>
                            <Text style={styles.subtitle}>{restaurant.address}</Text>
                        </View>
                        {typeof restaurant.averageScore === 'number' && (
                            <ScoreBadge score={restaurant.averageScore} size={64} />
                        )}
                    </View>

                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Icon name="location" size={16} color={colors.textMuted} />
                            <Text style={styles.metaText}>{restaurant.city}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Icon name="fire" size={16} color={colors.orange} />
                            <Text style={styles.metaText}>{restaurant.reviewsCount} reviews</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Hours</Text>
                    <Text style={styles.body14}>{restaurant.hours}</Text>
                    <Text style={[styles.body14, { color: restaurant.isOpenNow ? colors.green : colors.textMuted }]}>
                        {restaurant.isOpenNow ? '● Open now' : 'Closed'}
                    </Text>

                    <Text style={styles.sectionTitle}>Top dishes</Text>
                    <View style={styles.dishGrid}>
                        {[1, 2, 3, 4].map(i => (
                            <View key={i} style={styles.dishCell}>
                                <View style={styles.dishImage} />
                                <Text style={styles.dishName}>Dish #{i}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <CTAButton
                    label="Add a review"
                    variant="primary"
                    onPress={() => navigation.navigate('CreatePost', { restaurantId: restaurant.id })}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.cream },
    heroWrap: { height: 280 },
    hero: { width: '100%', height: '100%', backgroundColor: colors.warmGray },
    heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
    heroBar: { padding: 16 },
    body: {
        padding: 20,
        marginTop: -28,
        backgroundColor: colors.cream,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    titleRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.2,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 30,
        lineHeight: 34,
        color: colors.ink,
        marginTop: 4,
        letterSpacing: -0.6,
    },
    subtitle: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 4,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
    },
    metaItem: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    metaText: {
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
    },
    sectionTitle: {
        fontFamily: typography.display,
        fontSize: 20,
        color: colors.ink,
        marginTop: 24,
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    body14: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.inkSoft,
        lineHeight: 20,
    },
    dishGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
        marginTop: 8,
    },
    dishCell: {
        width: '50%',
        padding: 6,
    },
    dishImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: colors.warmGray,
        borderRadius: radius.md,
    },
    dishName: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '600',
        color: colors.ink,
        marginTop: 6,
    },
    bottomBar: {
        padding: 16,
        backgroundColor: colors.cream,
        borderTopWidth: 1,
        borderColor: colors.border,
    },
});

export default RestaurantDetailScreen;
