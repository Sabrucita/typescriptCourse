import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {ClientType} from '../../helpers/Types';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';

interface Props {
  onCloseButton: () => void;
  client: ClientType;
  onUpdateClient: (client: ClientType) => void;
}

const UpdateClientsForm: React.FC<Props> = ({
  onCloseButton,
  client,
  onUpdateClient,
}) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onSubmit: SubmitHandler<ClientType> = data => {
    onUpdateClient({
      ...client,
      ...data,
    });
    onCloseButton();
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<ClientType>();

  useEffect(() => {
    setValue('name', client.name);
    setValue('email', client.email);
  }, [setValue, client]);

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
        <CustomButton onPress={handleSubmit(onSubmit)} text="UPDATE CLIENT" />
        <CustomButton onPress={onCloseButton} text="CLOSE" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addContainer: {},
});

export default UpdateClientsForm;
