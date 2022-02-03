import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  onPress: any;
  text: string;
  testID?: string;
}

const CustomButton: React.FC<Props> = ({onPress, text, testID}) => {
  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#015D67',
    marginHorizontal: 50,
    marginVertical: 20,
    padding: 13,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
  },
});
export default CustomButton;
