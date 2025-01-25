import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Stock } from '@domain/entities';
import { ScrollView } from 'react-native-gesture-handler';
import StockPriceItem from '../shared/StockPriceItem';
import IconButton from '../shared/IconButton';
import { useStockAlertStore } from '@core/store/stock-alert.store';

interface StockListProps {
    stockData: Stock[];
}

const StockSavedPricesList = ({ stockData }: StockListProps) => {
    const clearStockList = useStockAlertStore(state => state.clearStockList);

    return (
        <ScrollView style={styles.stockContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Alert list</Text>
                <IconButton iconName="trash-outline" onPress={clearStockList} iconColor="#b81414" />
            </View>
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
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        marginVertical: 10,
    },
});

export default StockSavedPricesList;
