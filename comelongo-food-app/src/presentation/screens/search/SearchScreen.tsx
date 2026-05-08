import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, Icon, ScoreBadge } from '@presentation/components/shared';
import { useSearchDishes } from '@presentation/hooks';
import { colors, radius, typography } from '@presentation/theme';

const SUGGESTIONS = ['Pizza margherita', 'Smash burger', 'Tacos al pastor', 'Ramen tonkotsu', 'Pad thai'];

const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const [query, setQuery] = useState('');
    const { results, isLoading } = useSearchDishes(query);

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader title="Search" serif={false} showBack onBack={() => navigation.goBack()} />

            <View style={styles.searchWrap}>
                <Icon name="search" size={18} color={colors.textMuted} />
                <TextInput
                    style={styles.input}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Dishes, restaurants, places…"
                    placeholderTextColor={colors.textSubtle}
                    autoFocus
                    returnKeyType="search"
                />
                {query.length > 0 && (
                    <Pressable onPress={() => setQuery('')} hitSlop={8}>
                        <Icon name="close" size={18} color={colors.textMuted} />
                    </Pressable>
                )}
            </View>

            {query.length === 0 ? (
                <View style={styles.suggestionsWrap}>
                    <Text style={styles.suggestionsTitle}>TRENDING SEARCHES</Text>
                    {SUGGESTIONS.map(s => (
                        <Pressable
                            key={s}
                            onPress={() => setQuery(s)}
                            style={styles.suggestionRow}
                        >
                            <Icon name="fire" size={18} color={colors.orange} />
                            <Text style={styles.suggestionText}>{s}</Text>
                            <Icon name="arrow-right" size={16} color={colors.textSubtle} />
                        </Pressable>
                    ))}
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.resultRow}
                            onPress={() => navigation.navigate('DishDetail', { id: item.id })}
                        >
                            <Image source={{ uri: item.image }} style={styles.resultImage} />
                            <View style={styles.resultBody}>
                                <Text style={styles.resultTitle} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.resultMeta} numberOfLines={1}>{item.category}</Text>
                            </View>
                            {typeof item.score === 'number' && (
                                <ScoreBadge score={item.score} size={42} showLabel={false} />
                            )}
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.empty}>
                            {isLoading ? 'Searching…' : 'No matches yet.'}
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.paper,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    input: {
        flex: 1,
        fontFamily: typography.ui,
        fontSize: 15,
        color: colors.ink,
        paddingVertical: 0,
    },
    suggestionsWrap: { padding: 16 },
    suggestionsTitle: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 1.2,
        marginBottom: 12,
    },
    suggestionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    suggestionText: {
        flex: 1,
        fontFamily: typography.ui,
        fontSize: 15,
        color: colors.ink,
    },
    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 4,
        backgroundColor: colors.paper,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    resultImage: {
        width: 56,
        height: 56,
        borderRadius: radius.sm,
        backgroundColor: colors.warmGray,
    },
    resultBody: { flex: 1 },
    resultTitle: {
        fontFamily: typography.ui,
        fontSize: 15,
        fontWeight: '700',
        color: colors.ink,
    },
    resultMeta: {
        fontFamily: typography.ui,
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    empty: {
        textAlign: 'center',
        fontFamily: typography.ui,
        color: colors.textMuted,
        padding: 24,
    },
});

export default SearchScreen;
