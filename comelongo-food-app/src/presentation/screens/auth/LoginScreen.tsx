import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CTAButton } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';
import { useAuthStore } from '@core/store';

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const login = useAuthStore(s => s.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        await login(email || 'mira@comelongo.app', password);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.eyebrow}>WELCOME BACK</Text>
                    <Text style={styles.title}>Sign in to{'\n'}<Text style={styles.italic}>Comelongo</Text>.</Text>
                    <Text style={styles.body}>Pick up where you left off — your taste map awaits.</Text>

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

                    <View style={styles.field}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSubtle}
                            secureTextEntry
                        />
                    </View>

                    <Text
                        onPress={() => navigation.navigate('ForgotPassword')}
                        style={styles.forgot}
                    >
                        Forgot password?
                    </Text>

                    <CTAButton label="Sign in" variant="primary" onPress={onSubmit} style={styles.cta} />

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.line} />
                    </View>

                    <CTAButton label="Continue with Apple" variant="light" onPress={onSubmit} style={styles.socialBtn} />
                    <CTAButton label="Continue with Google" variant="light" onPress={onSubmit} style={styles.socialBtn} />

                    <Text style={styles.footer}>
                        New here?{' '}
                        <Text
                            onPress={() => navigation.navigate('Register')}
                            style={styles.link}
                        >
                            Create an account
                        </Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    flex: { flex: 1 },
    container: { padding: 24, paddingBottom: 40 },
    eyebrow: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.orange,
        letterSpacing: 1.5,
        marginTop: 8,
    },
    title: {
        fontFamily: typography.display,
        fontSize: 38,
        lineHeight: 42,
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
        marginTop: 12,
        marginBottom: 24,
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
    forgot: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '600',
        color: colors.orange,
        textAlign: 'right',
        marginVertical: 6,
    },
    cta: { marginTop: 20 },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        gap: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        fontFamily: typography.ui,
        fontSize: 12,
        color: colors.textSubtle,
    },
    socialBtn: { marginBottom: 12 },
    footer: {
        textAlign: 'center',
        marginTop: 12,
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
    },
    link: {
        color: colors.ink,
        fontWeight: '700',
    },
});

export default LoginScreen;
