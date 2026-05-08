import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import FeedScreen from '@presentation/screens/feed/FeedScreen';
import SearchScreen from '@presentation/screens/search/SearchScreen';
import ProfileScreen from '@presentation/screens/profile/ProfileScreen';
import { AnimatedPressable, Icon } from '@presentation/components/shared';
import { IconName } from '@presentation/components/shared/Icon';

export type AppTabsParams = {
    Feed: undefined;
    Discover: undefined;
    Post: undefined;
    Saved: undefined;
    Me: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParams>();

const TAB_ICONS: Record<keyof AppTabsParams, IconName> = {
    Feed: 'home',
    Discover: 'map',
    Post: 'plus',
    Saved: 'bookmark',
    Me: 'user',
};

const TAB_LABELS: Record<keyof AppTabsParams, string> = {
    Feed: 'Home',
    Discover: 'Discover',
    Post: '',
    Saved: 'Saved',
    Me: 'You',
};

const TabItem = ({
    icon,
    label,
    active,
    onPress,
}: {
    icon: IconName;
    label: string;
    active: boolean;
    onPress: () => void;
}) => {
    const scale = useSharedValue(active ? 1.08 : 1);
    React.useEffect(() => {
        scale.value = withSpring(active ? 1.08 : 1, { damping: 14, stiffness: 220 });
    }, [active, scale]);
    const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

    return (
        <AnimatedPressable
            onPress={onPress}
            className="items-center px-3 gap-0.5"
        >
            <Animated.View style={style}>
                <Icon
                    name={icon}
                    size={24}
                    color={active ? '#0E0E0E' : '#A39B8E'}
                />
            </Animated.View>
            <Text
                className={`font-ui text-[10px] font-semibold tracking-wide ${
                    active ? 'text-ink' : 'text-subtle'
                }`}
            >
                {label}
            </Text>
        </AnimatedPressable>
    );
};

const ComelongoTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const rootNav = useNavigation<any>();
    return (
        <View
            className="flex-row justify-around items-center pt-2.5 pb-7 bg-white/95 border-t border-border"
            style={{ borderTopWidth: 0.5 }}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const name = route.name as keyof AppTabsParams;

                if (name === 'Post') {
                    return (
                        <AnimatedPressable
                            key={route.key}
                            onPress={() => rootNav.navigate('CreatePost', {})}
                            className="w-[52px] h-[52px] rounded-2xl bg-orange items-center justify-center -mt-[18px]"
                            style={{
                                shadowColor: '#FF5B1F',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.4,
                                shadowRadius: 24,
                                elevation: 8,
                            }}
                        >
                            <Icon name="plus" size={26} color="#FFFFFF" />
                        </AnimatedPressable>
                    );
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TabItem
                        key={route.key}
                        icon={TAB_ICONS[name]}
                        label={TAB_LABELS[name]}
                        active={isFocused}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
};

const Empty = () => (
    <View className="flex-1 items-center justify-center bg-cream">
        <Text className="font-ui text-base text-muted">Coming soon</Text>
    </View>
);

const AppTabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            sceneStyleInterpolator: ({ current }) => ({
                sceneStyle: {
                    opacity: current.progress.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, 1, 0],
                    }),
                },
            }),
        }}
        tabBar={(props) => <ComelongoTabBar {...props} />}
    >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Discover" component={SearchScreen} />
        <Tab.Screen name="Post" component={Empty} />
        <Tab.Screen name="Saved" component={Empty} />
        <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
);

export default AppTabs;
