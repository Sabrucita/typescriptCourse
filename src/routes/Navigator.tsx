import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ClientsList from '../Components/ClientsList';
import AddClientsForm from '../Components/AddClientsForm';
import UpdateClientForm from '../Components/UpdateClientsForm';
import Login from '../Components/Auth/Login';
import Welcome from '../Components/Welcome';
import Home from '../Components/Home';

const ClientsStack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [isLogged, setLogged] = useState(true);

  useEffect(() => {
    setLogged(true);
  }, []);

  function ClientStackScreen() {
    return (
      <ClientsStack.Navigator>
        <ClientsStack.Screen name="CLIENTS LIST" component={ClientsList} />
        <ClientsStack.Screen name="AddClientsForm" component={AddClientsForm} />
        <ClientsStack.Screen
          name="UpdateClientForm"
          component={UpdateClientForm}
        />
      </ClientsStack.Navigator>
    );
  }

  return isLogged ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Tab.Screen name="Clients" component={ClientStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: '',
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
