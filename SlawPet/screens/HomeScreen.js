import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Picker, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { FlatGrid } from 'react-native-super-grid';
import { MonoText } from '../components/StyledText';
import { render } from 'react-dom';
import api from '../constants/api';
import imageuri from '../constants/imageuri';
import { AsyncStorage } from 'react-native';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: "All",
            pet: "All",
            Token: "",

            adoptions: [],
        }
    }

    componentDidMount = async () => {
        await this._retrieveData();
    }


    _retrieveData = async () => {
        try {
            var token = await AsyncStorage.getItem('auth_Token');
            this.setState({ Token: token });
        } catch (error) {
            console.log(error)
        }

        this.fetchData();
    };

    fetchData = async () => {
        if (this.state.city == "All" && this.state.pet == "All") {
            fetch(api + '/adoption',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ adoptions: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    componentDidUpdate(prevProps,prevState) {

        //by city
        if (prevState.city !== this.state.city&&this.state.city!="All"&&this.state.pet=="All") {
            console.log("just by city")
            fetch(api + '/adoption/bycity/' + this.state.city,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ adoptions: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else if(prevState.pet!==this.state.pet&&this.state.city!="All"&&this.state.pet=="All"){
            console.log("just by city change pet to all")
            fetch(api + '/adoption/bycity/' + this.state.city,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ adoptions: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        //by pet
        else if(prevState.pet!==this.state.pet&&this.state.pet!="All"&&this.state.city=="All"){
            console.log("just by pet")
            fetch(api + '/adoption/bypet/' + this.state.pet,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ adoptions: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
            
        }
        else if(prevState.city!=this.state.city&&this.state.pet!="All"&&this.state.city=="All"){
            console.log("just by pet change city to all")
            fetch(api + '/adoption/bypet/' + this.state.pet,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
        }

        //by both
        else if(prevState.city !== this.state.city&&this.state.city!="All"&&this.state.pet!="All"){
            console.log(" by both change city")
            fetch(api + '/adoption/byPetandCity/'+this.state.city+"-"+this.state.pet,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else if(prevState.pet !== this.state.pet&&this.state.pet!="All"&&this.state.city!="All"){
            console.log(" by both change pet");
            fetch(api + '/adoption/byPetandCity/'+this.state.city+"-"+this.state.pet,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
        }

        //all
        else if(prevState.pet !== this.state.pet&&this.state.pet=="All"&&this.state.city=="All"){
            console.log(" All")
            fetch(api + '/adoption',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });        
        }
        else if(prevState.city !== this.state.city&&this.state.city=="All"&&this.state.pet=="All"){
            console.log("All")
            fetch(api + '/adoption',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adoptions: responseJson });
            })
            .catch((error) => {
                console.error(error);
            }); 
        }

    }

  
    render() {
     
        const adoptions = this.state.adoptions
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginLeft: '5%', marginRight: "5%" }} >
                    <FlatGrid
                        ListHeaderComponent={
                            <View style={{ margin: '5%' }}>
                                <MonoText>City</MonoText>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={this.state.city}
                                    onValueChange={(itemValue) =>
                                        this.setState({ city: itemValue })
                                    }
                                >
                                    <Picker.Item label="All" value="All" />
                                    <Picker.Item label="Slemani" value="Slemani" />
                                    <Picker.Item label="Hawler" value="Hawler" />
                                </Picker>
                                <MonoText>Pet</MonoText>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={this.state.pet}
                                    onValueChange={(itemValue) =>
                                        this.setState({ pet: itemValue })

                                    }>
                                    <Picker.Item label="All" value="All" />
                                    <Picker.Item label="Cat" value="Cat" />
                                    <Picker.Item label="Dog" value="Dog" />
                                    <Picker.Item label="Bird" value="Bird" />
                                    <Picker.Item label="Rabbit" value="Rabbit" />
                                </Picker>
                            </View>
                        }
                        itemDimension={150}
                        items={adoptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('View Adoption', {Adoption_id :item.adoption_id, Token:this.state.Token, TypeUser:"user"})}>
                                <View>
                                    <Image
                                        style={{ height: 160, width: 150, backgroundColor: "#ccf0e1" }}
                                        borderRadius={5}
                                        source={{ uri: imageuri + item.img }}
                                    />
                                    <MonoText>{item.name}</MonoText>
                                    <Text>{item.city}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView >
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',


    },
    picker: {
        height: 50,
        backgroundColor: '#fff',
        color: '#18F879',
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
});
