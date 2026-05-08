import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, CTAButton } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <SafeAreaView style={styles.safe}>
            <AppHeader title=" " serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.eyebrow}>FORGOT PASSWORD</Text>
                <Text style={styles.title}>Reset your{'\n'}<Text style={styles.italic}>Comelongo</Text>.</Text>
                <Text style={styles.body}>
                    Enter the email tied to your account — we'll send a reset link in seconds.
                </Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@email.com"
                        placeholderTextColor={colors.textSubtle}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {sent && (
                    <View style={styles.confirm}>
                        <Text style={styles.confirmText}>
                            Sent. Check your inbox in the next minute.
                        </Text>
                    </View>
                )}

                <CTAButton
                    label={sent ? 'Resend link' : 'Send reset link'}
                    variant="primary"
                    onPress={() => setSent(true)}
                    style={styles.cta}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    container: { padding: 24 },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.5,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 36,
        lineHeight: 40,
        color: colors.ink,
        letterSpacing: -1,
        marginTop: 6,
    },
    italic: { fontStyle: 'italic', color: colors.orange },
    body: {
        fontFamily: typography.ui,
        fontSize: 15,
        lineHeight: 22,
        color: colors.textMuted,
        marginVertical: 16,
    },
    field: { marginBottom: 14 },
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
    cta: { marginTop: 12 },
    confirm: {
        backgroundColor: colors.orangeSoft,
        padding: 12,
        borderRadius: radius.md,
        marginVertical: 12,
    },
    confirmText: {
        fontFamily: typography.ui,
        color: colors.orangeDeep,
        fontSize: 13,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;
