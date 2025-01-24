import { useState, useEffect } from 'react';
import { Stock } from '@domain/entities';

const getStockName = (symbol: string): string => {
    const stockNames: { [key: string]: string } = {
        AAPL: 'Apple',
        GOOG: 'Google',
        AMZN: 'Amazon',
        MSFT: 'Microsoft',
        TSLA: 'Tesla',
        META: 'Meta Platforms',
        NFLX: 'Netflix',
        NVDA: 'Nvidia',
        AMD: 'Advanced Micro Devices',
        INTC: 'Intel',
        SPY: 'SPDR S&P 500 ETF',
        BABA: 'Alibaba',
        DIS: 'Walt Disney',
        BA: 'Boeing',
        V: 'Visa',
        PYPL: 'PayPal',
        CSCO: 'Cisco',
        IBM: 'IBM',
        NKE: 'Nike',
        KO: 'Coca-Cola',
        PEP: 'PepsiCo',
        JNJ: 'Johnson & Johnson',
        PFE: 'Pfizer',
        MRK: 'Merck',
        MCD: 'McDonald\'s',
        WMT: 'Walmart',
        HD: 'Home Depot',
        LOW: 'Lowe\'s',
        T: 'AT&T',
        VZ: 'Verizon',
        SQ: 'Square',
        LULU: 'Lululemon',
        GM: 'General Motors',
        F: 'Ford',
        GS: 'Goldman Sachs',
        JPM: 'JPMorgan Chase',
        C: 'Citigroup',
        AXP: 'American Express',
        MS: 'Morgan Stanley',
    };
    return stockNames[symbol] || symbol;
};

export const useStockWebSocket = (symbols: string[]) => {
    const [_socket, setSocket] = useState<WebSocket | null>(null);
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        const socketConnection = new WebSocket(`wss://ws.finnhub.io?token=${process.env.API_KEY}`);

        socketConnection.onopen = () => {
            console.log('WebSocket connected');
            symbols.forEach((stock) => {
                socketConnection.send(
                    JSON.stringify({
                        type: 'subscribe',
                        symbol: stock,
                    })
                );
            });
        };

        socketConnection.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === 'trade' && message.data && message.data.length > 0) {
                    const trade = message.data[0];
                    const symbol = trade.s;
                    const price = trade.p;

                    setStocks((prevStocks) => {
                        const existingStockIndex = prevStocks.findIndex((stock) => stock.symbol === symbol);

                        if (existingStockIndex !== -1) {
                            const existingStock = prevStocks[existingStockIndex];

                            const previousPrice = existingStock.previousPrice ?? price;

                            const changePercentage = previousPrice !== 0
                                ? ((price - previousPrice) / previousPrice) * 100
                                : 0;
                            const updatedStock = {
                                ...existingStock,
                                previousPrice: price,
                                currentPrice: price,
                                changePercentage: changePercentage,
                            };

                            const updatedStocks = [...prevStocks];
                            updatedStocks[existingStockIndex] = updatedStock;

                            return updatedStocks;
                        } else {
                            const name = getStockName(symbol);
                            return [
                                ...prevStocks,
                                {
                                    symbol,
                                    name,
                                    currentPrice: price,
                                    previousPrice: price,
                                    changePercentage: 0,
                                },
                            ];
                        }
                    });
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socketConnection.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        socketConnection.onclose = () => {
        };

        setSocket(socketConnection);

        return () => {
            if (socketConnection) {
                socketConnection.close();
            }
        };
    }, [symbols]);

    return { stocks };
};
