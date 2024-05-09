import { View, Text,StyleSheet,useWindowDimensions, ScrollView ,Image,Alert} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import Custominput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';
import glow from '../../../assets/glow.png'
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
require('dotenv').config();
export default function ForgotPassword() {
    
   
   const {control,handleSubmit}=useForm();

     const navigation=useNavigation();
     const {height} =useWindowDimensions()
    const onSignInPress=()=>{
     navigation.navigate("SignIn")
    }
   
    const onSendPress=async (data)=>{
      const email=data.Mobile
      console.log(email)     
       const user={
        phone:email
      }
     try{
     const resp=await axios.post(`${process.env.LINK}/forgetpass`,user)
     console.log(resp.data)
     if(resp.data.message==='success'){
      Alert.alert(
        'Email sent Successfully',
        'Your password has been sent to your registered email id, Please check in spam if not found in Inbox.',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Back to SignIn', onPress: () =>  navigation.navigate("SignIn") }
        ],
        { cancelable: false }
      );
     }
    
     }catch(error){
      Alert.alert(
        'Phone number doesnot exist',
        'Your account is not registered with us, please register to continue ',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Exit', onPress: () =>  navigation.navigate("SignIn") }
        ],
        { cancelable: false }
      );
      console.log(error)
     
     }
      
        
        
    }
   
  return (
    <ScrollView style={{backgroundColor:'black'}}>
    <View style={styles.root}>
     <Text style={styles.title}>Forgot Your Password ?</Text>
      <Custominput 
          name="Mobile"
          placeholder="Please enter your Mobile number"
          control={control}
          rules={{ required: 'Mobile No. is required',
          pattern:{
            value: /^[0-9]{10}$/, // Regular expression to match 10 digits
      message: "Mobile Number must be 10 digits",
          }
        }}
        keyboardTypes="numeric"
          />
          <Text style={{color:'white',marginVertical:10,marginRight:60}}>Note:  Password will be sent to your Email</Text>
      <CustomButton text="Send" onPress={handleSubmit(onSendPress)}/>
       
      
      <CustomButton text="Back to SignIn" onPress={onSignInPress} type='TERTIARY'/>
      <Image source={glow} style={[styles.logo, { height: height }]}
          resizeMode='contain' />
    </View>
    </ScrollView>
  )
}


const styles=StyleSheet.create({
    root:{
       alignItems:'center',
       padding:20,
       marginTop:150
    },
    
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:"#1DB954",
        margin:10,
        marginBottom:20
        
    },
    text:{
        color:'grey',
        marginVertical:10
    },
    link:{
        color:'#FDB075'
    },
    logo: {
      width: '80%',
      maxWidth: 400,
      maxHeight: 250
    }
})