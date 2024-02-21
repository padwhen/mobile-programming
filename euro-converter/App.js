import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_TOKEN } from '@env';

export default function App() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const myHeaders = new Headers();
  myHeaders.append('apikey', API_TOKEN);
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  const fetchExchangeRates = () => {
    fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=&base=EUR", requestOptions)
      .then(response => response.json())
      .then(result => setExchangeRates(result.rates))
      .catch(error => console.log('error', error));
  };

  const handleConvert = () => {
    const inputValue = parseFloat(amount);
    if (!isNaN(inputValue)) {
      const conversionRate = exchangeRates[selectedCurrency];
      const result = inputValue / conversionRate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>
      <Text>Enter amount in {selectedCurrency}:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType='numeric'
      />
      <Text>Select Currency</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        {Object.keys(exchangeRates).map((currencyCode) => (
          <Picker.Item key={currencyCode} label={currencyCode} value={currencyCode} />
        ))}
      </Picker>
      <View style={{marginVertical: 10}}>
       <Button title="Convert" onPress={handleConvert} />
      {convertedAmount !== null && (
        <Text style={styles.result}>
          {amount} {selectedCurrency} is approximately {convertedAmount} EUR
        </Text>
      )} 
      </View>
      
    </View>      
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
