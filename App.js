import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';

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
    <AppNavigator />
  );
  
};

export default App;

