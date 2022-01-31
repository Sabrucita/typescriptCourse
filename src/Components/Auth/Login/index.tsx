import React from 'react';
import {useForm} from 'react-hook-form';

import {View} from 'react-native';
import CustomButton from '../../shared/CustomButton';
import CustomInput from '../../shared/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

interface Data {
  email: string;
  password: string;
}

const Login = () => {
  //const [isLogged, setIsLogged] = React.useState(false);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const email = 'sabri@mail.com';
  const password = 'pass1234';

  const onSignInPressed = (data: Data) => {
    if (data.email !== email) {
      return Toast.show('Invalid user, try again.');
    }
    if (data.password !== password) {
      return Toast.show('Invalid password, try again.');
    }
    //setIsLogged(true);
    storeData(data);
  };

  /*const checkPreviousLogin = async () => {
    const loginData = await AsyncStorage.getItem('loginData');
    if (loginData !== null) {
      //setIsLogged(true);
    }
  };*/

  const storeData = async (data: Data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('loginData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  /*useEffect(() => {
    checkPreviousLogin();
  }, []);*/

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<Data>();

  return (
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
      <CustomButton onPress={handleSubmit(onSignInPressed)} text="SUBMIT" />
    </View>
  );
};

export default Login;
