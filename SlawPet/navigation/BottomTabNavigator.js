import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Discover from '../screens/Discover';
import { useState} from 'react';
import Ask from '../screens/Ask';
import AddAdoption from '../screens/AddAdoption'
import LoginScreen from '../screens/Login';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME =  'Home' ;

export default function BottomTabNavigator({ navigation, route }) {


  const [Token, setToken] = useState();

  //retrive data
  _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_Token');
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
          name="Me"
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
        component={Home}
        style={{ backgroudcolor: '#00000' }}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,          
        }}
      />

      <BottomTab.Screen
        name="Discover"
        component={Discover}
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
    case 'Me':
      return 'Me';
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

