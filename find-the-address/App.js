import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {API_TOKEN} from '@env'
import * as Location from 'expo-location'

export default function App() {
  const [address, setAddress] = useState(null)
  const [locationInput, setLocationInput] = useState(null)

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if ( status !== 'granted') {
      Alert.alert('No permissions to get location')
      return
    }
    let currentLocation = await Location.getCurrentPositionAsync({})
    setAddress({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    })
  }
  useEffect(() => {
    getLocation()
  }, [])

  const moveToLocation = async () => {
    try {
      const formattedStreet = locationInput.replace(/ /g,'+')
      const response = await fetch(`https://geocode.maps.co/search?street=${formattedStreet}&country=FI&api_key=${API_TOKEN}`);
      const data = await response.json()
      if (data.length > 0) {
        const { lat, lon } = data[0]
        setAddress({ latitude: parseFloat(lat), longitude: parseFloat(lon)})
      } else {
        console.warn('Location not found')
      }
    } catch (error) {
      console.error('Error fetching geocoding data: ', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: address?.latitude || 60.16899931,
          longitude: address?.longitude || 24.93766280,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
          <Marker 
            coordinate={{
              latitude: address?.latitude || 60.16899931,
              longitude: address?.longitude || 24.93766280,
            }}
            title='Rautatientori'
          />
        </MapView>
        <TextInput
          value={locationInput}
          onChangeText={(text) => setLocationInput(text)}
          placeholder='Type your address (in Finland only)'
        />
        <Button onPress={moveToLocation} title='Find' />
      <StatusBar style="auto" />
    </View>      
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  }
});
