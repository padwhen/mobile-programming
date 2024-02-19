import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button, Alert, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('')
  const [repositories, setRepositories] = useState([])

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals.map(meal => ({
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb
    }))))
    .catch(error => {
      Alert.alert('Error', error)
    })
  }

  console.log(repositories)

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1, width: "80%", backgroundColor: "#CED0CE", marginLeft: "10%"
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Type keyword'
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Button title="Find" onPress={getRepositories} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          keyExtractor={(item, index) => index.toString()}
          data={repositories}  // Add this line to provide data to FlatList
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{item.strMeal}</Text>
              <Image source={{ uri: item.strMealThumb }} style={styles.itemImage} />
            </View>
          )}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    width: 200,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listContainer: {
    flex: 6,
    width: '100%',
  },
  flatList: {
    marginLeft: "5%",
  },
  listItem: {
    margin: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});
