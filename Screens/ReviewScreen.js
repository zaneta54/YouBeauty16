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
} from "react-native";
import db from "../config";
import firebase from "firebase";
import Header from "../components/MyHeader";
import { Icon, Input,Avatar } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import ReactStars from "react-rating-stars-component";
export default class ReviewScreen extends Component{
    constructor(){
        super()
        this.state = {
            title:'',
            review:'',
            userId:firebase.auth().currentUser.email,
            image:'#',
            docId:'',
            rating:0
            
        }
    } 
    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!cancelled) {
          this.uploadImage(uri, this.state.userId);
        }
      };
      uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
    
        var ref = firebase
          .storage()
          .ref()
          .child("user_profiles/" + imageName);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };
      fetchImage = (imageName) => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("user_profiles/" + imageName);
    
        // Get the download URL
        storageRef
          .getDownloadURL()
          .then((url) => {
            this.setState({ image: url });
          })
          .catch((error) => {
            this.setState({ image: "#" });
          });
      };    
      getUserProfile() {
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                name: doc.data().first_name + " " + doc.data().last_name,
                docId: doc.id,
                image: doc.data().image,
              });
            });
          });
      }
    
      componentDidMount() {
        this.fetchImage(this.state.userId);
        this.getUserProfile();
      }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addReview = (t,r)=>{
        var Id = this.createUniqueId()
  db.collection('reviews').add({
      userId:this.state.userId,
      title:this.state.title,
      review:this.state.review,
     Id:Id
      
  })
    }
    
    render (){
        return(
            <View  style = {s.container}>
            <Header   title = 'Review'  navigation ={this.props.navigation}/>
            <Input     
            placeholder = 'Review Title'  
              leftIcon ={{type:'font-awesome', name:'sticky-note'}} 
              onChangeText = {(t)=>this.setState({title:t})} 
              value={this.state.title}
               />
               <Input     
            placeholder = ' Add Review'  
              leftIcon ={{type:'font-awesome', name:'edit'}} 
              onChangeText={(p)=>this.setState({review:p})} 
              value={this.state.review} />
              <Avatar
              size = {"small"}
              source = {{uri:this.state.image}}
              onPress = {()=>{this.selectPicture()}}
              showEditButton
              />
              
              <TouchableOpacity
              onPress = {()=>{this.addReview(this.state.title,this.state.review)}}
              
              >

                  <Text>  Post Review</Text>
                   </TouchableOpacity>
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
