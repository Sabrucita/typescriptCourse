import React, {useState, useEffect, createContext, FC} from 'react';
import {ClientType} from '../helpers/Types';
import {iClientContext} from '../helpers/Types';

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

  return (
    <AppPermissionsContext.Provider
      value={{
        clients,
        loading,
      }}>
      {children}
    </AppPermissionsContext.Provider>
  );
};

export default AppPermissionsProvider;
