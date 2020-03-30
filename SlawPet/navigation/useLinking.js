import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';
import Ask from '../screens/Ask';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Register: 'register',
          Continue: 'Continue',
          Profile:'profile',
          Organizationes:'Organizatioin',
          ViewOrg:'ViewOrg',
          ViewAdobt:'Adobtion',
          Ask:'Ask',
          Adobtion:'Adobtion'
          
        },
      },
    },
  });
}
