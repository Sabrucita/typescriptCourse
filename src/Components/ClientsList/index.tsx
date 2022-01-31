import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Toast from 'react-native-simple-toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientType, RootStackParamList} from '../../helpers/Types';
import AddClientsForm from '../AddClientsForm';
import ListItem from '../shared/ListItem';

type Props = NativeStackScreenProps<RootStackParamList, 'AddClientsForm'>;

const ClientsList: React.FC<Props> = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(async response => await response.json())
      .then(response => {
        setClients(response);
        setLoading(false);
      })
      .catch(error => {
        error;
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onUpdateClient = (client: ClientType) => {
    clients.map(oneClient => {
      if (oneClient.id === client.id) {
        oneClient.name = client.name;
        oneClient.email = client.email;
      }
      return client;
    });
    Toast.show('Client updated successfully.');
  };

  const deleteHandler = (id: number) => {
    setClients(prevClient => {
      Toast.show('Client deleted successfully');
      return prevClient.filter(client => client.id !== id);
    });
  };

  const addClientPressed = () => {
    setShowAddForm(true);
  };

  const onCloseButton = () => {
    setShowAddForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <View style={styles.container}>
        <>
          {showAddForm && (
            <AddClientsForm clients={clients} onCloseButton={onCloseButton} />
          )}
          <FlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListHeaderComponent={
              <>
                {/*<Text style={styles.title}>CLIENTS</Text>*/}
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText} onPress={addClientPressed}>
                    Add Client
                  </Text>
                </Pressable>
              </>
            }
            keyExtractor={item => item.id.toString()}
            data={clients}
            renderItem={({item}) => (
              <ListItem
                client={item}
                onDelete={() => deleteHandler(item.id)}
                onCloseButton={onCloseButton}
                onUpdateClient={onUpdateClient}
                clients={[]}
              />
            )}
          />
        </>
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
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 5,
    width: 90,
    borderColor: '#015D67',
    borderRadius: 20,
  },
  buttonText: {
    color: '#015D67',
    textAlign: 'center',
    fontWeight: '800',
  },
  buttonContainer: {},
  addContainer: {},
});

export default ClientsList;
