import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

class NotificationService {
  constructor() {
    this.showLocalNotification = this.showLocalNotification.bind(this);
    this.setupListeners();
    this.setBackgroundMessageHandler();
  }

  async requestPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    }
    return true;
  }

  setupListeners() {
    messaging().onMessage(this.handleForegroundNotification);
    messaging().onNotificationOpenedApp(this.handleBackgroundNotification);
  }

  handleForegroundNotification = (remoteMessage: Record<string, any>) => {
    const title = remoteMessage.notification?.title ?? 'Unknown Title';
    const body = remoteMessage.notification?.body ?? 'No Message Body';

    this.showLocalNotification(title, body);
  };

  handleBackgroundNotification = (remoteMessage: Record<string, any>) => {
    const title = remoteMessage.notification?.title ?? 'Unknown Title';
    const body = remoteMessage.notification?.body ?? 'No Message Body';

    this.showLocalNotification(title, body);
  };

  setBackgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const title = remoteMessage.notification?.title ?? 'Unknown Title';
      const body = remoteMessage.notification?.body ?? 'No Message Body';

      await this.showLocalNotification(title, body);
    });
  }

  async getDeviceToken() {
    const token = await messaging().getToken();
    return token;
  }

  async showLocalNotification(title: string, body: string) {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
}

export default new NotificationService();
