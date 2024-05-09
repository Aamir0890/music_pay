import { View, Text ,TouchableOpacity,Image,StyleSheet,Modal,Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAudioContext } from '../../../Global/Context'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../CustomButton'
import { WebView } from 'react-native-webview';

const Music = ({name,image,song_id,amt,artist}) => {
   const [status,setStatus]=useState('1')
   const [price,setPrice]=useState()
   const {user}=useAudioContext();
   const navigation=useNavigation();
   const [payment,setPayment]=useState(false)
   const [modalVisible, setModalVisible] = useState(false);
   const openModal = () => {
    setModalVisible(true);
  };
   
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeSecondModal = () => {
    setPayment(false);
  };
   const check=async()=>{
    try {
      const data = await axios.get(`https://geetglow.com/api/purchased_songs/${user.user_id}/${song_id}`);
      const prices=await axios.get(`https://geetglow.com/api/songs/${song_id}`)
      const amt=prices.data[0].amt
    
      setPrice(amt)
      
      const response = data.data;
      
      setStatus(response.status)
    } catch (error) {
      setStatus(0)

    }
   }
 
   useEffect(()=>{
    check()
   
   },[price,status])

   const songCheck=()=>{
 if(status==='1'){
  navigation.navigate('UserPlayer',{id:song_id})
 }else{
setModalVisible(!modalVisible)
 }
   }
    const pay=()=>{
      navigation.navigate("Payment",{id:song_id})
      setModalVisible(false);

    }
   const handleSong=()=>{
    
   navigation.navigate('UserPlayer',{id:song_id})
   }
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity style={{resizeMode:'contain'}} onPress={closeModal}>
           
          <Icon name="close-outline" size={35} color="gray" style={{margin:'1%',marginLeft:'80%'}} />
            </TouchableOpacity>
          <Image source={{uri:image} } style={styles.imagePop}/>
          <View style={{flexDirection:'row',marginVertical:'3%'}}> 
            <Text style={{marginHorizontal:'5%',fontSize:16}}>Song Name:</Text>
            <Text style={{width:'55%',fontSize:16}}>{name}</Text>
          </View>
           <View style={{flexDirection:'row',marginVertical:'3%'}}>
            <Text style={{marginHorizontal:'5%',fontSize:16}}>Artist :</Text> 
            <Text style={{width:'50%',fontSize:16}}>  {artist}</Text>
            </View>
          <View style={{flexDirection:'row' ,marginVertical:'3%'}}>
            <Text style={{marginHorizontal:'8%',fontSize:16}}>Amount :</Text> 
            <Text style={{width:'50%',fontSize:16}}> ₹ {amt}</Text>
          </View>
            <CustomButton text='Buy Now' recharge='recharge'onPress={pay}/>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={payment}
        onRequestClose={closeSecondModal}
      >
        <View style={styles.modalContainer}>
         
            <TouchableOpacity onPress={closeSecondModal} style={{backgroundColor:'white',alignItems:'flex-end',marginLeft:'60%'}}>
            <Icon name="close-outline" size={40} color="gray" />
            </TouchableOpacity>
            
            <View style={{ width: '70%', height: '70%' }}>
            <WebView source={{ uri: `https://geetglow.com/music/mpay/${user.user_id}/${song_id}` }} 
              style={{ flex: 1, fontSize:20 }}
            />
          </View>
        </View>
      </Modal>
      
       <TouchableOpacity style={{flexDirection:'row', marginTop:22,alignItems:'center',marginHorizontal:'7%'}} onPress={songCheck}>
        <Image source={{uri:image} } style={styles.imageCard}/>
        <Text numberOfLines={1} style={[ status === '1' ? styles.glowText:styles.notglow,{maxWidth:230 ,marginLeft:20}]} ellipsizeMode="tail">{name}</Text>
        {status === '1' ? (
          <TouchableOpacity onPress={handleSong}>
            <Icon name="play-outline" size={30} color="white" style={{margin:'10%'}} />
          </TouchableOpacity>):<TouchableOpacity>
            <Text style={{color:'white'}}>Purchase</Text>
            </TouchableOpacity>
            }
      </TouchableOpacity>
    
    </View>
  )
}

export default Music


const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: .1, // Thin border
    borderColor: '#ccc', // Border color
    borderRadius: 2, // Border radius for rounded corners
    overflow: 'hidden', // Clip the image to fit within the border
        
      },
    image: {
      width: 300,
      height: 200,
      resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
      borderRadius:10,
    
    },
    imageCard:{
      width: 30,
      height: 30,
      resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
      borderRadius: 3
    } ,
    glowText: {
      color: 'green',
   
    
    },
    notglow:{
      color:'white'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems:'center'
    },
    imagePop:{
      width: 100,
      height: 100,
      resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
      borderRadius: 3
    }
  });