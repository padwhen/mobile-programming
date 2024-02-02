import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [userGuess, setUserGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const handleGuess = () => {
    const guess = parseInt(userGuess)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100')
    } else if (guess < secretNumber) {
      setFeedback('Too low! Try again.')
    } else if (guess > secretNumber) {
      setFeedback('Too high! Try again')
    } else {
      setFeedback(`Congrats! You guessed the correct number ${secretNumber}`)
      setSecretNumber(Math.floor(Math.random() * 100) + 1)
    }
    console.log(secretNumber)
    setUserGuess('')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{feedback}</Text>
      <TextInput
        style={styles.input} placeholder="Enter your guess"
        keyboardType='numeric' onChangeText={(text) => setUserGuess(text)} />
      <Button title='Guess' onPress={handleGuess} />
    </View>
  )
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
    width: '50%'
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
