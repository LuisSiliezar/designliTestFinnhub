import React, { useEffect, useState } from 'react';
import { useStockWebSocket } from '@presentation/hooks';
import StockCard from '@presentation/components/shared/StockCard';
import { View, FlatList, StyleSheet } from 'react-native';
import { Stock } from '@domain/entities';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '@src/presentation/routes/StackNavigation';
import { useNavigation } from '@react-navigation/native';
import IconButton from '@src/presentation/components/shared/IconButton';
import { SkeletonLoaderWatchlist } from '@src/presentation/components/shared/SkeletonLoaderWatchlist';
import MarketClosedAnimation from '@src/presentation/components/shared/MarketClosedAnimation';
type NavigationProp = StackNavigationProp<RootStackParams, 'Watchlist'>;

const WatchlistScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Watchlist',
            headerLeft: () => (
                <IconButton iconName="chevron-back-outline" onPress={() => navigation.goBack()} />
            ),
        });
    }, [navigation]);

    const [symbols] = useState<string[]>([
        'AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA',
        'META', 'NFLX', 'NVDA', 'AMD', 'INTC',
        'SPY', 'BABA', 'DIS', 'BA', 'V',
        'PYPL', 'CSCO', 'IBM', 'NKE', 'KO',
        'PEP', 'JNJ', 'PFE', 'MRK', 'MCD',
        'WMT', 'HD', 'LOW', 'T', 'VZ',
        'SQ', 'LULU', 'GM', 'F', 'BA',
        'GS', 'JPM', 'C', 'AXP', 'MS',
    ]);

    const { stocks, marketStatus } = useStockWebSocket(symbols);
    const renderItem = ({ item }: { item: Stock }) => (
        <StockCard
            symbol={item.symbol ?? ''}
            name={item.name ?? ''}
            price={item.currentPrice ?? 0}
            changePercentage={item.changePercentage ?? 0}
        />
    );
    if (marketStatus.isOpen === false) {
        return (
            <MarketClosedAnimation message="Market is closed at the moment" submessage="Please try again at a later time" />
        );
    }

    if (stocks.length === 0) {
        return (
            <SkeletonLoaderWatchlist />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={stocks}
                renderItem={renderItem}
                keyExtractor={(item) => item.symbol ?? ''}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        marginVertical: 5,
    },
    change: {
        fontSize: 14,
    },
    positiveChange: {
        color: '#008000',
    },
    negativeChange: {
        color: '#FF0000',
    },
});

export default WatchlistScreen;
