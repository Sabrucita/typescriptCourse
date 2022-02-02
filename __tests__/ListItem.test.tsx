import 'react-native';
import React from 'react';
import ListItem from '../src/Components/shared/ListItem';

// Note: test renderer must be required after react-native.
import {render, waitFor, fireEvent} from '@testing-library/react-native';

const client = {
  id: 1,
  name: 'a',
  email: 'a@sd.com',
  username: 'asd',
};

describe('ListItem', () => {
  it('renders correctly', async () => {
    const onDelete = jest.fn();

    const {getByText, getByTestId, toJSON} = render(
      <ListItem
        client={client}
        onDelete={onDelete}
        onUpdateClient={() => {}}
      />,
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);

    expect(getByText(`Name: ${client.name}`)).toBeTruthy();
    expect(onDelete).toBeCalled();
  });
});
