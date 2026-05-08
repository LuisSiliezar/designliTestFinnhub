import React, { useState } from 'react';
import {
    Image,
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
import { AppHeader, CTAButton } from '@presentation/components/shared';
import { colors, radius, typography } from '@presentation/theme';
import { useAuthStore } from '@core/store';
import { MockDataService } from '@infrastructure/services';

const EditProfileScreen = () => {
    const navigation = useNavigation<any>();
    const user = useAuthStore(s => s.user) ?? MockDataService.currentUser();

    const [name, setName] = useState(user.name);
    const [handle, setHandle] = useState(user.handle);
    const [bio, setBio] = useState(user.bio ?? '');

    return (
        <SafeAreaView style={styles.safe} edges={['top']}>
            <AppHeader
                title="Edit profile"
                serif={false}
                showBack
                onBack={() => navigation.goBack()}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.avatarRow}>
                        {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
                        <Text style={styles.changePhoto}>Change photo</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Handle</Text>
                        <TextInput
                            style={styles.input}
                            value={handle}
                            onChangeText={setHandle}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={[styles.input, styles.bio]}
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <CTAButton
                        label="Save changes"
                        variant="primary"
                        onPress={() => navigation.goBack()}
                        style={styles.cta}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cream },
    flex: { flex: 1 },
    scroll: { padding: 20, paddingBottom: 60 },
    avatarRow: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: colors.warmGray,
        borderWidth: 3,
        borderColor: colors.orange,
    },
    changePhoto: {
        fontFamily: typography.ui,
        fontSize: 13,
        fontWeight: '700',
        color: colors.orange,
        marginTop: 12,
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
    bio: {
        height: 110,
    },
    cta: { marginTop: 16 },
});

export default EditProfileScreen;
