import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-dom';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import defaultOrg from '../assets/images/account.png';
import { AsyncStorage } from 'react-native';


export default function Ask ({ navigation }) {
    
    return (
        <View style={styles.container}>
            <View >
                <FlatList
                    data={[
                        { key: 'Devin' },
                        { key: 'Dan' },
                        { key: 'Dominic' },

                    ]}
                    renderItem={({ item }) =>

                        <TouchableOpacity onPress={() => navigation.navigate('Ask Details')} >
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <Image
                                    style={{ width: 50, height: 50, }}
                                    borderRadius={100}
                                    source={defaultOrg}
                                />
                                <MonoText style={{ marginTop: 0 }}>{item.key}</MonoText>
                            </View>
                        </TouchableOpacity>
                    }
                    style={{ marginTop: 40 }}
                />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 5,
        padding: 10,
        backgroundColor: '#fff',
    },

});