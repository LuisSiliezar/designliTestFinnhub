import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppHeader, DishCard } from '@presentation/components/shared';
import { useDishesByCategory } from '@presentation/hooks';
import { colors, typography } from '@presentation/theme';

const CategoryScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const category: string = params?.category ?? 'Beef';
    const { dishes, isLoading } = useDishesByCategory(category);

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader
                title={category}
                serif={false}
                showBack
                onBack={() => navigation.goBack()}
                rightIcons={[{ name: 'filter' }]}
            />

            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.eyebrow}>TOP IN CATEGORY</Text>
                <Text style={styles.title}>The {category.toLowerCase()}{'\n'}you can't miss.</Text>

                {isLoading ? (
                    <ActivityIndicator color={colors.orange} style={styles.loader} />
                ) : (
                    <View style={styles.grid}>
                        {dishes.map(d => (
                            <View key={d.id} style={styles.cell}>
                                <DishCard
                                    id={d.id}
                                    name={d.name}
                                    image={d.image}
                                    score={d.score}
                                    restaurantName={d.category}
                                    onPress={() => navigation.navigate('DishDetail', { id: d.id })}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    scroll: { padding: 20, paddingBottom: 100 },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.5,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 30,
        lineHeight: 34,
        color: colors.ink,
        letterSpacing: -0.6,
        marginTop: 4,
        marginBottom: 16,
    },
    loader: { marginTop: 40 },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    cell: {
        width: '50%',
        padding: 8,
    },
});

export default CategoryScreen;
