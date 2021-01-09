import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import { Icon, ListItem,Avatar} from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state= {
    userId:firebase.auth().currentUser.email,
        allReviews:[],
        image : '#'}
this.ref = null
    } 
    getReviews = ()=>{
        this.ref = db.collection('reviews').onSnapshot((s)=>{
            list = s.docs.map((d)=>d.data())
            this.setState({
                allReviews:list
            })
        })
        this.fetch(this.state.image)
    }
    //once a component is mounted it will be called (eg:button,you switch tab,you come back it's still there)
    componentDidMount(){
        this.getReviews()
    }
    fetch  = (image)=>{
        var s = firebase.storage().ref().child('user_profiles'+image)
        s.getDownloadURL().then((u)=>{
this.setState({image:u})

        }).catch((error)=>{this.setState({image:'#'})})
    }
keyExtractor = (item, index) => index.toString();
renderItem =({item,i})=>{
    return<ListItem 
    key = {i}
    title ={item.title}
    subtitle = {item.review}
    titleStyle = {{color:'black',fontWeight:'bold'}}
    bottomDivider 
    containerStyle = {{backgroundColor:'#008080'}}
    leftElement = {<Icon
    type = 'font-awesome' 
    name = 'comments'
    />}
    rightElement = {<Avatar style ={{width:30,height:30}} source  ={{uri: this.state.image}}size = 'medium'/>}
    />
}
    //render is a simple display function that returns/shows components on the screen
    render (){
        return(
            <View  style = {s.container}      >
            <MyHeader   title = 'You Beauty'  navigation ={this.props.navigation}/>
            <FlatList  
            keyExtractor = {this.keyExtractor}
            data = {this.state.allReviews}
            renderItem = {this.renderItem}

            />
            </View>
        )
    }
}
const s = StyleSheet.create({
    container:{
        //flex:flexible boxes. flex 1 covers whole screen, flex 0.5  half of the screen and so on
        flex:1,
        backgroundColor:'#008080',

    }
})