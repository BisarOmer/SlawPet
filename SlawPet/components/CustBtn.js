import * as React from 'react';
import { Text, StyleSheet, Button, ShadowPropTypesIOS } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';


export default function CustBtn(props,{navigation}) {
    return (
        <Button title={props.title} onPress={props.onpress} color={props.BgColor} 
        style={[props.style,styles.Btn]} />
    );
}

CustBtn.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any.isRequired,
    ])
};
const styles = StyleSheet.create({
    Btn: {
        height: 60,
        width: 100,        
        borderRadius: 5,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 10,
        },
        elevation: 1,
    },
});