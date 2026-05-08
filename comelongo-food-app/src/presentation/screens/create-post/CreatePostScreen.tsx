import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOutUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
    AnimatedPressable,
    AnimatedScoreBadge,
    AppHeader,
    CTAButton,
    Icon,
} from '@presentation/components/shared';
import { useReviewDraftStore, SocialPlatform } from '@core/store';

const STEPS = ['Photo', 'Rate', 'Write', 'Share', 'Done'] as const;
type Step = typeof STEPS[number];

const SOCIALS: { id: SocialPlatform; label: string }[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'x', label: 'X' },
];

const FIELD_INPUT = 'bg-paper border border-border rounded-md px-4 py-3.5 font-ui text-[15px] text-ink';
const LABEL = 'font-ui text-xs font-bold text-muted tracking-wide mb-1.5';

const ProgressBar = ({ active }: { active: boolean }) => {
    const progress = useSharedValue(active ? 1 : 0);
    React.useEffect(() => {
        progress.value = withTiming(active ? 1 : 0, { duration: 280 });
    }, [active, progress]);
    const style = useAnimatedStyle(() => ({
        backgroundColor: progress.value > 0.5 ? '#FF5B1F' : '#EFEAE2',
    }));
    return <Animated.View style={style} className="flex-1 h-1 rounded-sm" />;
};

const SocialToggle = ({
    label,
    on,
    onPress,
}: { label: string; on: boolean; onPress: () => void }) => {
    const offset = useSharedValue(on ? 18 : 0);
    React.useEffect(() => {
        offset.value = withSpring(on ? 18 : 0, { damping: 16, stiffness: 220 });
    }, [on, offset]);
    const knobStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    return (
        <AnimatedPressable
            onPress={onPress}
            className={`flex-row items-center justify-between py-3.5 px-4 bg-paper rounded-md border ${on ? 'border-orange' : 'border-border'} mb-2`}
        >
            <Text className={`font-ui text-[15px] font-semibold ${on ? 'text-orange-deep' : 'text-ink'}`}>
                {label}
            </Text>
            <View className={`w-11 h-[26px] rounded-[13px] p-[3px] ${on ? 'bg-orange' : 'bg-border'}`}>
                <Animated.View style={knobStyle} className="w-5 h-5 rounded-full bg-paper" />
            </View>
        </AnimatedPressable>
    );
};

