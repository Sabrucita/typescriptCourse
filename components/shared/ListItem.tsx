import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Toast from 'react-native-simple-toast';

interface Props {
  id: number;
  name: string;
  email: string;
  onDelete: () => void;
  onUpdatePressed: () => void;
}

interface Data {
  email: string,
  name: string,
}

const ListItem: React.FC<Props> = ({id, name, email, onDelete, onUpdatePressed}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onUpdate = () => {
    setIsUpdating(true)
    return (
      <View>
        <CustomInput
        name="name"
        placeholder="Full name"
        control={control}
        keyboardType='default'
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
        keyboardType='email-address'
        control={control}
        rules={{required: 'Email is required',
        pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
        />
        <CustomButton
          onPress={handleSubmit(onUpdatePressed)}
          text="Update Client"
        />
      </View>
    )
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();

  return(
    <View style={styles.listContainer}>
      {!isUpdating ?
      <>
        <View>
          <Text style={styles.item}>ID: {id}</Text>
          <Text style={styles.item}>Name: {name}</Text>
          <Text style={styles.item}>Email: {email}</Text>
          </View><View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={onUpdate}>Update</Text>
            </Pressable>
        </View>
      </>: onUpdate()
      }
    </View>
  )
}

const styles = StyleSheet.create({
	listContainer: {
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: '#C2D7DA',
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
    borderColor: '#015D67',
    borderRadius: 20,
  },
  buttonText: {
    color: '#015D67',
    textAlign: 'center',
    fontWeight: '800',
  },
  buttonContainer: {
  }
})

export default ListItem;
