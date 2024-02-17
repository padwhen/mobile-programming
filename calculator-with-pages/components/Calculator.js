import { useState } from "react";
import { Keyboard } from "react-native";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function Calculator({ navigation }) {
    const [expression, setExpression] = useState([])
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [result, setResult] = useState('')
    const handleSum = () => {
        const parsedNum1 = parseFloat(num1)
        const parsedNum2 = parseFloat(num2)
        if (!isNaN(parsedNum1) && !isNaN(parsedNum2)) {
            const sum = parsedNum1 + parsedNum2
            setResult(sum)
            const newExpression = `${num1} + ${num2} = ${sum}`
            setExpression((prev) => [...prev, newExpression])
            setNum1('')
            setNum2('')
            Keyboard.dismiss()
        }
    }

    const handleSubtraction = () => {
        const parsedNum1 = parseFloat(num1)
        const parsedNum2 = parseFloat(num2)
        if (!isNaN(parsedNum1) && !isNaN(parsedNum2)) {
            const subtraction = parsedNum1 - parsedNum2
            setResult(subtraction)
            const newExpression = `${num1} - ${num2} = ${subtraction}`
            setExpression((prev) => [...prev, newExpression])
            setNum1('')
            setNum2('')
            Keyboard.dismiss()
        }
    }

    const handlePress = () => {
        navigation.navigate('History', { expressions: expression })
    }

    return (
        <View style={styles.container}>
            {result && <Text>Result: {result}</Text>}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Number 1"
                value={num1}
                onChangeText={(text) => setNum1(text)} />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Number 2"
                value={num2}
                onChangeText={(text) => setNum2(text)} />
            <Button title="+" onPress={handleSum} />
            <Button title="-" onPress={handleSubtraction} />
            <Button title="History" onPress={handlePress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%'
    }
})