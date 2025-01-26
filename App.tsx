import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '@presentation/routes/StackNavigation';
import NotificationService from '@infrastructure/services/notifications.service';

const App = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      const permissionGranted = await NotificationService.requestPermission();

      if (permissionGranted) {
        console.log('Notification permission granted!');
      } else {
        console.log('Notification permission denied!');
      }

      NotificationService.setupListeners();

      await NotificationService.getDeviceToken();
    };
    initializeNotifications();

    if (Platform.OS === 'ios') {
      NotificationService.setBackgroundMessageHandler();
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
