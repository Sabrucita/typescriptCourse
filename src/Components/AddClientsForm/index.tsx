import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {ClientType, RootStackParamList} from '../../helpers/Types';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';
import Toast from 'react-native-simple-toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'AddClientsForm'>;

const AddClientsForm = ({navigation, route}: Props) => {
  const {clients, setClients} = route.params;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onAddClientPressed: SubmitHandler<ClientType> = data => {
    const sortedList = clients.sort((a, b) => {
      return a.id - b.id;
    });
    const listLength = sortedList.length - 1;
    const newId = sortedList[listLength].id + 1;
    data.id = newId;
    setClients([
      ...clients,
      {
        ...data,
      },
    ]);
    Toast.show('New client added successfully.');
    navigation.navigate('ClientsList');
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<ClientType>();
  return (
    <>
      <Text style={styles.h1}>Add Client Form</Text>
      <View>
        <CustomInput
          name="name"
          placeholder="Full name"
          control={control}
          keyboardType="default"
          autoCapitalize="none"
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 5,
              message: 'Full name should be at least 5 characters long',
            },
          }}
        />
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
        <CustomButton
          onPress={handleSubmit(onAddClientPressed)}
          text="ADD NEW CLIENT"
        />
      </View>
    </>
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
});

export default AddClientsForm;
