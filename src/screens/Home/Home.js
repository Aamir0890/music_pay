import { View, Text, ImageBackground, useWindowDimensions, Dimensions,StyleSheet,ActivityIndicator,BackHandler,Alert } from 'react-native'
import React, { useEffect,useState,useCallback } from 'react'
import Header from '../../components/Header'
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import { ScrollView } from 'react-native-gesture-handler';
import { useAudioContext } from '../../../Global/Context';
import { useFocusEffect } from '@react-navigation/native';
require('dotenv').config();
const images = [
  { url: 'https://geetglow.com/assets/music/img/home/slide1.jpg', text: 'फिल्म से हटकर फिल्म से बढ़कर।' },
  { url: 'https://geetglow.com/assets/music/img/home/slide2.jpg', text: 'अरु' },
  { url: 'https://geetglow.com/assets/music/img/home/slide3.jpg', text: 'गाना रिचार्ज करें।' },
];
const CarouselComp = () => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
         

    }}>
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={3000}
        style={{ borderRadius: 5 }}
        renderItem={({ item }) => (
           
          <ImageBackground
            source={{ uri: item.url }}
            style={{ width: '100%', height: "87%", justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 30, color: 'white', padding: 10, marginRight: 90 }}>
              {item.text}
            </Text>
          </ImageBackground>
        )}

      />
    </View>
 
  )
}



const Home = () => {

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );


  const [songs, setSongs] = useState();
  const {user}=useAudioContext();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.LINK}/songs`);
        setSongs(response.data);
        // console.log(songs,1)
        // console.log(user.usertype)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors here
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        
      <Header/>
    <ScrollView>
      <View >
        <ImageBackground source={{uri:'https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg'}} style={styles.backgroundImage}>
        <CarouselComp />
        </ImageBackground>
      </View>
      
      <ImageBackground source={{uri:'https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg'}} style={styles.backgroundImage}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'-35%'
         }}>
      <Text style={{color:'white', fontSize:30,marginRight:'64%'}}>गीत संग्रह</Text>
        { songs!==undefined ?(
           <Card songs={songs} />
        ):null}
    </View>
    </ImageBackground>

    

    </ScrollView>

    </SafeAreaView>
  )
}

export default Home

const styles=StyleSheet.create({
  logo:{
      width: '50%',
      maxWidth: 300,
      maxHeight: 200,
      
  },
  backgroundImage:{
   
   
   width:'100%',
  }
})