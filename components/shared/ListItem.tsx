import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: number;
  name: string;
  email: string;
  onDelete: () => void;
}

const ListItem: React.FC<Props> = ({id, name, email, onDelete}) => {
  return(
      <View style={styles.listContainer}>
        <View>
          <Text style={styles.item}>ID: {id}</Text>
          <Text style={styles.item}>Name: {name}</Text>
          <Text style={styles.item}>Email: {email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
        </View>
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
