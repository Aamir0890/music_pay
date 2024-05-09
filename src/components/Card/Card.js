import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Music from '../Music/Music'
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation,useFocusEffect } from '@react-navigation/native'

import { useAudioContext } from '../../../Global/Context';
import VendorMusic from '../Music/VendorMusic'
require('dotenv').config();


const Card = ({songs}) => {
  
  const [data,setData]=useState()
  const [duration,setDuration]=useState('')
  const [position,setPosition]=useState('')
  const {user}=useAudioContext()

  useFocusEffect((

    React.useCallback(()=>{
      console.log(user)
      setData(songs)
      console.log(songs)
    },[])
  ))

  useEffect(() => {
    // Set data when songs prop changes
    setData(songs);
    // console.log(1);
  }, [songs]);
  
  // useEffect(() => {
  //   // Log data when data state changes
  //   if(data !== undefined) {
  //     console.log('Data:', data);

  //   }

  // }, [data]);
    

const [image,setImage]=useState('https://geetglow.com/assets/music/img/covers/Shabbir_Kumar,_Sadhna_Sargam.jpg')
const navigation=useNavigation();

   
    
    const onPressable2=()=>{
        setImage('https://geetglow.com/assets/music/img/covers/Aishwarya_Pt.jpg')
        
    }
    const onPressSong=(songData)=>{
      setImage(`https://geetglow.com/${songData.cover}`)
     
      
     
    }
    
  return (
    <View style={styles.cardContainer}>
      
      <View style={{alignItems:'center',marginTop:20}}>
      <Image source={{uri:image} } style={styles.image}/>
      </View>
        
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:6}}>
       <Icon name='music' size={22} color='#1DB954' style={{marginLeft:20}}/>
       <Icon name='headphones' size={22} color='#1DB954' style={{marginRight:20}}/>
      </View>
      <ScrollView
      >
         
        {user.usertype === '0' ? (
  data !== undefined ? (
    data.map((song, index) => (
      <TouchableOpacity key={index} onPress={() => onPressSong(song)}>
        <Music name={` ${song.song_name}`} image={`https://geetglow.com/${song.cover}`} song_id={song.id} amt={song.amt} artist={song.artist_name}/>
      </TouchableOpacity>
    ))
  ) : null
) : (
  data !== undefined ? (
    data.map((song, index) => (
      <TouchableOpacity key={index} >
        <VendorMusic name={`${index + 1}.(${song.id}) ${song.song_name}`} image={`https://geetglow.com/${song.cover}`} artist={song.artist_name} cover={song.vamt} id={index} />
      </TouchableOpacity>
    ))
  ) : null
)}
       
      </ScrollView>
       <View style={{marginLeft:20, marginRight:20}}>

      </View>
      <View style={{marginLeft:20,marginTop:10,marginBottom:10}}>
        <Text style={{color:'white',fontSize:22}}>About Artist</Text>
        <Text style={{color:'#A9A9A9',marginRight:20,marginTop:5}}>This song is performed by Shabbir Kumar & Sadhna Sargam</Text>
      </View>
      {/* {sounds!==null?:} */}
    </View>
  )
}
  
export default Card
const styles = StyleSheet.create({
    cardContainer: {
    borderWidth: .1, // Thin border
    borderColor: '#ccc', // Border color
    borderRadius: 2, // Border radius for rounded corners
    overflow: 'hidden', // Clip the image to fit within the border
    
      },
    image: {
      width: 330,
      height: 175,
      resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
      borderRadius:10,
      marginLeft:20,
      marginRight:20
    
    },
    imageCard:{
        width:30,
        height:30,
        resizeMode: 'contain', // You can adjust the resizeMode as per your requirement
      borderRadius:3
    }
  });