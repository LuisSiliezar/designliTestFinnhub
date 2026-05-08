import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '@presentation/screens/onboarding/OnboardingScreen';
import LoginScreen from '@presentation/screens/auth/LoginScreen';
import RegisterScreen from '@presentation/screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@presentation/screens/auth/ForgotPasswordScreen';
import { useAuthStore } from '@core/store';
import { fadeTransitionSpec, fadeUp, slideFadeFromRight, transitionSpec } from './transitions';

export type AuthStackParams = {
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParams>();

const AuthStack = () => {
    const hasOnboarded = useAuthStore(s => s.hasOnboarded);
    return (
        <Stack.Navigator
            initialRouteName={hasOnboarded ? 'Login' : 'Onboarding'}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FAF6F1' },
                cardStyleInterpolator: slideFadeFromRight,
                transitionSpec,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ cardStyleInterpolator: fadeUp, transitionSpec: fadeTransitionSpec }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
