import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Navigator from './routes/Navigator';
import AppPermissionsProvider from './context';
import {checkPermission, PERMISSION_TYPE} from './AppPermission';

const App = () => {
  useEffect(() => {
    checkPermission(PERMISSION_TYPE.camera);
  }, []);

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
