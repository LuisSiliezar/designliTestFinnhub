import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Stock } from '@domain/entities';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface StockChartProps {
    stockData: Stock[];
}

const StockChart = ({ stockData }: StockChartProps) => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
            <BarChart
                data={{
                    labels: stockData
                        .map(stock => stock.symbol)
                        .filter((symbol): symbol is string => symbol !== undefined),
                    datasets: [
                        {
                            data: stockData.map(stock => stock.currentPrice ?? 0),
                        },
                    ],
                }}
                width={screenWidth * 5}
                height={screenHeight * 0.3}
                chartConfig={{
                    backgroundColor: '#1E2923',
                    backgroundGradientFrom: '#08130D',
                    backgroundGradientTo: '#08130D',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 0,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                yAxisLabel="$"
                yAxisSuffix=""
            />
        </ScrollView>
    );
};

export default StockChart;
