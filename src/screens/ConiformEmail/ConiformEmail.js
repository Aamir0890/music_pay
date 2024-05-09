import { View, Text ,Image,StyleSheet} from 'react-native'
import React, {useState,useEffect} from 'react'
import CustomButton from '../../components/CustomButton'
import Custominput from '../../components/Custominput'
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAudioContext } from '../../../Global/Context'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

require('dotenv').config();
const ConiformEmail = () => {
    
    const {control, handleSubmit, watch} = useForm();
    const navigation=useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const {user,setUser}=useAudioContext();
       
    let apiUrl=`${process.env.LINK}/verify_otp`
    const route=useRoute()
    let responseData=route.params?.responseData
    let uid
    useEffect(() => {
      console.log(user,'user')
      
     uid=responseData;
      console.log(responseData,'data')
    }, [responseData]);
        
      
     const onConfirmPress=(data)=>{
      let routes=`${apiUrl}/${uid}/${data.Code}`
      
      // console.log(data.Code)
      console.log(routes)
      axios.get(routes).then(response => {
        // console.log(response.status)
        setUser(response.data)

        if(response?.data?.status==='active'){
          setErrorMessage('');
          navigation.navigate('Root',{screen:'Home'})
          let jsonData={
            phone:response.data.Mobile,
            user_pass:response.data.password
          }
          fun(jsonData)
          
        }
        else if(response?.data?.status==='inactive'){
          navigation.navigate('ConiformEmail',{responseData:response.data})
        }
      })
      .catch(error => {
        console.log('Error:', error.message);
        console.log(error.response.status)
        setErrorMessage("Invalid Otp")
      });
        
    }
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
    const onSignInPress=()=>{



     navigation.navigate("SignIn")
    }
    const onResendPress=async()=>{
      console.log(uid)
        const data=await axios.get(`${process.env.LINK}/resendotp/${uid}`)
           console.log(data.data)
    }
   
  return (
    <View style={{backgroundColor:'black',flex:1}}>
    <View style={styles.root}>
     <Text style={styles.title}>Confirm your Account</Text>
      <Custominput placeholder='Enter your confirmation code'
       name="Code"
          control={control}
          rules={{ required: 'Code is required' }}/>
          
{errorMessage && <Text style={{ color: 'red',marginRight:190 }}>{errorMessage}</Text>}
      <CustomButton text="Coniform" onPress={handleSubmit(onConfirmPress)}/>
      
     
      <CustomButton text="Resend Code" onPress={onResendPress} type='SECONDARY'/>
      <CustomButton text="Back to SignIn" onPress={onSignInPress} type='TERTIARY'/>

    </View>
    </View>
    
  )
}

export default ConiformEmail
const styles=StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
        marginTop:40,
        backgroundColor:'#191414'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#1DB954",
        margin: 10,
        marginBottom:15
    },

})