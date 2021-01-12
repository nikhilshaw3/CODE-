import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem ,Icon} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends Component{
constructor(props){
super(props)
this.state={
userId: firebase.auth().currentUser.email,
allNotifications: [],
}
this.notificationRef = null
}

getNotifications=()=>{
this.requestRef=db.collection("all_notifications")
.where("notification_status","==","unread")
.where("targeted_user_id","==",this.state.userId)
.onSnapshot((snapshot)=>{
var allNotifications = []
snapshot.doc().map((doc)=>{
var notification = doc.data()
notification["doc_id"]=doc.id
allNotifications.push(notification)
})
this.setState({
allNotifications:allNotifications
})
})
}

componentDidMount(){
this.getNotifications()
}

componentWillUnmount(){
this.notificationRef()
}

keyExtractor=(item,index)=>index.toString()

renderItem=({item,index})=>{
return(
<ListItem
key={index}
leftElement={<Icon name="book" type="font-awesome" color="#696969"/>}
title={item.book_name}
titleStyle={{color: "black" , fontWeight: "bold"}}
subtitle={item.message}
bottomDivider
/>
)
}

render(){
return(
<View style={styles.container}>
<View style={{flex:0.1}}>
<MyHeader title={"Notifications"} navigation={this.props.navigation}/>
</View>
<View style={{flex:0.9}}>
{
this.state.allNotifications.length === 0?(
<View style={{flex: 1 , alignItems: 'center' , justifyContent: 'center'}}>
<Text style={{fontSize: 25 , fontWeight:'bold'}}>You Have no notification</Text>
</View>
)
:(
<FlatList
keyExtractor={this.keyExtractor}
data={this.state.allNotifications}
renderItem={this.renderItem}
/>
)
}
</View>
</View>
)
}
}

const styles = StyleSheet.create({
     container : { flex : 1 }
     })
