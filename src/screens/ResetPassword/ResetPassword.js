import { View, Text,StyleSheet,useWindowDimensions, ScrollView } from 'react-native'
import React,{useState} from 'react'

import Custominput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
export default function ResetPassword() {
   const [code,setCode]=useState('')
   const [newPassword,setNewPassword]=useState('')
   const {control,handleSubmit}=useForm();



   const navigation=useNavigation();

    const onSignInPress=()=>{
      navigation.navigate("SignIn")
    }
   
    const onSubmitPress=()=>{
    navigation.navigate("Home")

    }
  

  return (
    <ScrollView>

    <View style={styles.root}>
     <Text style={styles.title}>New Password</Text>
      <Custominput placeholder='Code' name="Code" control={control}
          rules={{ required: 'Username is required' }}/>
      <Custominput placeholder='Enter your new Password
      'name='Password' 
      control={control}
          rules={{ required: 'Username is required' }}
      />
      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPress)}/>
      
      <CustomButton text="Back to SignIn" onPress={onSignInPress} type='TERTIARY'/>

    </View>
    </ScrollView>
  )
}


const styles=StyleSheet.create({
    root:{
       alignItems:'center',
       marginTop:40
    },
    
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:"#051C60",
        margin:10
    },
    text:{
        color:'grey',
        marginVertical:10
    },
    link:{
        color:'#FDB075'
    }
})