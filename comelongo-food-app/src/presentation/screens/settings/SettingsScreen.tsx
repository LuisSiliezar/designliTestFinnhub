import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader, CTAButton, Icon } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';
import { useAuthStore } from '@core/store';

interface RowProps {
    label: string;
    onPress?: () => void;
    danger?: boolean;
}

const Row = ({ label, onPress, danger }: RowProps) => (
    <Pressable style={styles.row} onPress={onPress}>
        <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
        <Icon name="chevron-right" size={18} color={colors.textMuted} />
    </Pressable>
);

const SettingsScreen = () => {
    const navigation = useNavigation<any>();
    const logout = useAuthStore(s => s.logout);

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader title="Settings" serif={false} showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.section}>ACCOUNT</Text>
                <View style={styles.group}>
                    <Row label="Edit profile" onPress={() => navigation.navigate('EditProfile')} />
                    <Row label="Change password" />
                    <Row label="Notifications" />
                </View>

                <Text style={styles.section}>PREFERENCES</Text>
                <View style={styles.group}>
                    <Row label="Language" />
                    <Row label="Display & accessibility" />
                    <Row label="Privacy" />
                </View>

                <Text style={styles.section}>ABOUT</Text>
                <View style={styles.group}>
                    <Row label="About Comelongo" onPress={() => navigation.navigate('About')} />
                    <Row label="Terms of Service" />
                    <Row label="Privacy Policy" />
                </View>

                <CTAButton label="Sign out" variant="ghost" onPress={logout} style={styles.logout} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    scroll: { padding: 20, paddingBottom: 60 },
    section: {
        fontFamily: typography.ui,
        fontSize: 11,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 1.2,
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 4,
    },
    group: {
        backgroundColor: colors.paper,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    rowLabel: {
        fontFamily: typography.ui,
        fontSize: 15,
        color: colors.ink,
    },
    rowLabelDanger: { color: colors.orangeDeep },
    logout: { marginTop: 24 },
});

export default SettingsScreen;
