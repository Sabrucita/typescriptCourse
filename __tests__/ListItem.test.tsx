import 'react-native';
import React from 'react';
import ListItem from '../src/Components/shared/ListItem';

// Note: test renderer must be required after react-native.
import {render, fireEvent} from '@testing-library/react-native';

const client = {
  id: 1,
  name: 'a',
  email: 'a@sd.com',
};

describe('ListItem', () => {
  it('renders correctly', async () => {
    const onDelete = jest.fn();

    const {getByText, getByTestId} = render(
      <ListItem
        client={client}
        onDelete={onDelete}
        onUpdateClient={() => {}}
      />,
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);

    expect(getByText(`ID: ${client.id}`)).toBeTruthy();
    expect(getByText(`Name: ${client.name}`)).toBeTruthy();
    expect(getByText(`Email: ${client.email}`)).toBeTruthy();

    expect(onDelete).toBeCalled();
  });
});
