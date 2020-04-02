import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Organizationes from '../screens/organizationes';
import { useState, useEffect } from 'react';
import Ask from '../screens/Ask';
import { View } from 'react-native';
import MyAdoptions from '../screens/MyAdoptions';
import LoginScreen from '../screens/LoginScreen';

const BottomTab = createBottomTabNavigator();
const isuser = false;

const INITIAL_ROUTE_NAME = isuser ? 'Home' : "Ask";

export default function BottomTabNavigator({ navigation, route }) {


  const [AccountType, setAccType] = useState();
  const [Token, setToken] = useState();
  const[loaded,setLoaded]=useState(false)
  
  //retrive data
  _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_Token');
      const accType = await AsyncStorage.getItem('AccountType');

      setAccType(accType);
      setToken(token);

    } catch (error) {
      console.log(error);
    }
  };

  this._retrieveData();

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  function firstTabByAcc() {
    if (AccountType == "Organization") {
      return (
        <BottomTab.Screen
          name="Ask"
          component={Ask}
          style={{ backgroudcolor: '#00000' }}
          options={{
            title: 'Ask',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-send" />,

          }}
        />
      );
    }

    else {
      return (
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          style={{ backgroudcolor: '#00000' }}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
        />
      );
    }
  }
  function secondTabByAcc() {
    if (AccountType == 'Organization') {
      return (
        <BottomTab.Screen
          name="My Adoption"
          component={MyAdoptions}
          options={{
            title: 'My Adoption',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-paw" />,
          }}
        />
      );
    }

    else {
      return (
        <BottomTab.Screen
          name="Organizationes"
          component={Organizationes}
          options={{
            title: 'Organizationes',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-paw" />,
          }}
        />
      );
    }
  }
  function isLogged() {
    if (Token != null) {
      return (
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Me',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
          }}
        />
      );
    }
    else {
      return (
        <BottomTab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Me',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
          }}
        />
      );
    }


  }

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{
       activeTintColor: '#18F879',
       inactiveTintColor: 'grey',
       style:{
         fontFamily:"Segoe UI"
       }
    }}>


      {firstTabByAcc()}

      {secondTabByAcc()}

      {isLogged()}


    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Profile':
      return 'Profile';
    case 'Organizationes':
      return 'Organizationes';
    case 'Ask':
      return 'Ask';
    case 'My Adoption':
      return 'My Adoption';
    case 'Login':
      return 'Login';
  }
}

