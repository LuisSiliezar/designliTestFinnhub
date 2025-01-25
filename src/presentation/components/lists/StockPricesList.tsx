import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stock } from '@domain/entities';
import { ScrollView } from 'react-native-gesture-handler';

interface StockListProps {
    stockData: Stock[];
}

const StockPricesList = ({ stockData }: StockListProps) => {
    return (
        <ScrollView style={styles.stockContainer}>
            <Text style={styles.title}>Stocks List</Text>
            {stockData.map((stock, index) => (
                <View key={index} style={styles.stockItem}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockPrice}>${stock.currentPrice?.toFixed(2)}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    stockContainer: {
        backgroundColor: '#efefef',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        marginHorizontal: 12,
        marginTop: 20,
    },
    stockItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: '#fff',

    },
    stockSymbol: {
        fontSize: 18,
        fontWeight: '600',
    },
    stockPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2e7d32',
    },
});

export default StockPricesList;
