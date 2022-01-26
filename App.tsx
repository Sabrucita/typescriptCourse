import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

  type clientType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: number,
        lng: number
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
  }

const App = () => {

  const [clients, setClients] = useState<clientType[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then( async (response) => await response.json())
    .then((response) => {
      setClients(response)
    })
    .catch((error) => { error});
  }, [])

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={styles.h1}>Radium Care</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={clients}
          renderItem={({item}) => (
          <View style={styles.listContainer}>
            <Text style={styles.item}>ID: {item.id}</Text>
            <Text style={styles.item}>Name: {item.name}</Text>
            <Text style={styles.item}>Email: {item.email}</Text>
          </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: '#015D67',
    color: '#FFF',
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: '#C2D7DA',
    padding: 20,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    fontWeight: '500',
    fontSize: 15
  }
});

export default App;
