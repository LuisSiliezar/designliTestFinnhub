import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { CTAButton } from '@presentation/components/shared';
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

interface DotProps { active: boolean }
const Dot = ({ active }: DotProps) => {
    const w = useSharedValue(active ? 24 : 6);
    React.useEffect(() => {
        w.value = withSpring(active ? 24 : 6, { damping: 14, stiffness: 200 });
    }, [active, w]);
    const style = useAnimatedStyle(() => ({ width: w.value }));
    return (
        <Animated.View
            style={style}
            className={`h-1.5 rounded-full ${active ? 'bg-ink' : 'bg-border-strong'}`}
        />
    );
};

const OnboardingScreen = () => {
    const [index, setIndex] = useState(0);
    const ref = useRef<FlatList>(null);
    const navigation = useNavigation<any>();
    const completeOnboarding = useAuthStore(s => s.completeOnboarding);
    const titleOpacity = useSharedValue(1);

    const goNext = () => {
        if (index < SLIDES.length - 1) {
            ref.current?.scrollToIndex({ index: index + 1, animated: true });
        } else {
            completeOnboarding();
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-cream">
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
                    titleOpacity.value = withTiming(1, { duration: 220 });
                }}
                renderItem={({ item }) => (
                    <View style={{ width }} className="items-center">
                        <Animated.Image
                            entering={FadeIn.duration(380)}
                            source={{ uri: item.image }}
                            style={{
                                width: width - 40,
                                height: width - 40,
                                borderRadius: 28,
                            }}
                            className="mt-5 mx-5 bg-warm-gray"
                        />
                        <Animated.View
                            entering={FadeIn.delay(150).duration(420)}
                            className="px-6 mt-7"
                        >
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider mb-2.5">
                                {item.eyebrow}
                            </Text>
                            <Text
                                className="font-display text-ink mb-3"
                                style={{ fontSize: 38, lineHeight: 42, letterSpacing: -1 }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                className="font-ui text-base leading-[22px] text-muted"
                                style={{ maxWidth: 320 }}
                            >
                                {item.body}
                            </Text>
                        </Animated.View>
                    </View>
                )}
            />

            <View className="flex-row justify-center gap-1.5 my-4">
                {SLIDES.map((_, i) => (
                    <Dot key={i} active={i === index} />
                ))}
            </View>

            <View className="px-6 pb-6 gap-3 items-center">
                <CTAButton
                    label={index === SLIDES.length - 1 ? 'Get started' : 'Next'}
                    variant="primary"
                    onPress={goNext}
                    style={{ alignSelf: 'stretch' }}
                />
                <Text
                    onPress={() => {
                        completeOnboarding();
                        navigation.navigate('Login');
                    }}
                    className="font-ui text-sm font-semibold text-muted p-2"
                >
                    Skip
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;
