/**
 * @format
 */

import 'react-native';
import React from 'react';
import CustomButton from '../src/Components/shared/CustomButton';

// Note: test renderer must be required after react-native.
import {render, waitFor} from '@testing-library/react-native';

jest.useFakeTimers();

describe('CustomButton', () => {
  it('renders correctly', async () => {
    const {getByText, queryByTestId, toJSON} = render(
      <CustomButton
        onPress={() => {}}
        text="Test text"
        testID="example-button"
      />,
    );

    await waitFor(() => expect(queryByTestId('example-button')).toBeTruthy());

    expect(getByText('Test text')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
