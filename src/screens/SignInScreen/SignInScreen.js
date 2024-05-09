import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import glow from '../../../assets/glow.png'
import Custominput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';
import { useAudioContext } from '../../../Global/Context';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
require('dotenv').config();
export default function SignInScreen() {

  const [errorMessage, setErrorMessage] = useState('');
  const {setUser}=useAudioContext()
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [focus,setFocus]=useState(0)
  const { control, handleSubmit, formState: { errors } } = useForm()
  
  const apiUrl=`${process.env.LINK}/login`
  
  const fun=async(userData)=>{
    const userString = JSON.stringify(userData);
    await AsyncStorage.setItem('123456', userString)
    // Retrieve the stored string and parse it back to an object
    const storedUserString = await AsyncStorage.getItem('123456');
    if (storedUserString !== null) {
      const storedUser = JSON.parse(storedUserString);
      // console.log('Stored user:', storedUser);
    }
   
  }
  const onSignInPresses = (data) => {

    
    const jsonData={
      phone:data.Mobile,
      user_pass:data.password
    }
    
    axios.post(apiUrl, jsonData)
  .then(response => {
    console.log('Response:', response.data);
     setUser(response.data)

    if(response?.data?.status==='active'){
      setErrorMessage('');
      navigation.navigate('Root',{screen:'Home'})
      fun(jsonData)
      
    }
    else if(response?.data?.status==='inactive'){
      navigation.navigate('ConiformEmail',{responseData:response.data.user_id})
    }
    
   

  })
  .catch(error => {
    console.error('Error:', error);
    if (error.response.status===401) {
      // Unauthorized status, indicating incorrect password
      // console.error(error.response.status);
      setErrorMessage('Invalid Password');
    } else {
      // Handle other error cases
      // console.error('Unexpected Error');
      setErrorMessage('Invalid Credentials');
    }
    

  });
    
  
  }
  
  
  const onForgotPassword = () => {

    navigation.navigate("ForgotPassword")
  }
 
  const onSignUpPress = () => {
    
    navigation.navigate("SignUp")
   
  }
  useFocusEffect(
    React.useCallback(() => {
      const checkStoredCredentials = async () => {
        try {
          // Retrieve stored user credentials from AsyncStorage
          const storedUserString = await AsyncStorage.getItem('123456');
          
          if (storedUserString) {
            // Parse stored user credentials
            const storedUser = JSON.parse(storedUserString);
           
              // console.log(storedUser)

            axios.post(apiUrl,storedUser).then(response=>{
              // console.log(response.data.id)
              setUser(response.data);
              navigation.navigate('Root',{screen:'Home'})
              
            }).catch(error=>{
              // console.log(error.response.status)
              if(error.response.status===401){
                setErrorMessage('Enter Your mobile and Password Credentials')
              }
              
            })
             
            
          }
        } catch (error) {
          console.error('Error checking stored credentials:', error);
        }
      };
  
      checkStoredCredentials();
      setErrorMessage('')
    }, [focus])
  );
  return (
    <ScrollView style={{backgroundColor:'#191414'}}>
      <View style={styles.root}>
        <Image source={glow} style={[styles.logo, { height: height * 0.3 }]}
          resizeMode='contain' />
        <Custominput
          name="Mobile"
          placeholder="Mobile No."
          control={control}
          rules={{ required: 'Mobile No. is required',
          pattern:{
            value: /^[0-9]{10}$/, // Regular expression to match 10 digits
      message: "Mobile Number must be 10 digits",
          }
        }}
        keyboardTypes="numeric"
        />
        <Custominput
          placeholder="Password"
          name="password"
          control={control}
          rules={{ required: 'Password is required', minLength: { value: 3, message: "Password should be minimum 3 char long" } }}
          secureTextEntry={true}
        />

{errorMessage && <Text style={{ color: 'red',marginRight:190 }}>{errorMessage}</Text>}
        
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPresses)} />
        <CustomButton text="Forgot Password ?" onPress={onForgotPassword} type='TERTIARY'/>
        
        <CustomButton text="Don't have an account? Create One" onPress={onSignUpPress} type='TERTIARY' />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 30,
    marginTop:80,
  
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  }
})