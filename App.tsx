import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import ListItem from './components/ListItem';
import clientType from './helpers/clientType';

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
    .then( async (response) => await response.json())
    .then((response) => {
      setClients(response)
      setLoading(false)
    })
    .catch((error) => { error});
  }

  const [clients, setClients] = useState<clientType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    onRefresh();
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>RADIUM CARE</Text>
        </View>
          <FlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListHeaderComponent={<Text style={styles.title}>CLIENTS</Text>}
            keyExtractor={(item) => item.id.toString()}
            data={clients}
            renderItem={({item}) => (
              <ListItem id={item.id} name={item.name} email={item.email} />
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  safeArea: {
    flex: 1,
  },
  container:{
    flex: 1,
  }
});

export default App;
