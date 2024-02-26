import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite' 

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState(0)
  const [item, setItem] = useState('')
  const db = SQLite.openDatabase('shoppinglist.db')
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppingList (id integer primary key not null, product text, amount text)')
    }, () => console.error('error creating db'), updateList)
  }, [])
  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppingList (product, amount) values (?, ?);',
      [product, amount])
    }, null, updateList)
  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppingList', [], (_, { rows}) => 
        setItem(rows._array)
      )
    }, null, null)
  }
  const deleteItem = (id) => {
    db.transaction(
      tx => {tx.executeSql('delete from shoppingList where id = ?;', [id]);},
      null, updateList
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Item to Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Product' value={product} onChangeText={(text) => setProduct(text)} />
        <TextInput style={styles.input} placeholder='Amount' value={amount} onChangeText={(text) => setAmount(text)} />        
      </View>
      <Button title='Add' onPress={addItem} />
      {item && 
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <Text>{item.product}, {item.amount}</Text>
              <Text style={{ color: '#0000ff'}} onPress={() => deleteItem(item.id)}>
                done
              </Text>
            </View>
          )}
          data={item}
          />
        }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});