const CreatePostScreen = () => {
    const navigation = useNavigation<any>();
    const draft = useReviewDraftStore();
    const [step, setStep] = useState<Step>('Photo');
    const stepIndex = STEPS.indexOf(step);

    const goNext = () => {
        const next = STEPS[stepIndex + 1];
        if (next) setStep(next);
    };
    const submit = () => setStep('Done');

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader
                title={`Step ${stepIndex + 1} of ${STEPS.length - 1}`}
                serif={false}
                showBack
                onBack={() => {
                    if (stepIndex === 0) navigation.goBack();
                    else setStep(STEPS[stepIndex - 1]);
                }}
                rightIcons={[{ name: 'close', onPress: () => navigation.goBack() }]}
            />

            <View className="flex-row gap-1 px-5 pb-3">
                {STEPS.slice(0, -1).map((s, i) => (
                    <ProgressBar key={s} active={i <= stepIndex} />
                ))}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }} keyboardShouldPersistTaps="handled">
                    {step === 'Photo' && (
                        <Animated.View entering={FadeInDown.duration(320)} exiting={FadeOutUp.duration(220)}>
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                STEP 1 · CAPTURE
                            </Text>
                            <Text
                                className="font-display text-ink mt-1 mb-3"
                                style={{ fontSize: 32, lineHeight: 36, letterSpacing: -0.6 }}
                            >
                                Snap the dish.
                            </Text>
                            <Text className="font-ui text-[15px] leading-[22px] text-muted mb-4">
                                Take a photo or pick one from your library.
                            </Text>
                            <AnimatedPressable
                                className="h-80 rounded-lg bg-paper border border-border overflow-hidden"
                                onPress={() => draft.setPhoto('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80')}
                            >
                                {draft.photoUri ? (
                                    <Image source={{ uri: draft.photoUri }} className="w-full h-full" />
                                ) : (
                                    <View className="flex-1 items-center justify-center gap-3">
                                        <Icon name="plus" size={36} color="#6F675C" />
                                        <Text className="font-ui text-sm text-muted">
                                            Tap to add a photo
                                        </Text>
                                    </View>
                                )}
                            </AnimatedPressable>
                        </Animated.View>
                    )}

                    {step === 'Rate' && (
                        <Animated.View entering={FadeInDown.duration(320)} exiting={FadeOutUp.duration(220)}>
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                STEP 2 · RATE
                            </Text>
                            <Text
                                className="font-display text-ink mt-1 mb-3"
                                style={{ fontSize: 32, lineHeight: 36, letterSpacing: -0.6 }}
                            >
                                How was it?
                            </Text>
                            <Text className="font-ui text-[15px] leading-[22px] text-muted mb-4">
                                1 (avoid) to 10 (life-changing).
                            </Text>

                            <View className="items-center my-6">
                                <AnimatedScoreBadge score={draft.score} size={120} />
                            </View>

                            <View className="flex-row gap-1 my-4 flex-wrap justify-center">
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(v => (
                                    <AnimatedPressable
                                        key={v}
                                        onPress={() => draft.setScore(v)}
                                        className={`w-[30px] h-[30px] rounded-full items-center justify-center border ${
                                            v <= draft.score
                                                ? 'bg-orange border-orange'
                                                : 'bg-paper border-border'
                                        }`}
                                    >
                                        <Text
                                            className={`font-ui text-xs font-bold ${
                                                v <= draft.score ? 'text-paper' : 'text-muted'
                                            }`}
                                        >
                                            {v}
                                        </Text>
                                    </AnimatedPressable>
                                ))}
                            </View>

                            <View className="my-2">
                                <Text className={LABEL}>Dish name</Text>
                                <TextInput
                                    className={FIELD_INPUT}
                                    value={draft.dishName}
                                    onChangeText={draft.setDishName}
                                    placeholder="e.g. Smash burger"
                                    placeholderTextColor="#A39B8E"
                                />
                            </View>
                            <View className="my-2">
                                <Text className={LABEL}>Restaurant</Text>
                                <TextInput
                                    className={FIELD_INPUT}
                                    value={draft.restaurantName}
                                    onChangeText={draft.setRestaurantName}
                                    placeholder="e.g. Block Burger"
                                    placeholderTextColor="#A39B8E"
                                />
                            </View>
                        </Animated.View>
                    )}

                    {step === 'Write' && (
                        <Animated.View entering={FadeInDown.duration(320)} exiting={FadeOutUp.duration(220)}>
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                STEP 3 · WRITE
                            </Text>
                            <Text
                                className="font-display text-ink mt-1 mb-3"
                                style={{ fontSize: 32, lineHeight: 36, letterSpacing: -0.6 }}
                            >
                                Say something{'\n'}
                                <Text className="italic text-orange">worth saying</Text>.
                            </Text>
                            <TextInput
                                className={`${FIELD_INPUT} my-2`}
                                style={{ height: 160 }}
                                value={draft.note}
                                onChangeText={draft.setNote}
                                placeholder="What did you love? What missed?"
                                placeholderTextColor="#A39B8E"
                                multiline
                                textAlignVertical="top"
                            />
                            <View className="my-2">
                                <Text className={LABEL}>Location</Text>
                                <View className="flex-row items-center gap-2 bg-paper border border-border rounded-md px-3.5">
                                    <Icon name="location" size={16} color="#6F675C" />
                                    <TextInput
                                        className="flex-1 py-3.5 font-ui text-[15px] text-ink"
                                        value={draft.location}
                                        onChangeText={draft.setLocation}
                                        placeholder="Brooklyn, NY"
                                        placeholderTextColor="#A39B8E"
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    )}

                    {step === 'Share' && (
                        <Animated.View entering={FadeInDown.duration(320)} exiting={FadeOutUp.duration(220)}>
                            <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                                STEP 4 · SHARE
                            </Text>
                            <Text
                                className="font-display text-ink mt-1 mb-3"
                                style={{ fontSize: 32, lineHeight: 36, letterSpacing: -0.6 }}
                            >
                                Take it{'\n'}
                                <Text className="italic text-orange">public</Text>?
                            </Text>
                            <Text className="font-ui text-[15px] leading-[22px] text-muted mb-4">
                                We'll post the photo and score to Comelongo. Pick where else to share.
                            </Text>
                            <View className="mt-3">
                                {SOCIALS.map(s => (
                                    <SocialToggle
                                        key={s.id}
                                        label={s.label}
                                        on={draft.sharedTo.includes(s.id)}
                                        onPress={() => draft.toggleShare(s.id)}
                                    />
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {step === 'Done' && (
                        <Animated.View entering={FadeIn.duration(420)} className="items-center py-10">
                            <Animated.View
                                entering={FadeIn.duration(400)}
                                className="w-[88px] h-[88px] rounded-full bg-orange items-center justify-center mb-6"
                            >
                                <Icon name="star" size={36} color="#FFFFFF" />
                            </Animated.View>
                            <Text
                                className="font-display text-ink"
                                style={{ fontSize: 32, letterSpacing: -0.6 }}
                            >
                                Posted.
                            </Text>
                            <Text className="font-ui text-[15px] leading-[22px] text-muted mt-3 text-center">
                                Your review is live on Comelongo
                                {draft.sharedTo.length > 0
                                    ? ` and shared to ${draft.sharedTo.join(', ')}.`
                                    : '.'}
                            </Text>
                        </Animated.View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-4 bg-cream border-t border-border">
                {step === 'Done' ? (
                    <CTAButton
                        label="Done"
                        variant="primary"
                        onPress={() => {
                            draft.reset();
                            navigation.goBack();
                        }}
                    />
                ) : step === 'Share' ? (
                    <CTAButton label="Post review" variant="orange" onPress={submit} />
                ) : (
                    <CTAButton label="Continue" variant="primary" onPress={goNext} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default CreatePostScreen;
