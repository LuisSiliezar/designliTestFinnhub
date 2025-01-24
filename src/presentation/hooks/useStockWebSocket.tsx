import { useState, useEffect } from 'react';

interface Stock {
    symbol: string;
    name: string;
    price: number;
    previousPrice: number;
    changePercentage: number;
}

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
                        const existingStock = prevStocks.find((stock) => stock.symbol === symbol);
                        if (existingStock) {
                            const changePercentage = ((price - existingStock.previousPrice) / existingStock.previousPrice) * 100;

                            existingStock.price = price;
                            existingStock.changePercentage = changePercentage;
                            existingStock.previousPrice = price;

                            return [...prevStocks];
                        } else {
                            const name = getStockName(symbol);
                            return [
                                ...prevStocks,
                                {
                                    symbol,
                                    name,
                                    price,
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

    return stocks;
};
