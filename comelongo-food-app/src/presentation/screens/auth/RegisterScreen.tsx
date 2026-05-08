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
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { CTAButton } from '@presentation/components/shared';
import { useAuthStore } from '@core/store';

const FIELD_INPUT = 'bg-paper border border-border rounded-md px-4 py-3.5 font-ui text-[15px] text-ink';
const LABEL = 'font-ui text-xs font-bold text-muted tracking-wide mb-1.5';

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
        <SafeAreaView className="flex-1 bg-cream">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
                    <Animated.View entering={FadeInDown.duration(420).springify()}>
                        <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                            JOIN COMELONGO
                        </Text>
                        <Text
                            className="font-display text-ink mt-1.5 mb-6"
                            style={{ fontSize: 36, lineHeight: 40, letterSpacing: -1 }}
                        >
                            Create your{'\n'}
                            <Text className="italic text-orange">foodprint</Text>.
                        </Text>
                    </Animated.View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Full name</Text>
                        <TextInput
                            className={FIELD_INPUT}
                            value={name}
                            onChangeText={setName}
                            placeholder="Mira Castellanos"
                            placeholderTextColor="#A39B8E"
                        />
                    </View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Email</Text>
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
                        <Text className={LABEL}>Password</Text>
                        <TextInput
                            className={FIELD_INPUT}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor="#A39B8E"
                            secureTextEntry
                        />
                    </View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Confirm password</Text>
                        <TextInput
                            className={FIELD_INPUT}
                            value={confirm}
                            onChangeText={setConfirm}
                            placeholder="••••••••"
                            placeholderTextColor="#A39B8E"
                            secureTextEntry
                        />
                    </View>

                    <CTAButton label="Create account" variant="orange" onPress={onSubmit} style={{ marginTop: 16 }} />

                    <Text className="text-center mt-4 font-ui text-[13px] text-muted">
                        Already onboard?{' '}
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            className="text-ink font-bold"
                        >
                            Sign in
                        </Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
