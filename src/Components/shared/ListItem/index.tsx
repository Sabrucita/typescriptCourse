import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ClientType} from '../../../helpers/Types';
import UpdateClientsForm from '../../UpdateClientsForm';

interface Props {
  client: ClientType;
  onDelete: () => void;
  onUpdateClient: (client: ClientType) => void;
}

const ListItem: React.FC<Props> = ({
  client,
  client: {id, name, email},
  onDelete,
  onUpdateClient,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const onUpdate = () => {
    setIsUpdating(true);
  };

  const onCloseButton = () => {
    setIsUpdating(false);
  };

  return (
    <View style={styles.listContainer}>
      {isUpdating ? (
        <UpdateClientsForm
          onUpdateClient={onUpdateClient}
          onCloseButton={onCloseButton}
          client={client}
        />
      ) : (
        <>
          <View>
            <Text style={styles.item}>ID: {id}</Text>
            <Text style={styles.item}>Name: {name}</Text>
            <Text style={styles.item}>Email: {email}</Text>
          </View>
          <View>
            <Pressable
              style={styles.button}
              onPress={onDelete}
              testID="delete-button">
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={onUpdate}>
                Update
              </Text>
            </Pressable>
          </View>
        </>
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
