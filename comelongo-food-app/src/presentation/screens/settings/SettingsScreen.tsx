import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
    AnimatedPressable,
    AppHeader,
    CTAButton,
    Icon,
} from '@presentation/components/shared';
import { useAuthStore } from '@core/store';

interface RowProps {
    label: string;
    onPress?: () => void;
    danger?: boolean;
}

const Row = ({ label, onPress, danger }: RowProps) => (
    <AnimatedPressable
        className="flex-row items-center justify-between px-4 py-3.5 border-b border-border"
        onPress={onPress}
    >
        <Text className={`font-ui text-[15px] ${danger ? 'text-orange-deep' : 'text-ink'}`}>
            {label}
        </Text>
        <Icon name="chevron-right" size={18} color="#6F675C" />
    </AnimatedPressable>
);

const SectionLabel = ({ children }: { children: string }) => (
    <Text className="font-ui text-[11px] font-bold text-muted tracking-wider mt-4 mb-2 ml-1">
        {children}
    </Text>
);

const Group = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
    <Animated.View
        entering={FadeInDown.delay(delay).duration(320)}
        className="bg-paper rounded-lg border border-border overflow-hidden"
    >
        {children}
    </Animated.View>
);

const SettingsScreen = () => {
    const navigation = useNavigation<any>();
    const logout = useAuthStore(s => s.logout);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader title="Settings" serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
                <SectionLabel>ACCOUNT</SectionLabel>
                <Group delay={0}>
                    <Row label="Edit profile" onPress={() => navigation.navigate('EditProfile')} />
                    <Row label="Change password" />
                    <Row label="Notifications" />
                </Group>

                <SectionLabel>PREFERENCES</SectionLabel>
                <Group delay={80}>
                    <Row label="Language" />
                    <Row label="Display & accessibility" />
                    <Row label="Privacy" />
                </Group>

                <SectionLabel>ABOUT</SectionLabel>
                <Group delay={160}>
                    <Row label="About Comelongo" onPress={() => navigation.navigate('About')} />
                    <Row label="Terms of Service" />
                    <Row label="Privacy Policy" />
                </Group>

                <CTAButton label="Sign out" variant="ghost" onPress={logout} style={{ marginTop: 24 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;
