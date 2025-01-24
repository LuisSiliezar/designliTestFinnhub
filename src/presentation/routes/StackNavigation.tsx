import React from 'react';
import AlertScreen from '@presentation/screens/alert/AlertScreen';
import { createStackNavigator } from '@react-navigation/stack';
import WatchlistScreen from '@presentation/screens/watchlist/WatchlistScreen';
import StocksScreen from '@presentation/screens/stocks/StocksScreen';

export type RootStackParams = {
    Alert: undefined;
    Watchlist: undefined;
    Stocks: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Watchlist"
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Watchlist" component={WatchlistScreen} />
            <Stack.Screen name="Stocks" component={StocksScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigation;
