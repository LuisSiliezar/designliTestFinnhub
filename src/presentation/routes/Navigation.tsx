import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WatchlistScreen from '@presentation/screens/watchlist/WatchlistScreen';
import StocksScreen from '@presentation/screens/stocks/StocksScreen';

export type RootStackParams = {
    Watchlist: undefined;
    Stocks: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Watchlist"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Watchlist" component={WatchlistScreen} />
            <Stack.Screen name="Stocks" component={StocksScreen} />
        </Stack.Navigator>
    );
};

export default Navigation;
