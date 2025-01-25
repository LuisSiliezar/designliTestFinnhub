import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '@presentation/routes/StackNavigation';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
