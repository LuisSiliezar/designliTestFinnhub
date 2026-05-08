import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
    AnimatedPressable,
    AppHeader,
    CTAButton,
    ScoreBadge,
} from '@presentation/components/shared';
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
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader
                title={user.handle}
                serif={false}
                rightIcons={[{ name: 'settings', onPress: () => navigation.navigate('Settings') }]}
            />

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <Animated.View
                    entering={FadeInDown.duration(420).springify()}
                    className="items-center pt-3 px-6"
                >
                    {user.avatar && (
                        <Image
                            source={{ uri: user.avatar }}
                            className="w-24 h-24 rounded-full border-[3px] border-orange mb-3.5 bg-warm-gray"
                        />
                    )}
                    <Text
                        className="font-display text-ink"
                        style={{ fontSize: 28, letterSpacing: -0.5 }}
                    >
                        {user.name}
                    </Text>
                    {user.bio && (
                        <Text
                            className="font-ui text-[13px] text-muted text-center leading-5 mt-1.5"
                            style={{ maxWidth: 320 }}
                        >
                            {user.bio}
                        </Text>
                    )}
                </Animated.View>

                <View className="flex-row gap-2 px-5 mt-5">
                    {stats.map((s, i) => (
                        <Animated.View
                            key={s.l}
                            entering={FadeIn.delay(150 + i * 60).duration(320)}
                            className="flex-1 bg-paper rounded-[14px] py-3 px-2 items-center border border-border"
                        >
                            <Text
                                className={
                                    s.display
                                        ? 'font-display text-xl text-ink tracking-tight'
                                        : 'font-ui text-xl font-extrabold text-ink tracking-tight'
                                }
                            >
                                {s.k}
                            </Text>
                            <Text className="font-ui text-[10px] font-bold text-muted tracking-wider mt-0.5">
                                {s.l.toUpperCase()}
                            </Text>
                        </Animated.View>
                    ))}
                </View>

                <View className="flex-row gap-2 px-5 mt-3.5">
                    <CTAButton
                        label="Edit profile"
                        variant="primary"
                        style={{ flex: 1, height: 44 }}
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <CTAButton label="Share map" variant="light" style={{ flex: 1, height: 44 }} />
                </View>

                <View className="flex-row gap-6 px-6 pt-6 pb-3 border-b border-border mx-1">
                    {TABS.map(t => (
                        <AnimatedPressable key={t} onPress={() => setTab(t)}>
                            <Text
                                className={`font-ui text-sm font-bold pb-2.5 ${
                                    tab === t
                                        ? 'text-ink border-b-2 border-orange'
                                        : 'text-muted'
                                }`}
                            >
                                {t}
                            </Text>
                        </AnimatedPressable>
                    ))}
                </View>

                <View className="flex-row flex-wrap p-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, idx) => (
                        <Animated.View
                            key={i}
                            entering={FadeIn.delay(200 + idx * 40).duration(280)}
                            className="w-1/3 aspect-square p-0.5 relative"
                        >
                            <View className="flex-1 bg-warm-gray rounded-md" />
                            <View className="absolute top-1.5 right-1.5">
                                <ScoreBadge
                                    score={6.5 + i * 0.3}
                                    size={36}
                                    showLabel={false}
                                />
                            </View>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
