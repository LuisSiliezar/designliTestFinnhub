import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { CTAButton } from '@presentation/components/shared';
import { useAuthStore } from '@core/store';

const FIELD_INPUT = 'bg-paper border border-border rounded-md px-4 py-3.5 font-ui text-[15px] text-ink';

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const login = useAuthStore(s => s.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        await login(email || 'mira@comelongo.app', password);
    };

    return (
        <SafeAreaView className="flex-1 bg-cream">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
                    <Animated.View entering={FadeInDown.duration(420).springify()}>
                        <Text className="font-ui text-[11px] font-bold text-orange tracking-wider mt-2">
                            WELCOME BACK
                        </Text>
                        <Text
                            className="font-display text-ink mt-1.5"
                            style={{ fontSize: 38, lineHeight: 42, letterSpacing: -1 }}
                        >
                            Sign in to{'\n'}
                            <Text className="italic text-orange">Comelongo</Text>.
                        </Text>
                        <Text className="font-ui text-[15px] leading-[22px] text-muted mt-3 mb-6">
                            Pick up where you left off — your taste map awaits.
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeIn.delay(150).duration(420)}>
                        <View className="mb-3.5">
                            <Text className="font-ui text-xs font-bold text-muted tracking-wide mb-1.5">
                                Email
                            </Text>
                            <TextInput
                                className={FIELD_INPUT}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@email.com"
                                placeholderTextColor="#A39B8E"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="mb-3.5">
                            <Text className="font-ui text-xs font-bold text-muted tracking-wide mb-1.5">
                                Password
                            </Text>
                            <TextInput
                                className={FIELD_INPUT}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                placeholderTextColor="#A39B8E"
                                secureTextEntry
                            />
                        </View>

                        <Text
                            onPress={() => navigation.navigate('ForgotPassword')}
                            className="font-ui text-[13px] font-semibold text-orange text-right my-1.5"
                        >
                            Forgot password?
                        </Text>

                        <CTAButton label="Sign in" variant="primary" onPress={onSubmit} style={{ marginTop: 20 }} />

                        <View className="flex-row items-center my-6 gap-3">
                            <View className="flex-1 h-px bg-border" />
                            <Text className="font-ui text-xs text-subtle">or</Text>
                            <View className="flex-1 h-px bg-border" />
                        </View>

                        <CTAButton label="Continue with Apple" variant="light" onPress={onSubmit} style={{ marginBottom: 12 }} />
                        <CTAButton label="Continue with Google" variant="light" onPress={onSubmit} style={{ marginBottom: 12 }} />

                        <Text className="text-center mt-3 font-ui text-[13px] text-muted">
                            New here?{' '}
                            <Text
                                onPress={() => navigation.navigate('Register')}
                                className="text-ink font-bold"
                            >
                                Create an account
                            </Text>
                        </Text>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
