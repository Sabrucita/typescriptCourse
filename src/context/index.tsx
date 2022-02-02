import React, {useState, useEffect, createContext, FC} from 'react';
import {ClientType} from '../helpers/Types';
import {iClientContext} from '../helpers/Types';
import Toast from 'react-native-simple-toast';

export const AppPermissionsContext = createContext<iClientContext | null>(null);

const AppPermissionsProvider: FC = ({children}) => {
  const [clients, setClients] = useState<ClientType[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(async response => await response.json())
      .then(response => {
        setClients(response);
        setLoading(false);
      })
      .catch(error => {
        error;
      });
  };

  const deleteHandler = (id: number) => {
    setClients(prevClient => {
      Toast.show('Client deleted successfully');
      return prevClient.filter(client => client.id !== id);
    });
  };

  const onUpdateClient = (client: ClientType) => {
    clients.map(oneClient => {
      if (oneClient.id === client.id) {
        oneClient.name = client.name;
        oneClient.email = client.email;
      }
      return client;
    });
    Toast.show('Client updated successfully.');
  };

  return (
    <AppPermissionsContext.Provider
      value={{
        clients,
        loading,
        deleteHandler,
        onUpdateClient,
      }}>
      {children}
    </AppPermissionsContext.Provider>
  );
};

export default AppPermissionsProvider;
