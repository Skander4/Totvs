import React from 'react'
import {View,ScrollView,TouchableOpacity,RefreshControl} from "react-native";
import {ActivityIndicator, Caption, Colors, List, Paragraph} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLOR = '#2B547E';
export default class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            finished : false,
            myList : [],
            refreshing : false
        }
    }
    componentDidMount () {
        (async () =>  await AsyncStorage.getItem("myList").then(json =>  this.setState({myList : json ? JSON.parse(json) : []})))().then(() => this.setState({finished : true}))
        console.log(this.state.myList)
    }


    onRefresh = () => {
        this.setState({refreshing  :true});
        (async () =>  await AsyncStorage.getItem("myList").then(json =>  this.setState({myList : json ? JSON.parse(json) : []})))().then(() =>  this.setState({refreshing  :false}));
    };


    render() {
        const {finished , myList,refreshing} = this.state;
        if(!finished){
            return (
                <View style={{flex : 1 ,justifyContent  :'center' , alignItems : 'center'}}>
                    <ActivityIndicator size={'large'} color={Colors.blue900}/>
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 15}} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)}/>
            }>
                {
                    myList.map((item,key) =>   <List.Item key={key}
                        title={item.name}
                        description={item.symbol}
                        right={props => <View {...props} style={{flexDirection : 'column' ,marginRight : 5}}>
                            <Paragraph>
                                {"$"+item.market_data}
                            </Paragraph>
                            <Caption style={{color : item.percent_change_usd_last_1_hour > 0 ? Colors.green600 : Colors.red600}}>
                                {item.percent_change_usd_last_1_hour}
                            </Caption>
                        </View>}
                    />)
                }

                <TouchableOpacity style={{justifyContent : 'center',alignItems : 'center' , color : COLOR , marginTop : 25}} onPress={() => this.props.navigation.navigate('Add')}>
                    <Caption>+ Add Cryptocurrency</Caption>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
