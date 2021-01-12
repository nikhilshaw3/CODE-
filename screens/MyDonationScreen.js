import React,{Component} from 'react';
import {View,Text,TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity,Alert, ScrollView,FlatList} from 'react-native';
import {Icon,ListItem} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'


export default class MyDonationScreen extends Component{
static navigationOptions = {header: null};
constructor(){
super()
this.state ={
userId: firebase.auth().currentUser.email,
allDonations: []
}
this.requestRef= null
}

sendNotifications=(bookDetails,requestStatus)=>{
var requestId=bookDetails.request_id
var donorId= bookDetails.donor_Id
db.collection("all_notifications")
.where("request_id", "==" ,requestId)
.where("donor_id", "==", donorId)
.get().then((snapshot)=>(
snapshot.forEach((doc)=>{
var message=""
if(requestStatus == "Book Sent"){
message= this.state.donorName+"Sent you book"
}else{
message= this.state.donorName+"Has Shown Interest in donating the book"
}
db.collection("all_notifications").doc(docId).update({
"message": message,
"notificationStatus" : "unread",
"date": firebase.firestore.FieldValue.serverTimestamp
})
})
))
}

sendBook=(bookDetails)=>{
if(bookDetails .requested_status === "Book Sent"){
var request_status="Donor Interested"
db.collection("all_notification").doc(bookDetails.doc_id).update({
"request_status": "Donor Interested"
})
this.sendNotifications(bookDetails,requestStatus)
}else{
var requestStatus="Book Sent"
db.collection("all_donations").doc(bookDetails.doc_id).update({
"request_status": "Book Sent"
})
this.sendNotifications(bookDetails,requestStatus)
}
}

getAllDonations=()=>{
this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.userId)
.onSnapshot((snapshot)=>{
var allDonations = snapshot.docs.map(document=>document.data());
this.setState({
    allDonations: allDonations,
});
})
}

keyExtractor = (item,index)=>index.toString()

renderItem=({item,i})=>(
<ListItem
key={i}
title={item.book_name}
subtitle={"Requested By :" + item.requested_by+"\nStatus :" +item.requested_status}
leftElement={<Icon name="book" type="font-awesome" color='#696969'/>}
titleStyle={{color: 'black' , fontWeight: 'bold'}}
rightElement={
<TouchableOpacity style={[styles.button , {backgroundColor: item.requested_status === "Book Sent"?"green": '#2f5722'}]}onPress={()=>{
this.sendBook(item)
}}>
<Text style={{color: '#ffff'}}>Send Book</Text>
</TouchableOpacity>
}
bottomDivider
/>
)

componentDidMount(){
this.getAllDonations()
}

render(){
return(
<View style={{flex:1}}>
<MyHeader navigation={this.props.navigation} title="My Donations"/>
<View style={{flex: 1}}>
{
    this.state.allDonations.length === 0
    ?(
<View style={styles.subtitle}>
    <Text style={{fontSize: 20}}>List of All Book Donations</Text>
</View>
    )
    :(
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.allDonations}
        renderItem={this.renderItem}
        />
    )
}
</View>
</View>
)
}
}