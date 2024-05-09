import { View, Text,ImageBackground,Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient'
import { useAudioContext } from '../../Global/Context'
const CustomDrawer = (props) => {
  const {user}=useAudioContext();

  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['rgba(2,0,36,1)', 'rgba(0,212,255,1)']}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}>
   <DrawerContentScrollView >
   <View style={{marginLeft:10,marginBottom:20}}>
   <Image source={require('../../assets/glow.png')} style={{height:80,width:180,marginBottom:10,borderRadius:10,marginTop:10}}  resizeMode='contain'/>
    <Text style={{marginLeft:20,fontSize:14,color:'white'}}>Welcome, {user.user_name}</Text>
    </View>
      
    <View style={{flex:1,paddingTop:10}}>
    <DrawerItemList {...props}/>
    </View>
   </DrawerContentScrollView>
   </LinearGradient>
   </View>
  )
}

export default CustomDrawer
