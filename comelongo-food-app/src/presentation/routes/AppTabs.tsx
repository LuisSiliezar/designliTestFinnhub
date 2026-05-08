import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import FeedScreen from '@presentation/screens/feed/FeedScreen';
import SearchScreen from '@presentation/screens/search/SearchScreen';
import ProfileScreen from '@presentation/screens/profile/ProfileScreen';
import { Icon } from '@presentation/components/shared';
import { IconName } from '@presentation/components/shared/Icon';
import { colors, typography } from '@presentation/theme';

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

const ComelongoTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const rootNav = useNavigation<any>();
    return (
        <View style={styles.bar}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const name = route.name as keyof AppTabsParams;
                const icon = TAB_ICONS[name];
                const label = TAB_LABELS[name];

                if (name === 'Post') {
                    return (
                        <Pressable
                            key={route.key}
                            onPress={() => rootNav.navigate('CreatePost', {})}
                            style={styles.primary}
                        >
                            <Icon name="plus" size={26} color={colors.paper} />
                        </Pressable>
                    );
                }

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable key={route.key} onPress={onPress} style={styles.tab}>
                        <Icon
                            name={icon}
                            size={24}
                            color={isFocused ? colors.ink : colors.textSubtle}
                        />
                        <Text
                            style={[
                                styles.label,
                                { color: isFocused ? colors.ink : colors.textSubtle },
                            ]}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const Empty = () => <View style={styles.empty}><Text style={styles.emptyText}>Coming soon</Text></View>;

const AppTabs = () => (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <ComelongoTabBar {...props} />}
    >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Discover" component={SearchScreen} />
        <Tab.Screen name="Post" component={Empty} />
        <Tab.Screen name="Saved" component={Empty} />
        <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 28,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 0.5,
        borderColor: colors.border,
    },
    tab: {
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 3,
    },
    label: {
        fontFamily: typography.ui,
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    primary: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -18,
        shadowColor: colors.orange,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 8,
    },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
    emptyText: { fontFamily: typography.ui, color: colors.textMuted, fontSize: 16 },
});

export default AppTabs;
