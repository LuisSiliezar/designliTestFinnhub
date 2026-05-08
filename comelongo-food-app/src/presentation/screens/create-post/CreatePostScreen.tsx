import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, CTAButton, Icon, ScoreBadge } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';
import { useReviewDraftStore, SocialPlatform } from '@core/store';

const STEPS = ['Photo', 'Rate', 'Write', 'Share', 'Done'] as const;
type Step = typeof STEPS[number];

const SOCIALS: { id: SocialPlatform; label: string }[] = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'x', label: 'X' },
];

const CreatePostScreen = () => {
    const navigation = useNavigation<any>();
    const draft = useReviewDraftStore();
    const [step, setStep] = useState<Step>('Photo');

    const stepIndex = STEPS.indexOf(step);

    const goNext = () => {
        const next = STEPS[stepIndex + 1];
        if (next) setStep(next);
    };

    const submit = () => {
        setStep('Done');
    };

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
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

            <View style={styles.progress}>
                {STEPS.slice(0, -1).map((s, i) => (
                    <View
                        key={s}
                        style={[styles.progressBar, i <= stepIndex && styles.progressActive]}
                    />
                ))}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                    {step === 'Photo' && (
                        <View>
                            <Text style={styles.eyebrow}>STEP 1 · CAPTURE</Text>
                            <Text style={styles.title}>Snap the dish.</Text>
                            <Text style={styles.body}>Take a photo or pick one from your library.</Text>

                            <Pressable
                                style={styles.photoSlot}
                                onPress={() => draft.setPhoto('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80')}
                            >
                                {draft.photoUri ? (
                                    <Image source={{ uri: draft.photoUri }} style={styles.photo} />
                                ) : (
                                    <View style={styles.photoEmpty}>
                                        <Icon name="plus" size={36} color={colors.textMuted} />
                                        <Text style={styles.photoLabel}>Tap to add a photo</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    )}

                    {step === 'Rate' && (
                        <View>
                            <Text style={styles.eyebrow}>STEP 2 · RATE</Text>
                            <Text style={styles.title}>How was it?</Text>
                            <Text style={styles.body}>1 (avoid) to 10 (life-changing).</Text>

                            <View style={styles.scoreCenter}>
                                <ScoreBadge score={draft.score} size={120} />
                            </View>

                            <View style={styles.scoreSlider}>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(v => (
                                    <Pressable
                                        key={v}
                                        onPress={() => draft.setScore(v)}
                                        style={[
                                            styles.scoreDot,
                                            v <= draft.score && styles.scoreDotActive,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.scoreDotLabel,
                                                v <= draft.score && styles.scoreDotLabelActive,
                                            ]}
                                        >
                                            {v}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>

                            <View style={styles.field}>
                                <Text style={styles.label}>Dish name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={draft.dishName}
                                    onChangeText={draft.setDishName}
                                    placeholder="e.g. Smash burger"
                                    placeholderTextColor={colors.textSubtle}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Restaurant</Text>
                                <TextInput
                                    style={styles.input}
                                    value={draft.restaurantName}
                                    onChangeText={draft.setRestaurantName}
                                    placeholder="e.g. Block Burger"
                                    placeholderTextColor={colors.textSubtle}
                                />
                            </View>
                        </View>
                    )}

                    {step === 'Write' && (
                        <View>
                            <Text style={styles.eyebrow}>STEP 3 · WRITE</Text>
                            <Text style={styles.title}>Say something{'\n'}<Text style={styles.italic}>worth saying</Text>.</Text>
                            <TextInput
                                style={[styles.input, styles.note]}
                                value={draft.note}
                                onChangeText={draft.setNote}
                                placeholder="What did you love? What missed?"
                                placeholderTextColor={colors.textSubtle}
                                multiline
                                textAlignVertical="top"
                            />
                            <View style={styles.field}>
                                <Text style={styles.label}>Location</Text>
                                <View style={styles.locationRow}>
                                    <Icon name="location" size={16} color={colors.textMuted} />
                                    <TextInput
                                        style={styles.locationInput}
                                        value={draft.location}
                                        onChangeText={draft.setLocation}
                                        placeholder="Brooklyn, NY"
                                        placeholderTextColor={colors.textSubtle}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 'Share' && (
                        <View>
                            <Text style={styles.eyebrow}>STEP 4 · SHARE</Text>
                            <Text style={styles.title}>Take it{'\n'}<Text style={styles.italic}>public</Text>?</Text>
                            <Text style={styles.body}>
                                We'll post the photo and score to Comelongo. Pick where else to share.
                            </Text>
                            <View style={styles.shareList}>
                                {SOCIALS.map(s => {
                                    const isOn = draft.sharedTo.includes(s.id);
                                    return (
                                        <Pressable
                                            key={s.id}
                                            onPress={() => draft.toggleShare(s.id)}
                                            style={[styles.shareRow, isOn && styles.shareRowOn]}
                                        >
                                            <Text style={[styles.shareLabel, isOn && styles.shareLabelOn]}>
                                                {s.label}
                                            </Text>
                                            <View style={[styles.toggle, isOn && styles.toggleOn]}>
                                                <View style={[styles.knob, isOn && styles.knobOn]} />
                                            </View>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {step === 'Done' && (
                        <View style={styles.doneWrap}>
                            <View style={styles.doneCircle}>
                                <Icon name="star" size={36} color={colors.paper} />
                            </View>
                            <Text style={styles.title}>Posted.</Text>
                            <Text style={styles.body}>
                                Your review is live on Comelongo
                                {draft.sharedTo.length > 0 ? ` and shared to ${draft.sharedTo.join(', ')}.` : '.'}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
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

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    flex: { flex: 1 },
    scroll: { padding: 20, paddingBottom: 60 },
    progress: {
        flexDirection: 'row',
        gap: 4,
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.border,
    },
    progressActive: { backgroundColor: colors.orange },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.5,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 32,
        lineHeight: 36,
        color: colors.ink,
        marginTop: 4,
        marginBottom: 12,
        letterSpacing: -0.6,
    },
    italic: { fontStyle: 'italic', color: colors.orange },
    body: {
        fontFamily: typography.ui,
        fontSize: 15,
        lineHeight: 22,
        color: colors.textMuted,
        marginBottom: 16,
    },
    photoSlot: {
        height: 320,
        borderRadius: radius.lg,
        backgroundColor: colors.paper,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    photo: { width: '100%', height: '100%' },
    photoEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    photoLabel: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.textMuted,
    },
    scoreCenter: { alignItems: 'center', marginVertical: 24 },
    scoreSlider: {
        flexDirection: 'row',
        gap: 4,
        marginVertical: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    scoreDot: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.paper,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreDotActive: {
        backgroundColor: colors.orange,
        borderColor: colors.orange,
    },
    scoreDotLabel: {
        fontFamily: typography.ui,
        fontSize: 12,
        fontWeight: '700',
        color: colors.textMuted,
    },
    scoreDotLabelActive: { color: colors.paper },
    field: { marginVertical: 8 },
    label: {
        fontFamily: typography.ui,
        fontSize: 12,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.4,
        marginBottom: 6,
    },
    input: {
        backgroundColor: colors.paper,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: typography.ui,
        fontSize: 15,
        color: colors.ink,
    },
    note: { height: 160, marginVertical: 8 },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.paper,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radius.md,
        paddingHorizontal: 14,
    },
    locationInput: {
        flex: 1,
        paddingVertical: 14,
        fontFamily: typography.ui,
        fontSize: 15,
        color: colors.ink,
    },
    shareList: { marginTop: 12 },
    shareRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.paper,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 8,
    },
    shareRowOn: { borderColor: colors.orange },
    shareLabel: {
        fontFamily: typography.ui,
        fontSize: 15,
        fontWeight: '600',
        color: colors.ink,
    },
    shareLabelOn: { color: colors.orangeDeep },
    toggle: {
        width: 44,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.border,
        padding: 3,
    },
    toggleOn: { backgroundColor: colors.orange },
    knob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.paper,
    },
    knobOn: { transform: [{ translateX: 18 }] },
    doneWrap: { alignItems: 'center', paddingVertical: 40 },
    doneCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    footer: {
        padding: 16,
        backgroundColor: colors.cream,
        borderTopWidth: 1,
        borderColor: colors.border,
    },
});

export default CreatePostScreen;
