import React from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CTAButton, Icon, Pill, ScoreBadge } from '@presentation/components/shared';
import { useDishDetail } from '@presentation/hooks';
import { colors, radius, typography } from '@presentation/theme';
import { MockDataService } from '@infrastructure/services';

const DishDetailScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const id: string = params?.id;
    const { dish, isLoading } = useDishDetail(id);

    if (isLoading || !dish) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator color={colors.orange} />
            </SafeAreaView>
        );
    }

    const restaurant = MockDataService.restaurantForDish(dish.id, dish.name, dish.image);

    return (
        <View style={styles.flex}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image source={{ uri: dish.image }} style={styles.hero} />
                    <SafeAreaView edges={['top']} style={styles.heroOverlay}>
                        <View style={styles.heroBar}>
                            <Pressable style={styles.heroBtn} onPress={() => navigation.goBack()}>
                                <Icon name="chevron-left" size={20} color={colors.paper} />
                            </Pressable>
                            <View style={styles.heroBtnGroup}>
                                <Pressable style={styles.heroBtn}>
                                    <Icon name="bookmark" size={18} color={colors.paper} />
                                </Pressable>
                                <Pressable style={styles.heroBtn}>
                                    <Icon name="share" size={18} color={colors.paper} />
                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>

                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <View style={styles.titleCol}>
                            {dish.category && <Text style={styles.eyebrow}>{dish.category.toUpperCase()}</Text>}
                            <Text style={styles.title}>{dish.name}</Text>
                            <Text style={styles.subtitle}>{restaurant.name} · {restaurant.city}</Text>
                        </View>
                        {typeof dish.score === 'number' && (
                            <ScoreBadge score={dish.score} size={64} />
                        )}
                    </View>

                    {dish.tags && dish.tags.length > 0 && (
                        <View style={styles.tagsWrap}>
                            {dish.tags.slice(0, 4).map(t => (
                                <Pill key={t} label={t} style={styles.tag} />
                            ))}
                        </View>
                    )}

                    {dish.description && (
                        <Text style={styles.description}>{dish.description}</Text>
                    )}

                    <View style={styles.scoreSection}>
                        <Text style={styles.sectionTitle}>The score</Text>
                        <View style={styles.scoreRow}>
                            {[
                                { label: 'Taste', value: 9.2 },
                                { label: 'Value', value: 8.4 },
                                { label: 'Vibe', value: 8.7 },
                            ].map(s => (
                                <View key={s.label} style={styles.scoreItem}>
                                    <Text style={styles.scoreItemValue}>{s.value.toFixed(1)}</Text>
                                    <Text style={styles.scoreItemLabel}>{s.label.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Pressable
                        style={styles.restaurantCard}
                        onPress={() => navigation.navigate('RestaurantDetail', { id: restaurant.id })}
                    >
                        <View style={styles.restaurantHead}>
                            <Text style={styles.sectionTitle}>{restaurant.name}</Text>
                            <Icon name="chevron-right" size={20} color={colors.textMuted} />
                        </View>
                        <Text style={styles.restaurantMeta}>
                            {restaurant.address} · {restaurant.hours}
                        </Text>
                        <Text style={styles.restaurantOpen}>
                            {restaurant.isOpenNow ? 'Open now' : 'Closed'}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <CTAButton
                    label="Write a review"
                    variant="orange"
                    onPress={() => navigation.navigate('CreatePost', { dishId: dish.id, dishName: dish.name })}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.cream },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    hero: {
        width: '100%',
        height: 360,
        backgroundColor: colors.warmGray,
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    heroBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    heroBtnGroup: { flexDirection: 'row', gap: 8 },
    heroBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        padding: 20,
        backgroundColor: colors.cream,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -28,
    },
    titleRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    titleCol: { flex: 1 },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.2,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 28,
        lineHeight: 32,
        color: colors.ink,
        letterSpacing: -0.6,
        marginTop: 4,
    },
    subtitle: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 4,
    },
    tagsWrap: { flexDirection: 'row', gap: 6, marginTop: 14, flexWrap: 'wrap' },
    tag: {},
    description: {
        fontFamily: typography.ui,
        fontSize: 15,
        lineHeight: 22,
        color: colors.inkSoft,
        marginTop: 18,
    },
    scoreSection: { marginTop: 24 },
    sectionTitle: {
        fontFamily: typography.display,
        fontSize: 20,
        color: colors.ink,
        letterSpacing: -0.3,
    },
    scoreRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    scoreItem: {
        flex: 1,
        backgroundColor: colors.paper,
        borderRadius: radius.md,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    scoreItemValue: {
        fontFamily: typography.display,
        fontSize: 22,
        color: colors.ink,
    },
    scoreItemLabel: {
        fontFamily: typography.ui,
        fontSize: 10,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.5,
        marginTop: 2,
    },
    restaurantCard: {
        marginTop: 24,
        marginBottom: 32,
        backgroundColor: colors.paper,
        padding: 16,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    restaurantHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    restaurantMeta: {
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 6,
    },
    restaurantOpen: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '700',
        color: colors.green,
        marginTop: 4,
    },
    bottomBar: {
        padding: 16,
        backgroundColor: colors.cream,
        borderTopWidth: 1,
        borderColor: colors.border,
    },
});

export default DishDetailScreen;
