import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Stock } from '@domain/entities';
import { ScrollView } from 'react-native-gesture-handler';
import StockPriceItem from '../shared/StockPriceItem';

interface StockListProps {
    stockData: Stock[];
}

const StockPricesList = ({ stockData }: StockListProps) => {
    return (
        <ScrollView style={styles.stockContainer}>
            <Text style={styles.title}>Stocks List</Text>
            {stockData.map((stock, index) => (
                <StockPriceItem key={index} stock={stock} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    stockContainer: {
        backgroundColor: '#f6f6f6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        marginHorizontal: 12,
        marginTop: 20,
    },
});

export default StockPricesList;
