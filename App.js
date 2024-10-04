import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';

import { UserProvider } from './UserContext';

const App = () => {
  const [loaded] = useFonts({
    "DMBold": require('./assets/fonts/DMSans-Bold.ttf'),
    "DMMedium": require('./assets/fonts/DMSans-Medium.ttf'),
    "DMRegular": require('./assets/fonts/DMSans-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
  
};

export default App;

