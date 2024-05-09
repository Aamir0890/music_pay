import { View, Text,StyleSheet,Image,useWindowDimensions,TouchableOpacity,ImageBackground } from 'react-native'
import React,{useState} from 'react'
import glow from '../../../assets/glow.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const {height}=useWindowDimensions();
    const [navigate,setNavigate]=useState(true);
    const navigation=useNavigation();
    const isDrawerOpen = navigation.getState().drawerOpen;

    const handleDrawerToggle = () => {
    
        

    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
      };


  return (
    
    <View style={{backgroundColor:'#212529',flexDirection:'row'}}>
         <ImageBackground source={{uri:'https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg'}} style={styles.backgroundImage}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Image source={glow} style={[styles.logo, { height: height * 0.09 }]}
          resizeMode='contain' />

       <TouchableOpacity onPress={handleDrawerToggle}>
    <Icon name='bars' size={30} color='#1DB954' style={{marginTop:15,marginRight:20}} />
    </TouchableOpacity>
     
    </View>
    </ImageBackground>
    </View>
   
  )
}

export default Header


const styles=StyleSheet.create({
    logo:{
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
        
    },
    backgroundImage:{
     
     resizeMode:'cover',
     width:'100%',
      
     
     
    }
})