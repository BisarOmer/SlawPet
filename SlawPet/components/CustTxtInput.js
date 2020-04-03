import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function CustTxtInput(props) {
    return <TextInput value={props.value} onChangeText={props.onChangeText}  secureTextEntry={props.password} placeholder={props.placeholder}
     placeholderTextColor="#D2D0D0" keyboardType={props.keyboardType} style={styles.txtinput} />;
}
const styles = StyleSheet.create({
    txtinput: {
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 20,
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        elevation: 1,
        height: 50,
        padding: 5,
        marginTop: 25,

    }

});