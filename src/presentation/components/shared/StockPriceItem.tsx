import { Stock } from '@src/domain/entities';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface StockListProps {
    stock: Stock;
}

const StockPriceItem = ({ stock }: StockListProps) => {
    return (
        <View style={styles.stockItem}>
            <Text style={styles.stockSymbol}>{stock.symbol}</Text>
            <Text style={styles.stockPrice}>${stock.currentPrice?.toFixed(2)}</Text>
        </View>);
};

const styles = StyleSheet.create({
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

export default StockPriceItem;
