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
import AddAdoption from '../screens/AddAdoption'
import MyAdoptions from '../screens/MyAdoptions';
import LoginScreen from '../screens/LoginScreen';

const BottomTab = createBottomTabNavigator();
const isuser = false;

const INITIAL_ROUTE_NAME = isuser ? 'Home' : "Ask";

export default function BottomTabNavigator({ navigation, route }) {


  const [AccountType, setAccType] = useState();
  const [Token, setToken] = useState();
  const [loaded, setLoaded] = useState(false)

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

  _retrieveData();

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });


  function isLoggedMe() {
    if (Token != null) {
      return (
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
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
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          }}
        />
      );
    }


  }

  function isLoggedAdd() {
    if (Token != null) {
      return (
        <BottomTab.Screen
          name="Add"
          component={AddAdoption}
          style={{ backgroudcolor: '#00000' }}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
          }}
        />
      );
    }
    else {
      return (
        <BottomTab.Screen
          name="Add"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
          }}
        />
      );
    }


  }

  function isLoggedAsk() {
    if (Token != null) {
      return (
        <BottomTab.Screen
          name="Ask"
          component={Ask}
          style={{ backgroudcolor: '#00000' }}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-notifications" />,
          }}
        />
      );
    }
    else {
      return (
        <BottomTab.Screen
          name="Ask"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-notifications" />,
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
        style: {
          fontFamily: "Segoe UI"
        }
      }}>

      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        style={{ backgroudcolor: '#00000' }}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />

      <BottomTab.Screen
        name="Discover"
        component={Organizationes}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />

      {isLoggedAdd()}
      {isLoggedAsk()}
      {isLoggedMe()}


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
    case 'Discover':
      return 'Discover';
    case 'Ask':
      return 'Ask';
    case 'Add':
      return 'Post';
    case 'Login':
      return 'Login';
  }
}

