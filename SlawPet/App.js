import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Register from './screens/Register';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ViewProfile from './screens/ViewProfile';
import ViewAdoption from './screens/ViewAdoption';
import ViewAsk from './screens/ViewAsk';
import AddAdoption from './screens/AddAdoption'

import { AsyncStorage } from 'react-native';
import Discover from './screens/Discover';
import { TextInput } from 'react-native-gesture-handler';

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
            <Stack.Screen name="Discover" component={Discover} />
            <Stack.Screen name="Add Adoption" component={AddAdoption} />


            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Adoption" component={ViewAdoption} />
            <Stack.Screen name="Ask Details" component={ViewAsk} />

            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="View Profile" component={ViewProfile} />


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
