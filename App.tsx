import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from 'react-native';
import CustomButton from './components/CustomButton';
import CustomInput from './components/CustomInput';
import ListItem from './components/ListItem';
//import Login from './components/Login';
import clientType from './helpers/clientType';
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
      setIsLogged(true)
    } else {
      Alert.alert('Invalid user, try again.')
    }
    }
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>RADIUM CARE</Text>
        </View>
          {isLogged ? <FlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListHeaderComponent={<Text style={styles.title}>CLIENTS</Text>}
            keyExtractor={(item) => item.id.toString()}
            data={clients}
            renderItem={({item}) => (
              <ListItem id={item.id} name={item.name} email={item.email} />
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
  }
});

export default App;
