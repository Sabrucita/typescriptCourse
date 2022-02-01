import {Text} from 'react-native';
import React from 'react';
import CustomButton from '../shared/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../helpers/Types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({navigation}: Props) => {
  return (
    <>
      <Text>Welcome to</Text>
      <Text>RADIUM CARE</Text>
      <CustomButton onPress={() => navigation.navigate('Login')} text="Login" />
    </>
  );
};

export default Welcome;
