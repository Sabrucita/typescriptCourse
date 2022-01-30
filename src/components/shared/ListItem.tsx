import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
//import Toast from 'react-native-simple-toast';

interface Props {
  id: number;
  name: string;
  email: string;
  onDelete: () => void;
  onUpdatePressed: () => void;
}

interface Data {
  email: string;
  name: string;
}

const ListItem: React.FC<Props> = ({
  id,
  name,
  email,
  onDelete,
  onUpdatePressed,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onUpdate = () => {
    setIsUpdating(true);
    return (
      <View>
        <CustomInput
          name="name"
          placeholder="Full name"
          control={control}
          keyboardType="default"
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 5,
              message: 'Full name should be at least 5 characters long',
            },
          }}
          autoCapitalize={''}
          secureTextEntry={false}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          autoCapitalize={''}
          secureTextEntry={false}
        />
        <CustomButton
          onPress={handleSubmit(onUpdatePressed)}
          text="Update Client"
        />
      </View>
    );
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<Data>();

  return (
    <View style={styles.listContainer}>
      {!isUpdating ? (
        <>
          <View>
            <Text style={styles.item}>ID: {id}</Text>
            <Text style={styles.item}>Name: {name}</Text>
            <Text style={styles.item}>Email: {email}</Text>
          </View>
          <View>
            <Pressable style={styles.button} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={onUpdate}>
                Update
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        onUpdate()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    fontWeight: '700',
    fontSize: 20,
    borderWidth: 0.2,
    borderLeftWidth: 5,
    borderLeftColor: '#015D67',
    padding: 20,
    textAlign: 'center',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    fontWeight: '500',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 5,
    width: 90,
    borderWidth: 1,
    borderColor: '#015D67',
    borderRadius: 20,
  },
  buttonText: {
    color: '#015D67',
    textAlign: 'center',
    fontWeight: '800',
  },
});

export default ListItem;
