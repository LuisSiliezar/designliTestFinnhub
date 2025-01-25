import React, { useEffect } from 'react';
import StockPricesList from '@presentation/components/lists/StockPricesList';
import StockChart from '@presentation/components/shared/StockChart';
import { useStocksPrice } from '@presentation/hooks';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '@src/presentation/components/shared/IconButton';

import { RootStackParams } from '@presentation/routes/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { SkeletonLoaderStocks } from '@src/presentation/components/shared';

type NavigationProp = StackNavigationProp<RootStackParams, 'Stocks'>;

const StocksScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { stockData, isLoading, error } = useStocksPrice();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRight}>
                    <IconButton iconName="notifications-outline" onPress={() => navigation.navigate('Alert')} />
                    <IconButton iconName="eye-outline" onPress={() => navigation.navigate('Watchlist')} />
                </View>
            ),
        });
    }, [navigation]);

    if (isLoading) {
        return (
            <View>
                <SkeletonLoaderStocks />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>There was an error loading stock data. Please try again later.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
            <StockChart stockData={stockData} />
            <StockPricesList stockData={stockData} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
    },
});

export default StocksScreen;
