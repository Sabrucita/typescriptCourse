import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Navigator from './routes/Navigator';
import AppPermissionsProvider from './context';

const App = () => {
  return (
    <AppPermissionsProvider>
      <SafeAreaView style={styles.safeArea}>
        <FlipperAsyncStorage />
        <Navigator />
      </SafeAreaView>
    </AppPermissionsProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
