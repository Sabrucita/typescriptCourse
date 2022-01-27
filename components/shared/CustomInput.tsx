import React from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import {Controller} from 'react-hook-form';

interface Props {
	control: any,
	name: string,
	rules: any,
	placeholder: string,
	keyboardType: KeyboardTypeOptions,
}
const CustomInput: React.FC<Props> = ({control,
  name,
  rules = {},
  placeholder,
	keyboardType = 'default',
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
							keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch', marginHorizontal: 30, marginBottom: 20}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
		backgroundColor: "#FFF",
		padding: 10,
		borderColor: "#e8e8e8",
		borderWidth: 1,
		borderRadius: 10,
		marginHorizontal: 30,
		marginVertical: 10,
  },
  input: {
	},
});

export default CustomInput;
