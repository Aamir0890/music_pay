import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useAudioContext } from '../../Global/Context';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
require('dotenv').config();
const Payment = () => {
  const navigation=useNavigation()
    const {user}=useAudioContext();
    const route = useRoute();
    const { id,amt } = route?.params|| {};;
    const newDate=new Date();
    useEffect(()=>{

redirect()
const intervalId = setInterval(redirect, 4000);


return () => clearInterval(intervalId);
    },[])
     
    const redirect=async()=>{
      // console.log(user.user_id,id)
      const res=await axios.get(`${process.env.LINK}/verifypay/${user.user_id}/${id}`)
      // console.log(res.data)
      if(res.data.message==='success'){
      
        navigation.navigate('Root',{screen:'Home'})
      }
    }
   

  return (
    <View style={{ width: '100%', height: '100%' }}>
   <Header/>
        {user.usertype==="0" ? <WebView source={{ uri: `${process.env.PAYMENT}/${user.user_id}/${id}?time=${newDate}` }} 
              style={{ flex: 1, fontSize:100 }}
            />: <WebView source={{ uri: `${process.env.PAYMENT}/${user.user_id}/${id}/${amt}?time=${newDate}` }} 
            style={{ flex: 1, fontSize:20 }}
          />}
          
    </View>
  )
}

export default Payment