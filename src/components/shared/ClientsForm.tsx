import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import clientType from '../../helpers/clientType';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import Toast from 'react-native-simple-toast';
interface Props {
  onCloseAdd: () => void;
  clients: clientType[];
}

const ClientsForm: React.FC<Props> = ({onCloseAdd, clients}) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onAddClientPressed = (data: clientType) => {
    const sortedList = clients.sort((a, b) => {
      return a.id - b.id;
    });
    const listLength = sortedList.length - 1;
    const newId = sortedList[listLength].id + 1;
    data.id = newId;
    clients.push(data);
    Toast.show('New client added successfully.');
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<clientType>();
  return (
    <>
      <View style={styles.addContainer}>
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
        <CustomButton onPress={onCloseAdd} text="CLOSE" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addContainer: {},
});

export default ClientsForm;
