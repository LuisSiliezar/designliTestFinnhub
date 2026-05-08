import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, CTAButton } from '@presentation/components/shared';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-cream">
            <AppHeader title=" " serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                <Animated.View entering={FadeInDown.duration(420).springify()}>
                    <Text className="font-ui text-[11px] font-bold text-orange tracking-wider">
                        FORGOT PASSWORD
                    </Text>
                    <Text
                        className="font-display text-ink mt-1.5"
                        style={{ fontSize: 36, lineHeight: 40, letterSpacing: -1 }}
                    >
                        Reset your{'\n'}
                        <Text className="italic text-orange">Comelongo</Text>.
                    </Text>
                    <Text className="font-ui text-[15px] leading-[22px] text-muted my-4">
                        Enter the email tied to your account — we'll send a reset link in seconds.
                    </Text>
                </Animated.View>

                <View className="mb-3.5">
                    <Text className="font-ui text-xs font-bold text-muted tracking-wide mb-1.5">
                        Email
                    </Text>
                    <TextInput
                        className="bg-paper border border-border rounded-md px-4 py-3.5 font-ui text-[15px] text-ink"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@email.com"
                        placeholderTextColor="#A39B8E"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {sent && (
                    <Animated.View
                        entering={FadeIn.duration(280)}
                        className="bg-orange-soft p-3 rounded-md my-3"
                    >
                        <Text className="font-ui text-orange-deep text-[13px] font-semibold">
                            Sent. Check your inbox in the next minute.
                        </Text>
                    </Animated.View>
                )}

                <CTAButton
                    label={sent ? 'Resend link' : 'Send reset link'}
                    variant="primary"
                    onPress={() => setSent(true)}
                    style={{ marginTop: 12 }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
