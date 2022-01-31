import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {ClientType} from '../../helpers/Types';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';
import Toast from 'react-native-simple-toast';
interface Props {
  onCloseButton: () => void;
  clients: ClientType[];
}

const AddClientsForm: React.FC<Props> = ({onCloseButton, clients}) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onAddClientPressed = (data: ClientType) => {
    const sortedList = clients.sort((a, b) => {
      return a.id - b.id;
    });
    const listLength = sortedList.length - 1;
    const newId = sortedList[listLength].id + 1;
    data.id = newId;
    clients.push(data);
    Toast.show('New client added successfully.');
    onCloseButton();
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<ClientType>();
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
        <CustomButton onPress={onCloseButton} text="CLOSE" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addContainer: {},
});

export default AddClientsForm;
