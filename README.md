# Designli Finnhub test
Designli Finnhub test is a sample app built using React Native and TypeScript. It is a simple stock market app that allows users to check the stock prices.

## Step 1:
Clone the repo by running `git clone `

Please make sure you have git and npm installed on your machine for this to work.

## Step 2:
Run `npm i` from root to install dependencies
if you are using yarn instead of npm, run `yarn install` instead

# Android
Open the Android emulator or connect a physical device with the developer options enabled

Then Run `npm run android` to start the Metro Bundler and when loaded press the letter "a" on your keyboard to start the app

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=android)

# iOS
Open the iOS emulator or connect a physical device with the developer options enabled o with the recognized key 

Then Run `npm run ios` to start the Metro Bundler and when loaded press the letter "i" on your keyboard to start the app

This command will run the pod install command to install the pods needed for the project.
in case this is not working please run `cd ios && pod install && cd ..` from the root directory of the project

Please make sure you have Xcode installed on your machine for this to work.

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=ios)
## And that's it!

You should now be able to run the app on your device or emulator.

### Troubeshooting on device
Please refer to (https://reactnative.dev/docs/running-on-device) for troubleshooting.

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/getting-started-without-a-framework) instructions till "Creating a new application" step, before proceeding.