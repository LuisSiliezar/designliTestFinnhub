import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '@presentation/components/shared';
import { colors, typography } from '@presentation/theme';

const AboutScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader title="About" serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.brand}>Comelongo</Text>
                <Text style={styles.version}>Version 1.0.0</Text>

                <Text style={styles.body}>
                    Comelongo is a friendlier place to track every dish worth remembering — or warning your friends about. Built for people who keep their best meals on a list, share their favourite spots like secrets, and rate honestly.
                </Text>

                <View style={styles.linkGroup}>
                    <Text style={styles.link}>Website · comelongo.app</Text>
                    <Text style={styles.link}>Twitter · @comelongo</Text>
                    <Text style={styles.link}>Support · hi@comelongo.app</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    scroll: { padding: 24 },
    brand: {
        fontFamily: typography.display,
        fontSize: 38,
        color: colors.ink,
        fontStyle: 'italic',
        letterSpacing: -1,
    },
    version: {
        fontFamily: typography.ui,
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 4,
        marginBottom: 24,
    },
    body: {
        fontFamily: typography.ui,
        fontSize: 15,
        lineHeight: 22,
        color: colors.inkSoft,
    },
    linkGroup: { marginTop: 32, gap: 8 },
    link: {
        fontFamily: typography.ui,
        fontSize: 14,
        color: colors.orange,
        fontWeight: '600',
    },
});

export default AboutScreen;
