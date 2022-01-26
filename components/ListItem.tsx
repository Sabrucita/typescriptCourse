import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  id: number;
  name: string;
  email: string;
}

const ListItem: React.FC<Props> = ({id, name, email}) => {
  return(
      <View style={styles.listContainer}>
				<Text style={styles.item}>ID: {id}</Text>
				<Text style={styles.item}>Name: {name}</Text>
				<Text style={styles.item}>Email: {email}</Text>
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
  },
  item: {
    fontWeight: '500',
    fontSize: 15
  }
})

export default ListItem;
