import React, { useEffect, useState } from 'react';
import { RootStackParams } from '@src/presentation/routes/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useStocks } from '@presentation/hooks';
import { View, Text, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconButton from '@src/presentation/components/shared/IconButton';
import { SkeletonLoaderAlert } from '@src/presentation/components/shared';
import { useStockAlertStore } from '@src/core/store/stock-alert.store';
import StockSavedPricesList from '@src/presentation/components/lists/StockSavedPricesList';

type NavigationProp = StackNavigationProp<RootStackParams, 'Alert'>;

const AlertScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton iconName="chevron-back-outline" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const { isLoading, stocks } = useStocks();
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string>('');
  const stockList = useStockAlertStore(state => state.stockList);
  const addStock = useStockAlertStore(state => state.addStock);

  const handlePriceAlertChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 8);
    setPriceAlert(numericText);
  };

  const handleSubmit = () => {
    if (!selectedStock || !priceAlert) {
      Alert.alert('Error', 'Select stock and price alert');
    } else {
      const stockExists = stockList.some(stock => stock.symbol === selectedStock);

      if (stockExists) {
        Alert.alert('Error', `Alert for ${selectedStock} already exists!`);
      } else {
        addStock({ symbol: selectedStock, currentPrice: Number(priceAlert) });
        Alert.alert('Success', `Alert set for ${selectedStock} at $${priceAlert}`);
      }
    }
  };

  if (isLoading) {
    return (
      <SkeletonLoaderAlert />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Set Price Alert</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={stocks.map(stock => ({
          label: stock.name,
          value: stock.symbol,
        }))}
        value={selectedStock}
        placeholder="Select a stock"
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropdownContent}
        style={styles.dropdown}
        onChangeValue={(item) => setSelectedStock(item)}
        setValue={setSelectedStock}
        multiple={false}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Set price alert"
        value={priceAlert}
        onChangeText={handlePriceAlertChange}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Set Alert</Text>
      </Pressable>
      <StockSavedPricesList stockData={stockList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderWidth: 0.2,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E2F30',
    marginVertical: 10,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlertScreen;
