import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import CustomButton from './components/shared/CustomButton';
import CustomInput from './components/shared/CustomInput';
import ListItem from './components/shared/ListItem';
import clientType from './helpers/clientType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Toast from 'react-native-simple-toast';
import AddClientsForm from './components/shared/AddClientsForm';
import {NavigationContainer} from '@react-navigation/native';

interface Data {
  email: string;
  password: string;
}
interface Props {}

const App: React.FC<Props> = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [clients, setClients] = useState<clientType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
    checkPreviousLogin();
  }, []);

  const email = 'sabri@mail.com';
  const password = 'pass1234';

  const checkPreviousLogin = async () => {
    const loginData = await AsyncStorage.getItem('loginData');
    if (loginData !== null) {
      setIsLogged(true);
    }
  };

  const onSignInPressed = (data: Data) => {
    if (data.email !== email) {
      return Toast.show('Invalid user, try again.');
    }
    if (data.password !== password) {
      return Toast.show('Invalid password, try again.');
    }
    setIsLogged(true);
    storeData(data);
  };

  const storeData = async (data: Data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('loginData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdateClient = (client: clientType) => {
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

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<Data>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <FlipperAsyncStorage />
        <View style={styles.container}>
          <View>
            <Text style={styles.h1}>RADIUM CARE</Text>
          </View>
          {isLogged ? (
            <>
              {showAddForm && (
                <AddClientsForm
                  clients={clients}
                  onCloseButton={onCloseButton}
                />
              )}
              <FlatList
                refreshing={loading}
                onRefresh={onRefresh}
                ListHeaderComponent={
                  <>
                    <Text style={styles.title}>CLIENTS</Text>
                    <Pressable style={styles.button}>
                      <Text
                        style={styles.buttonText}
                        onPress={addClientPressed}>
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
          ) : (
            <View>
              <CustomInput
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry={false}
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
                }}
              />
              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                }}
              />
              <CustomButton
                onPress={handleSubmit(onSignInPressed)}
                text="SUBMIT"
              />
            </View>
          )}
        </View>
      </NavigationContainer>
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

export default App;
