import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import Home from '../screens/Home/Home'
import CustomDrawer from './CustomDrawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConiformEmail from '../screens/ConiformEmail/ConiformEmail';
import Purchase from '../screens/Purchased Songs/Purchase';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Context from '../../Global/Context';
import Reacharge from '../components/Music/Reacharge';
import MusicPlayer from '../screens/MusicPlayer';
import UserPlayer from '../screens/UserPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Payment from '../screens/Payment';
const Drawer = createDrawerNavigator();
function Root() {
  const navigation=useNavigation();

  return (
    <Drawer.Navigator screenOptions={{headerShown:false,drawerLabelStyle:{fontSize:15},drawerActiveBackgroundColor:'transparent',}} drawerContent={props=><CustomDrawer {... props}/>}
    >
       <Drawer.Screen name="Home" component={Home} 
       options={{drawerIcon:()=>(
        <Ionicons name='home-outline' size={22} color='#1DB954' style={{marginRight:-20}} />
      ),
      drawerLabelStyle:{color:'white'}
      }} 
       />
       <Drawer.Screen name="Purchased Song's" component={Purchase}
        options={{drawerIcon:()=>(
          <Icons name='playlist-music' size={22} color='#1DB954' style={{marginRight:-20}} />
        ),
        drawerLabelStyle:{color:'white'}
        }} 
       />
       <Drawer.Screen name="Log-out" component={SignInScreen} 
       options={{drawerIcon:()=>(
        
        <Ionicons name='log-in-outline' size={22} color='#1DB954' style={{marginRight:-20}} />
      ),
      drawerLabel: () => (
        <TouchableOpacity onPress={async () => {
          // Clear AsyncStorage here
          await AsyncStorage.clear();
          console.log("All clear")
          navigation.navigate('SignIn')
        }}>
          <Text style={{color: 'white'}}>Log-out</Text>
        </TouchableOpacity>
      )
      }} 
       />
      <Drawer.Screen name="Payment" component={Payment} options={{drawerLabelStyle:{color:'transparent'}}}/>
    
    </Drawer.Navigator>
  );
}


const Navigation=()=>{


  
  const Stack = createNativeStackNavigator();
  
   return (
 <Context>
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown:false}}>   
        <Stack.Screen name='SignIn'component={SignInScreen}/>
        <Stack.Screen name='SignUp'component={SignUpScreen}/>
         <Stack.Screen name="Root" component={Root}/>
        <Stack.Screen name='ForgotPassword'component={ForgotPassword}/>
        <Stack.Screen name='ConiformEmail'component={ConiformEmail}/>
        <Stack.Screen name='Recharge' component={Reacharge}/>
        <Stack.Screen name='Music' component={MusicPlayer}/>
        <Stack.Screen  name='UserPlayer' component={UserPlayer}/>
        <Stack.Screen name='Payment' component={Payment}/>
     </Stack.Navigator>
     </NavigationContainer>
     </Context>
    )
   
    
  }

  export default Navigation
