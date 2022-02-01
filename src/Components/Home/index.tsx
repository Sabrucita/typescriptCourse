import {StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomButton from '../shared/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../helpers/Types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Home = ({navigation}: Props) => {
  return (
    <>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.radiumText}>RADIUM CARE</Text>
      <CustomButton
        onPress={() => navigation.navigate('Welcome')}
        text="Logout"
      />
    </>
  );
};
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '50%',
  },
  radiumText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Home;
