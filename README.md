# Designli Finnhub test
Designli Finnhub test is a sample app built using React Native and TypeScript. It is a simple stock market app that allows users to check the stock prices.

## Step 1:
Clone the repo by running `git clone https://github.com/LuisSiliezar/designliTestFinnhub`

Please make sure you have git and npm installed on your machine for this to work.

## Step 2:
Run `npm i` from root to install dependencies
if you are using yarn instead of npm, run `yarn` instead

## Step 3:
Set your API key in the .env file please use the .env.template file as a template

# Android
Open the Android emulator or connect a physical device with the developer options enabled

Then Run `npm run android` to start the Metro Bundler and when loaded press the letter "a" on your keyboard to start the app

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=android)

# iOS
Open the iOS emulator or connect a physical device with the developer options enabled o with the recognized key 

Then Run `npm run ios` to start the Metro Bundler and when loaded press the letter "i" on your keyboard to start the app

This command will run the pod install command to install the pods needed for the project.
in case this is not working please run `cd ios && pod install && cd ..` from the root directory of the project

Please make sure you have Xcode and Cocoapods installed on your machine for this to work.

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=ios)
## And that's it!

You should now be able to run the app on your device or emulator.
>**Note**: due to the version of react native you may need to run `yarn start`or `npm start` first to start the metro bundler and then open xcode and run the app from xcode.


### Troubeshooting on device
Please refer to (https://reactnative.dev/docs/running-on-device) for troubleshooting.
>**Note**: Please take into account the market hours due to the nature of the app, the market is closed during the day and opens at night and is closed on weekends.
>**Note**: Please consider that the API is a free service and may be subject to rate limits. so please be patient and do not overload the server. and you may encounter errors or slowdowns during testing or a 429 error.
>**Note**: For the push notifications I added the GoogleService-Info.plist file to the project and added the google-services.json and it's on the repo
>**Note**: Unfortunately the 0Auth has a issue with the package `react-native-auth0` I got it to work on iOS without any issues but on Android it doesn't work. I'll refer the link to the issue `https://github.com/auth0/react-native-auth0/issues/560` & `https://github.com/auth0/react-native-auth0/issues` & `https://github.com/auth0/react-native-auth0/issues/1038` & `https://github.com/auth0/react-native-auth0/issues/1028`.


>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/getting-started-without-a-framework) instructions till "Creating a new application" step, before proceeding.