import React from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

interface NewClient {
  newUsername: string;
  newEmail: string;
}

const ClientsForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAddForm, setShowAddForm] = useState(false);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onCloseAdd = () => {
    setShowAddForm(false);
  };
  const onAddClientPressed = (data: NewClient) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<NewClient>();
  return (
    <>
      <View style={styles.addContainer}>
        <CustomInput
          name="username"
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
          name="newEmail"
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
          text="ADD CLIENT"
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
