import React,{Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from '../screens/BookDonateScreen'
import ReceiverDetailScreen from '../screens/ReceiverDetailScreen'

export const AppStackNavigator = createStackNavigator({
BookDonateList: {
    screen: BookDonateScreen,
    navigationOptions: {
        headerShown : false
    } 
},
ReceiverDetail: {
    screen: ReceiverDetailScreen,
    navigationOptions: {
        headerShown : false
    } 
},
},
{InitialRouteName: 'BookDonateList'}
)
