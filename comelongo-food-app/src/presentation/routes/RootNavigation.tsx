import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import DishDetailScreen from '@presentation/screens/dish/DishDetailScreen';
import RestaurantDetailScreen from '@presentation/screens/restaurant/RestaurantDetailScreen';
import CategoryScreen from '@presentation/screens/category/CategoryScreen';
import CreatePostScreen from '@presentation/screens/create-post/CreatePostScreen';
import EditProfileScreen from '@presentation/screens/profile/EditProfileScreen';
import SettingsScreen from '@presentation/screens/settings/SettingsScreen';
import AboutScreen from '@presentation/screens/settings/AboutScreen';
import { useAuthStore } from '@core/store';
import {
    fadeTransitionSpec,
    fadeUp,
    modalSlideUp,
    slideFadeFromRight,
    transitionSpec,
} from './transitions';

export type RootStackParams = {
    Auth: undefined;
    AppTabs: undefined;
    DishDetail: { id: string };
    RestaurantDetail: { id: string };
    Category: { category: string };
    CreatePost: { dishId?: string; dishName?: string; restaurantId?: string };
    EditProfile: undefined;
    Settings: undefined;
    About: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RootNavigation = () => {
    const isAuthed = useAuthStore(s => s.user !== null);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FAF6F1' },
                cardStyleInterpolator: slideFadeFromRight,
                transitionSpec,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            {!isAuthed ? (
                <Stack.Screen
                    name="Auth"
                    component={AuthStack}
                    options={{ cardStyleInterpolator: fadeUp, transitionSpec: fadeTransitionSpec }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="AppTabs"
                        component={AppTabs}
                        options={{ cardStyleInterpolator: fadeUp, transitionSpec: fadeTransitionSpec }}
                    />
                    <Stack.Screen name="DishDetail" component={DishDetailScreen} />
                    <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
                    <Stack.Screen name="Category" component={CategoryScreen} />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePostScreen}
                        options={{
                            ...TransitionPresets.ModalSlideFromBottomIOS,
                            cardStyleInterpolator: modalSlideUp,
                            gestureDirection: 'vertical',
                        }}
                    />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigation;
