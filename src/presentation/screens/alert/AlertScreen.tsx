import React, { useState } from 'react';
import { useStocks } from '@presentation/hooks';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AlertScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string>('');

  const { isLoading, stocks } = useStocks();

  const handleSubmit = () => {
    if (!selectedStock || !priceAlert) {
      Alert.alert('Error', 'Select stock and price alert');
    } else {
      Alert.alert('Success', `Alert set for ${selectedStock} at $${priceAlert}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Set Price Alert</Text>

      {isLoading ? (
        <Text>Loading stocks...</Text>
      ) : (
        <>
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
            onChangeText={setPriceAlert}
          />
          <Button title="Set Alert" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

// TODO: Edit styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AlertScreen;
