import React, { useState } from 'react';
import {
    Image,
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
import { AppHeader, CTAButton } from '@presentation/components/shared';
import { useAuthStore } from '@core/store';
import { MockDataService } from '@infrastructure/services';

const FIELD_INPUT = 'bg-paper border border-border rounded-md px-4 py-3.5 font-ui text-[15px] text-ink';
const LABEL = 'font-ui text-xs font-bold text-muted tracking-wide mb-1.5';

const EditProfileScreen = () => {
    const navigation = useNavigation<any>();
    const user = useAuthStore(s => s.user) ?? MockDataService.currentUser();

    const [name, setName] = useState(user.name);
    const [handle, setHandle] = useState(user.handle);
    const [bio, setBio] = useState(user.bio ?? '');

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-cream">
            <AppHeader title="Edit profile" serif={false} showBack onBack={() => navigation.goBack()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
                    <Animated.View entering={FadeInDown.duration(360)} className="items-center mb-6">
                        {user.avatar && (
                            <Image
                                source={{ uri: user.avatar }}
                                className="w-24 h-24 rounded-full bg-warm-gray border-[3px] border-orange"
                            />
                        )}
                        <Text className="font-ui text-[13px] font-bold text-orange mt-3">
                            Change photo
                        </Text>
                    </Animated.View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Name</Text>
                        <TextInput className={FIELD_INPUT} value={name} onChangeText={setName} />
                    </View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Handle</Text>
                        <TextInput
                            className={FIELD_INPUT}
                            value={handle}
                            onChangeText={setHandle}
                            autoCapitalize="none"
                        />
                    </View>

                    <View className="mb-3.5">
                        <Text className={LABEL}>Bio</Text>
                        <TextInput
                            className={FIELD_INPUT}
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            style={{ height: 110 }}
                        />
                    </View>

                    <CTAButton
                        label="Save changes"
                        variant="primary"
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 16 }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;
