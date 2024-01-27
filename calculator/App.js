import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [result, setResult] = useState('')
  const handleSum = () => {
    const sum = parseFloat(number1) + parseFloat(number2)
    setResult(`Sum: ${sum}`)
  }
  const handleSubtraction = () => {
    const subtraction = parseFloat(number1) - parseFloat(number2)
    setResult(`Subtraction: ${subtraction}`)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter number 1'
        keyboardType='numeric'
        onChangeText={(text) => setNumber1(text)} />
      <TextInput
        style={styles.input}
        placeholder='Enter number 2'
        keyboardType='numeric'
        onChangeText={(text) => setNumber2(text)} />
      <Button title='Sum' onPress={handleSum} />
      <Button title='Subtraction' onPress={handleSubtraction} />
      <Text style={styles.result}>{result}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '100%'
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
