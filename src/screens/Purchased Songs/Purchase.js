import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Music from '../../components/Music/Music'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { useAudioContext } from '../../../Global/Context'
import Header from '../../components/Header'
import {useFocusEffect} from '@react-navigation/native'
require('dotenv').config();
const MusicTableItem = ({ id, numberOfMusic, amount, date }) => {
     const [img,setImg]=useState('https://geetglow.com/assets/music/img/covers/Shabbir_Kumar,_Sadhna_Sargam.jpg')
     const [naam,setNaam]=useState()
     const image=async()=>{
      const data=await axios.get(`${process.env.LINK}/songs/${id}`)
      const photo=data.data
      const n=photo[0].artist_name
      setNaam(n)
      const d=photo[0].cover
      const pic=`https://geetglow.com/${d}`
      setImg(pic)
      console.log(img)
     }
  useEffect(()=>{
      image()
  },[])

  return (
    
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
      <Image source={{ uri: img }} style={styles.musicImage} />
      <Text style={[styles.musicName,{fontSize:10}]}>{naam}</Text>
      </View>
      
      <Text style={[styles.tableCell,{fontSize:13}]}>{numberOfMusic}</Text>
      <View style={{ width: 80, marginLeft: 60 }}>
      <Text style={[styles.tableCell,{fontSize:13}]}>₹{amount}</Text>
      </View>
      <Text style={[styles.tableCell,{fontSize:10}]}>{date}</Text>
    </View>
  );
};

const Purchase = () => {
  const {user}=useAudioContext();
    
     const [data,setData]=useState();

   const trans=async()=>{
     const transData=await axios.get(`${process.env.LINK}/transaction/${user.user_id}`)
      setData(transData.data)
     
   }

   useFocusEffect(
    React.useCallback(() => {
     
      console.log(user.user_id); 
      trans();
      console.log(data); 
      
      return () => {
        // Your cleanup code here
      };
    }, [])
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header/>
    <LinearGradient
      colors={['rgba(2,0,36,1)', 'rgba(0,212,255,1)']}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>


        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 32, marginBottom: 20, marginTop: 120 }}>
            History
          </Text>
          <View style={{ borderWidth: .1, // Thin border
    borderColor: '#ccc', // Border color
    borderRadius: 2, // Border radius for rounded corners
    overflow: 'hidden',}}>
            <View>
            <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Music</Text>
        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Number of Music</Text>
        <Text style={[styles.tableCell, { fontWeight: 'bold',marginRight:30 }]}>Amount</Text>
        <Text style={[styles.tableCell, { fontWeight: 'bold',marginRight:25 }]}>Date</Text>
      </View>
      
      {/* Music Table Items */
       data !== undefined ? (
       data.map((song, index) => (
        
        <MusicTableItem
        key={index}
        id={song.sid}
        numberOfMusic={song.qty}
        amount={song.amount_paid}
        date={song.created_on}
      />
      ))):<Text>No data</Text>
      }

            </View>
         
          </View>
</View>

      </ScrollView>
    </LinearGradient>
   
  </SafeAreaView>
  
  )
}

export default Purchase
const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent:'space-between',
    marginHorizontal:'10%'
    
  },
  musicImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
   resizeMode:'contain'
  },
  musicName: {
    flex: 2, // Adjust flex to control the width of the name column
    width:97,
    color:'white'
  },
  tableCell: {
    margin:14,
    color:'white',
   
  },
  tableCell1:{
    marginLeft:14
  }
});