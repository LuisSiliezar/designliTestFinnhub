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

const RegisterScreen = () => {
    const navigation = useNavigation<any>();
    const register = useAuthStore(s => s.register);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const onSubmit = async () => {
        if (password !== confirm) return;
        await register(name || 'New friend', email || 'new@comelongo.app', password);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.eyebrow}>JOIN COMELONGO</Text>
                    <Text style={styles.title}>Create your{'\n'}<Text style={styles.italic}>foodprint</Text>.</Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Mira Castellanos"
                            placeholderTextColor={colors.textSubtle}
                        />
                    </View>

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

                    <View style={styles.field}>
                        <Text style={styles.label}>Confirm password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirm}
                            onChangeText={setConfirm}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSubtle}
                            secureTextEntry
                        />
                    </View>

                    <CTAButton label="Create account" variant="orange" onPress={onSubmit} style={styles.cta} />

                    <Text style={styles.footer}>
                        Already onboard?{' '}
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={styles.link}
                        >
                            Sign in
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
    },
    title: {
        fontFamily: typography.display,
        fontSize: 36,
        lineHeight: 40,
        color: colors.ink,
        letterSpacing: -1,
        marginTop: 6,
        marginBottom: 24,
    },
    italic: { fontStyle: 'italic', color: colors.orange },
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
    cta: { marginTop: 16 },
    footer: {
        textAlign: 'center',
        marginTop: 16,
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
    },
    link: {
        color: colors.ink,
        fontWeight: '700',
    },
});

export default RegisterScreen;
