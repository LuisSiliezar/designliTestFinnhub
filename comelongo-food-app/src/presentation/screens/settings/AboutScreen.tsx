import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '@presentation/components/shared';

const AboutScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader title="About" serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                <Animated.View entering={FadeInDown.duration(420).springify()}>
                    <Text
                        className="font-display italic text-ink"
                        style={{ fontSize: 38, letterSpacing: -1 }}
                    >
                        Comelongo
                    </Text>
                    <Text className="font-ui text-[13px] text-muted mt-1 mb-6">
                        Version 1.0.0
                    </Text>

                    <Text className="font-ui text-[15px] leading-[22px] text-ink-soft">
                        Comelongo is a friendlier place to track every dish worth remembering — or warning your friends about. Built for people who keep their best meals on a list, share their favourite spots like secrets, and rate honestly.
                    </Text>

                    <View className="mt-8 gap-2">
                        <Text className="font-ui text-sm text-orange font-semibold">
                            Website · comelongo.app
                        </Text>
                        <Text className="font-ui text-sm text-orange font-semibold">
                            Twitter · @comelongo
                        </Text>
                        <Text className="font-ui text-sm text-orange font-semibold">
                            Support · hi@comelongo.app
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AboutScreen;
