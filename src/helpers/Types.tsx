export type ClientType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Welcome: undefined;
  ClientsList: undefined;
  AddClientsForm: {
    clients: ClientType[];
    setClients: React.Dispatch<React.SetStateAction<ClientType[]>>;
  };
  UpdateClientsForm: {
    clients: ClientType[];
    selectedClient: {
      id: number;
      name: string;
      email: string;
    };
    setClients: React.Dispatch<React.SetStateAction<ClientType[]>>;
  };
};
