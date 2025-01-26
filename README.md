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
Open the iOS emulator or connect a physical device with the developer options enabled or with the recognized key 

Then Run `npm run ios` to start the Metro Bundler and when loaded press the letter "i" on your keyboard to start the app

This command will run the pod install command to install the pods needed for the project.
in case this is not working please run `cd ios && pod install && cd ..` from the root directory of the project

Please make sure you have Xcode and Cocoapods installed on your machine for this to work.

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=ios)
## And that's it!

You should now be able to run the app on your device or emulator.
>**Note**: Due to the version of React Native you may need to run `yarn start`or `npm start` first to Start the Metro Bundler, then open Xcode and run the app from Xcode.

### Troubleshooting on device
Please refer to (https://reactnative.dev/docs/running-on-device) for troubleshooting.

### NOTES

1. **Market Hours**:
   - The market is closed during the day and opens at night.
   - It is also closed on weekends, which affected the functionality of the websocket.
   - A websocket was added to the project, making it work before the market closed, but it wasn't tested for notifications.

2. **API Rate Limits**:
   - The API is a free service and may be subject to rate limits.
   - Be patient and avoid overloading the server, as you might encounter errors or slowdowns (e.g., a 429 error) during testing.

3. **Push Notifications**:
   - The `GoogleService-Info.plist` file was added to the project.
   - The `google-services.json` file is also included and available in the repo.

4. **OAuth Issue**:
   - There is an issue with the `react-native-auth0` package.
   - It works on iOS without any issues, but it doesn't work on Android.
   - Relevant links to the issue:
     - [Issue #560](https://github.com/auth0/react-native-auth0/issues/560)
     - [Auth0 Issues](https://github.com/auth0/react-native-auth0/issues)
     - [Issue #1038](https://github.com/auth0/react-native-auth0/issues/1038)
     - [Issue #1028](https://github.com/auth0/react-native-auth0/issues/1028)

5. **Environment Setup**:
   - Ensure you've completed the [React Native - Environment Setup](https://reactnative.dev/docs/getting-started-without-a-framework) instructions up to the "Creating a new application" step before proceeding.


# GENERAL DOCUMENTATION

### Core
**Purpose:** Contains the core business logic and entities of the application.

- **entities/**: Defines the core business objects.  
  _Example:_ `User.ts`, `Stock.ts`

- **use-cases/**: Contains the application-specific business rules.  
  _Example:_ `CreateUser.ts`, `FetchStocks.ts`

- **interfaces/**: Defines the interfaces for the core layer.  
  _Example:_ `IUserRepository.ts`, `IStockRepository.ts`

### Data
**Purpose:** Manages data sources and repositories.

- **repositories/**: Implements the repository interfaces defined in the core layer.  
  _Example:_ `UserRepository.ts`, `StockRepository.ts`

- **sources/**: Contains data source implementations (e.g., API clients, database clients).  
  _Example:_ `UserAPI.ts`, `StockAPI.ts`

### Presentation
**Purpose:** Manages the user interface and user experience.

- **components/**: Contains reusable UI components.  
  _Example:_ `Button.tsx`, `IconButton.tsx`

- **hooks/**: Contains custom hooks for managing state and side effects.  
  _Example:_ `useStocks.tsx`, `useUser.tsx`

- **screens/**: Contains the screen components for different routes.  
  _Example:_ `AlertScreen.tsx`, `HomeScreen.tsx`

- **stores/**: Manages global state using state management libraries.  
  _Example:_ `userStore.ts`, `stockAlertStore.ts`
