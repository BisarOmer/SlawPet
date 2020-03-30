import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import CustTxtInput from '../components/CustTxtInput';
import CustBtn from '../components/CustBtn'
import Colors from '../constants/Colors';
import DefaultProfile from '../assets/images/account.png';
import { MonoText } from '../components/StyledText';

export default function ViewAsk({navigation}) {


    return (

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <View style={{ padding: '5%' }}>
                <Image
                    style={{ width: 150, height: 150, alignSelf: 'center' }}
                    borderRadius={150}
                    source={DefaultProfile}
                />
                <MonoText style={{ alignSelf: 'center' }}>Name</MonoText>
            </View>

            <View style={{ padding: '5%' }}>
                <MonoText style={{ alignSelf: 'center' }}>Adobt</MonoText>
                <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate('Adobtion')}>
                    <View>
                        <Image
                            style={{ height: 160, width: 150, backgroundColor: "#ccf0e1",alignSelf:'center' }}
                            borderRadius={5}
                        />
                        <MonoText style={{ alignSelf: 'center' }}>Adobtion Name</MonoText>
                    </View>
                </TouchableOpacity>
                
                <View style={{flexDirection:"row",flexWrap:"nowrap",alignItems:"center",justifyContent:"space-around",marginTop:20}}>
                    <CustBtn title="Give"  BgColor={Colors.primaryBtnBG} />
                    <CustBtn title="Cancel"  BgColor="#ff5151"/>
                </View>
                <MonoText style={{ alignSelf: 'center' }}>Contact: 1589-55-63</MonoText>
            </View>

        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    uploadimg: {
        alignSelf: 'center',
        marginTop: '2%',
        backgroundColor: '#dff6f0',
        padding: 10,
        fontWeight: "600",
        fontSize: 18,
        borderRadius: 5
    },
});
