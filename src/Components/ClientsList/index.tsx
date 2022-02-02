import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientType, RootStackParamList} from '../../helpers/Types';
//import AddClientsForm from '../AddClientsForm';
import ListItem from '../shared/ListItem';
import CustomButton from '../shared/CustomButton';
import {AppPermissionsContext} from '../../context/';

type Props = NativeStackScreenProps<RootStackParamList, 'AddClientsForm'>;

const ClientsList: React.FC<Props> = ({navigation}) => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const permissionsProvider = useContext(AppPermissionsContext);

  const onCloseButton = () => {
    setShowAddForm(false);
  };

  const onUpdate = (client: ClientType) => {
    permissionsProvider?.onUpdateClient(client);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <View style={styles.container}>
        <>
          {showAddForm && (
            <CustomButton
              onPress={() =>
                navigation.navigate('AddClientsForm', {
                  clients,
                  setClients,
                })
              }
              text="AddClientsForm"
            />
          )}
          <FlatList
            refreshing={permissionsProvider?.loading}
            ListHeaderComponent={
              <>
                <CustomButton
                  onPress={() =>
                    navigation.navigate('AddClientsForm', {
                      clients,
                      setClients,
                    })
                  }
                  text="ADD NEW CLIENT"
                />
              </>
            }
            data={permissionsProvider?.clients}
            renderItem={({item}) => (
              <ListItem
                client={item}
                onDelete={() => permissionsProvider?.deleteHandler(item.id)}
                onCloseButton={onCloseButton}
                onUpdateClient={onUpdate}
                clients={[]}
              />
            )}
          />
        </>
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  buttonContainer: {},
  addContainer: {},
});

export default ClientsList;
