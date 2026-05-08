import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, CTAButton, ScoreBadge } from '@presentation/components/shared';
import { colors, typography } from '@presentation/theme';
import { useAuthStore } from '@core/store';
import { MockDataService } from '@infrastructure/services';

const TABS = ['Reviews', 'Lists', 'Saved', 'Map'] as const;

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const user = useAuthStore(s => s.user) ?? MockDataService.currentUser();
    const [tab, setTab] = React.useState<typeof TABS[number]>('Reviews');

    const stats = [
        { k: String(user.reviewsCount ?? 0), l: 'Reviews', display: false },
        { k: (user.averageScore ?? 0).toFixed(1), l: 'Avg', display: true },
        { k: `${(user.followers ?? 0) / 1000}k`.replace('.0', ''), l: 'Followers', display: false },
        { k: String(user.following ?? 0), l: 'Following', display: false },
    ];

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader
                title={user.handle}
                serif={false}
                rightIcons={[{ name: 'settings', onPress: () => navigation.navigate('Settings') }]}
            />

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.head}>
                    {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
                    <Text style={styles.name}>{user.name}</Text>
                    {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
                </View>

                <View style={styles.statsRow}>
                    {stats.map(s => (
                        <View key={s.l} style={styles.stat}>
                            <Text
                                style={[
                                    styles.statValue,
                                    s.display && styles.statDisplay,
                                ]}
                            >
                                {s.k}
                            </Text>
                            <Text style={styles.statLabel}>{s.l.toUpperCase()}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.actions}>
                    <CTAButton
                        label="Edit profile"
                        variant="primary"
                        style={styles.action}
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <CTAButton label="Share map" variant="light" style={styles.action} />
                </View>

                <View style={styles.tabsRow}>
                    {TABS.map(t => (
                        <Text
                            key={t}
                            onPress={() => setTab(t)}
                            style={[styles.tab, tab === t && styles.tabActive]}
                        >
                            {t}
                        </Text>
                    ))}
                </View>

                <View style={styles.grid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                        <View key={i} style={styles.gridItem}>
                            <View style={styles.gridImage} />
                            <View style={styles.gridScore}>
                                <ScoreBadge score={6.5 + (i * 0.3)} size={36} showLabel={false} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    scroll: { paddingBottom: 100 },
    head: { alignItems: 'center', paddingTop: 12, paddingHorizontal: 24 },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: colors.orange,
        marginBottom: 14,
        backgroundColor: colors.warmGray,
    },
    name: {
        fontFamily: typography.display,
        fontSize: 28,
        color: colors.ink,
        letterSpacing: -0.5,
    },
    bio: {
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 6,
        maxWidth: 320,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    stat: {
        flex: 1,
        backgroundColor: colors.paper,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    statValue: {
        fontFamily: typography.ui,
        fontSize: 20,
        fontWeight: '800',
        color: colors.ink,
        letterSpacing: -0.3,
    },
    statDisplay: {
        fontFamily: typography.display,
        fontWeight: '400',
    },
    statLabel: {
        fontFamily: typography.ui,
        fontSize: 10,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.4,
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 20,
        marginTop: 14,
    },
    action: { flex: 1, height: 44 },
    tabsRow: {
        flexDirection: 'row',
        gap: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: colors.border,
        marginHorizontal: 4,
    },
    tab: {
        fontFamily: typography.ui,
        fontSize: 14,
        fontWeight: '700',
        color: colors.textMuted,
        paddingBottom: 10,
    },
    tabActive: {
        color: colors.ink,
        borderBottomWidth: 2,
        borderColor: colors.orange,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
    },
    gridItem: {
        width: '33.33%',
        aspectRatio: 1,
        padding: 2,
        position: 'relative',
    },
    gridImage: {
        flex: 1,
        backgroundColor: colors.warmGray,
        borderRadius: 8,
    },
    gridScore: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
});

export default ProfileScreen;
