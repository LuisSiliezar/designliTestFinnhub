import React from 'react';
import { StockCardProps } from '@infrastructure/interfaces';
import { View, Text, StyleSheet } from 'react-native';


const StockCard = ({ symbol, name, price, changePercentage }: StockCardProps) => (
    <View style={styles.card}>
        <Text style={styles.name}>{name} ({symbol})</Text>
        <Text style={styles.value}>${price.toFixed(2)}</Text>
        <Text
            style={[
                styles.change,
                changePercentage >= 0 ? styles.positiveChange : styles.negativeChange,
            ]}
        >
            {changePercentage >= 0
                ? `+${changePercentage.toFixed(2)}%`
                : `${changePercentage.toFixed(2)}%`}
        </Text>
    </View>
);

const styles = StyleSheet.create({
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

export default StockCard;
