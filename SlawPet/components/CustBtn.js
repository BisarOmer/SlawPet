import * as React from 'react';
import { Text, StyleSheet, Button, ShadowPropTypesIOS, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';
import { MonoText } from './StyledText';


export default function CustBtn(props, { navigation }) {
    return (
        <TouchableOpacity onPress={props.onpress} style={[props.style, styles.Btn]} >
            <MonoText style={{color:props.color}}>{props.title}</MonoText>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    Btn: {
        alignItems:"center",
        height: 40,
        width: 150,
        borderRadius: 5,
    },

});