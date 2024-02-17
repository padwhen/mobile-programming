import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Calculator from "./components/Calculator";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}