import { View, Text, StyleSheet, useWindowDimensions, ScrollView,Image } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';

import Custominput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import glow from '../../../assets/glow.png'

require('dotenv').config();
export default function SignupScreen() {
  const [selectedValue, setSelectedValue] = useState('User');
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();
  
  const { height } = useWindowDimensions();
  
  const apiUrl=`${process.env.LINK}/register`

  const onRegisterPress = async(data) => {
  
    const obj={
     email:data.Email,
     user_name:data.UserName,
     password:data.Password,
     mobile:data.Mobile,
     type:selectedValue,
     tnc:1
    }
    
     
     

   
  
   
 await axios.post(apiUrl, obj)
  .then(response => {
    // console.log('Response:', response.data);
    navigation.navigate("ConiformEmail",{responseData:response.data})
    
  })
  .catch(error => {
    console.log('Error:', error.message);
    console.log(error.response.status)
    setError("Phone Number already exist")
    
  });
    
   
  }
  const [error,setError]=useState(null)
 
  const onSignInPress = () => {
    navigation.navigate("SignIn")
  }

  return (
    <ScrollView style={{backgroundColor:'black'}}>


     
      <View style={styles.root}>
      <Image source={glow} style={[styles.logo, { height: height * 0.2}]}
          resizeMode='contain' />
        <Text style={styles.title}>Create an account</Text>
        <Custominput
          placeholder="UserName"
          name="UserName"
          control={control}
          rules={{ required: 'Username is required' }
          } 
         
          />
        <Custominput
          placeholder="Mobile"
          name="Mobile"
          control={control}
          rules={{ required: 'Username is required',
          pattern:{
            value: /^[0-9]{10}$/, // Regular expression to match 10 digits
      message: "Mobile Number must be 10 digits",
          } }
          } 
          keyboardTypes="numeric"
          />
            {error&&(
          <Text style={{color:'red'}}>{error}</Text>
        )}
        <Custominput
          placeholder="Email"
          name="Email"
          control={control}
          rules={{ 
            required: "Emial is required",
            pattern:{
              value:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message:"Email address must be a valid address"
            }
           }}
        />
      
        <Custominput
          placeholder="Password"
          name="Password"
          secureTextEntry={true} 
          control={control}
          rules={{ required: 'Password is required', minLength: { value: 6, message: "Password should be minimum 6 char long" } }}
          />
             
       
        <View>
          <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Type User" value="User" style={{fontSize:15}} />
        <Picker.Item label="Type Vendor" value="Vendor"  style={{fontSize:15}}/>
      </Picker>
      </View>
        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPress)}
        />
        
        <Text style={{color:'white'}}>By registering,you conifrom that you accept our <Text style={styles.link}>terms of use</Text> and <Text style={styles.link}>Privacy Policy</Text> </Text>
       
       
      
        <CustomButton
          text="Have an account? SignIn"
          onPress={onSignInPress}
          type='TERTIARY'
        />

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop:40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#1DB954",
    margin: 10
  },
  text: {
    color: 'grey',
    marginVertical: 10
  },
  link: {
    color: '#FDB075'
  },
  picker:{
    width:350,
    backgroundColor:'#2F2B2B',
    color:'white',
    fontSize:10,
    borderRadius: 10,
    marginVertical: 5,
  }
})
