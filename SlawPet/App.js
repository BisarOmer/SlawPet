import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Profile from './screens/Profile';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ViewOrg from './screens/ViewOrg';
import ViewAdopt from './screens/ViewAdopt';
import ViewAsk from './screens/ViewAsk';
import MyAdoptions from './screens/MyAdoptions';
import AddAdoption from './screens/AddAdoption'

import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);



  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Segoe UI': require('./assets/fonts/seguisb.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: "Segoe UI",
              }
            }}
          >
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Organization Profile" component={ViewOrg} />
            <Stack.Screen name="View Adoption" component={ViewAdopt} />
            <Stack.Screen name="Ask Details" component={ViewAsk} />
            <Stack.Screen name="MyAdoptions" component={MyAdoptions} />
            <Stack.Screen name="Add Adoption" component={AddAdoption} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
