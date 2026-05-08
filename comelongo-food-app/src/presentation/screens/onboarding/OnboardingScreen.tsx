import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CTAButton } from '@presentation/components/shared';
import { colors, typography } from '@presentation/theme';
import { useAuthStore } from '@core/store';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        eyebrow: 'WELCOME TO COMELONGO',
        title: 'Eat well,\nrate honestly.',
        body: 'A friendlier place to track every meal worth remembering — or warning your friends about.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    },
    {
        eyebrow: 'HOW IT WORKS',
        title: 'Score on a\nscale of 10.',
        body: 'No five-star confusion. Just numbers, photos, and the people whose taste you trust.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    },
    {
        eyebrow: 'WHY YOU\'LL LOVE IT',
        title: 'Discover what\nyour circle eats.',
        body: 'Build your personal food map and share your daily picks straight from your camera roll.',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    },
];

const OnboardingScreen = () => {
    const [index, setIndex] = useState(0);
    const ref = useRef<FlatList>(null);
    const navigation = useNavigation<any>();
    const completeOnboarding = useAuthStore(s => s.completeOnboarding);

    const goNext = () => {
        if (index < SLIDES.length - 1) {
            ref.current?.scrollToIndex({ index: index + 1, animated: true });
        } else {
            completeOnboarding();
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <FlatList
                ref={ref}
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => `s-${i}`}
                onMomentumScrollEnd={(e) => {
                    const i = Math.round(e.nativeEvent.contentOffset.x / width);
                    setIndex(i);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.content}>
                            <Text style={styles.eyebrow}>{item.eyebrow}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.body}>{item.body}</Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.dots}>
                {SLIDES.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === index && styles.dotActive,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.footer}>
                <CTAButton
                    label={index === SLIDES.length - 1 ? 'Get started' : 'Next'}
                    variant="primary"
                    onPress={goNext}
                />
                <Text
                    onPress={() => {
                        completeOnboarding();
                        navigation.navigate('Login');
                    }}
                    style={styles.skip}
                >
                    Skip
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    slide: { width, alignItems: 'center' },
    image: {
        width: width - 40,
        height: width - 40,
        borderRadius: 28,
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: colors.warmGray,
    },
    content: { paddingHorizontal: 24, marginTop: 28 },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 38,
        lineHeight: 42,
        color: colors.ink,
        letterSpacing: -1,
        marginBottom: 12,
    },
    body: {
        fontFamily: typography.ui,
        fontSize: 16,
        lineHeight: 22,
        color: colors.textMuted,
        maxWidth: 320,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginVertical: 16,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.borderStrong,
    },
    dotActive: {
        width: 24,
        backgroundColor: colors.ink,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 12,
        alignItems: 'center',
    },
    skip: {
        fontFamily: typography.ui,
        fontSize: 14,
        fontWeight: '600',
        color: colors.textMuted,
        padding: 8,
    },
});

export default OnboardingScreen;
