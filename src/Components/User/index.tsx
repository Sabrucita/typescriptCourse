import {StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomButton from '../shared/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../helpers/Types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const User = ({navigation}: Props) => {
  return (
    <>
      <Text style={styles.welcomeText}>User</Text>
      <Text style={styles.radiumText}>PROFILE</Text>
      <CustomButton
        onPress={() => navigation.navigate('Welcome')}
        text="UPLOAD YOUR PHOTO"
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

export default User;
