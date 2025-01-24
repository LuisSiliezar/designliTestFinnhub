import React, { useState } from 'react';
import { useStockWebSocket } from '@presentation/hooks';
import StockCard from '@presentation/components/shared/StockCard';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const WatchlistScreen = () => {
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

    const stocks = useStockWebSocket(symbols);
    const renderItem = ({ item }: { item: { symbol: string; name: string; price: number; changePercentage: number } }) => (
        <StockCard
            symbol={item.symbol}
            name={item.name}
            price={item.price}
            changePercentage={item.changePercentage}
        />
    );

    // TODO: CREATE LOADING COMPONENT
    return (
        <View style={styles.container}>
            {
                stocks.length === 0 ? (
                    <Text>Loading...</Text>
                ) : (

                    <FlatList
                        data={stocks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.symbol}
                        showsVerticalScrollIndicator={false}
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    // TODO: CREATE A GLOBAL STYLESHEET
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
