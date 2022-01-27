import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import CustomButton from './components/shared/CustomButton';
import CustomInput from './components/shared/CustomInput';
import ListItem from './components/shared/ListItem';
//import Login from './components/Login';
import clientType from './helpers/clientType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
interface Data {
  email: string,
  password: string,
}

const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [clients, setClients] = useState<clientType[]>([])
  const [loading, setLoading] = useState(false)

  const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

  useEffect(() => {
    onRefresh();
  }, [])

  const email= 'Sabri@mail.com'
  const password= 'Pass1234'

  const onSignInPressed = (data: Data) => {
    console.log('email', data.email, 'password', data.password);
    if(data.email === email && data.password === password){
      setIsLogged(true);
      storeData(data);
    } else {
      Alert.alert('Invalid user, try again.')
    }
  }

  const storeData = async (data: Data) => {
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteHandler = (id: number) => {
    setClients((prevClient) => {
      return prevClient.filter(client => client.id != id)
    })
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>RADIUM CARE</Text>
        </View>
          {isLogged ?
          <FlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListHeaderComponent={<Text style={styles.title}>CLIENTS</Text>}
            keyExtractor={(item) => item.id.toString()}
            data={clients}
            renderItem={({ item }) => (
              <ListItem id={item.id} name={item.name} email={item.email} onDelete={() => deleteHandler(item.id)} />
            )}
          /> :
          <View>
            <CustomInput
            name="email"
            placeholder="Email"
            keyboardType='email-address'
            control={control}
            rules={{required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
            />
            <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            keyboardType='default'
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
          </View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontWeight: "700",
    fontSize: 20,
    backgroundColor: "#015D67",
    color: "#FFF",
    padding: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  safeArea: {
    flex: 1,
  },
  container:{
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
  buttonContainer: {
  }
});

export default App;
