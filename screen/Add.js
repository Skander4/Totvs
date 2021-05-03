import React from 'react'
import {View,Alert} from "react-native";
import {ActivityIndicator, Button, Colors, TextInput, Title} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Add extends React.Component{
    constructor() {
        super();
        this.state = {
            text : '',
            loading : false
        }
    }

    Add =() => {
        (async () => {
            console.log(this.state.text.toUpperCase())
            axios.get('https://data.messari.io/api/v1/assets/'+ this.state.text.toLowerCase()+'/metrics').then(res => res.data).then(res => res.data).then( async res => {

                console.log(res)
               await AsyncStorage.getItem('myList', (err, result) => {
                    const id = {
                        symbol : res.symbol,
                        name : res.name,
                        market_data : res.market_data.price_usd.toFixed(2),
                        percent_change_usd_last_1_hour : res.market_data.percent_change_usd_last_1_hour.toFixed(5)
                    };
                    if (result !== null) {
                        let newIds = JSON.parse(result).concat(id);
                        AsyncStorage.setItem('myList', JSON.stringify(newIds));
                    } else {
                        AsyncStorage.setItem('myList', JSON.stringify([id]));
                    }
                });
            }).then(() => this.props.navigation.goBack()).catch(() => Alert.alert(
                "Error",
                "This metrics doesn't exist",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ]
            ))
        })().then(() =>  this.setState({loading : false }) )
    }

    render() {
        if(this.state.loading){
            return (
                <View style={{flex : 1 ,justifyContent  :'center' , alignItems : 'center'}}>
                    <ActivityIndicator size={'large'} color={Colors.blue900}/>
                </View>
            )
        }
        const{text} = this.state;
        return (
            <View style={{justifyContent : 'center' , flex : 1 ,margin : 25 }}>
                <Title>Add a Cryptocurrency </Title>
                <TextInput
                    placeholder={'Use a name or ticker symbol '}
                    value={text}
                    style={{marginTop : 15 , marginBottom : 15}}
                    onChangeText={e => this.setState({text : e})}
                />

                <Button disabled={text.length === 0}   mode="contained" onPress={() => {
                    this.setState({loading : true })
                    this.Add()
                }} style={{alignSelf : 'flex-end' , backgroundColor : Colors.yellow800}}>
                    Add
                </Button>
            </View>
        );
    }
}
