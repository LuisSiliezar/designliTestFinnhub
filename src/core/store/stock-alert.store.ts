import { Stock } from '@src/domain/entities';
import { create } from 'zustand';

interface StockAlertState {
    stockList: Stock[];
    addStock: (stock: Stock) => void;
    clearStockList: () => void;
}

export const useStockAlertStore = create<StockAlertState>()((set) => ({
    stockList: [],
    clearStockList: () => {
        set({ stockList: [] });
    },
    addStock: (stock: Stock) => {
        set((state) => {
            const stockExists = state.stockList.some(existingStock => existingStock.symbol === stock.symbol);
            if (stockExists) {
                return state;
            } else {
                return {
                    stockList: [...state.stockList, stock],
                };
            }
        });
    },
}));
