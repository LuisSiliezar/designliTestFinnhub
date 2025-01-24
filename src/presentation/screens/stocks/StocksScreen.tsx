import React from 'react';
import StockPricesList from '@presentation/components/lists/StockPricesList';
import StockChart from '@presentation/components/shared/StockChart';
import { useStocksPrice } from '@presentation/hooks';
import { ScrollView, StyleSheet } from 'react-native';


const StocksScreen: React.FC = () => {
    const { stockData } = useStocksPrice();

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <StockChart stockData={stockData} />
            <StockPricesList stockData={stockData} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
    },
});

export default StocksScreen;
