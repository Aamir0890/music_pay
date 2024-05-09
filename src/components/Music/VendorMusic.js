import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Pressable, Alert, TextInput } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useAudioContext } from '../../../Global/Context';
import Custominput from '../Custominput';
import { useForm } from 'react-hook-form'
import CustomButton from '../CustomButton';
import { useNavigation ,useFocusEffect} from '@react-navigation/native';

const VendorMusic = ({ name, image, key,artist,cover,id }) => {
  const { user,song } = useAudioContext();
  const { control, handleSubmit } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [status,setStatus]=useState(0)
  const [qnt, setQnt] = useState(0)
  const [recharge, setRecharge] = useState(0)
  const [amt,setAmt]=useState(5)
  const [err,setErr]=useState()
  const navigation=useNavigation()
  const [payment,setPayment]=useState(false)

  const closeSecondModal = () => {
    setPayment(false);
  };
  let song_id
  const getData = async (id) => {
    let response = await axios.get(`https://geetglow.com/api/vendoravailablesong/${user.user_id}/${id}`)
    setQnt(response.data.tot)
  }
  
  const handlePress = useCallback(() => {
    setModalVisible((prevModalVisible) => !prevModalVisible);
    setStatus(0)
    setErr()
    const match = name.match(/\((\d+)\)/);
    getData(match[1])
    song_id=match[1]
  }, [setModalVisible]);

  useFocusEffect(()=>{
    const match = name.match(/\((\d+)\)/);
    getData(match[1])
    song_id=match[1]
  })
  
  const recharges = () => {
    console.log('rechage')
    if (recharge === 1) {
      setRecharge(0)
    } else {
      setRecharge(1)
    }
  }

  const handleRecharge = async (data) => {
    // console.log(data)
    const match = name.match(/\((\d+)\)/);
    // console.log(match[1])
    
    await axios.get(`https://geetglow.com/api/rechange/${user.user_id}/${match[1]}/${data.Mobile}`).then(response=>{
      
    if(response.data.message==="Recharge Failed"){
      setStatus(2)
      setRecharge(0)
    }
    else{
      setRecharge(0)
      setStatus(1)
    }
   
    }).catch(error=>{
      console.log(error)
    })
  }
const price=()=>{
  // console.log(amt)
  if(amt===0||amt%5!==0||amt===null){
    setErr("Please enter multiple of 5")
  }else{
    const match = name.match(/\((\d+)\)/);
    // console.log(match[1])
    setModalVisible(false)
    
    navigation.navigate("Payment",{amt:amt,id:match[1]})
  }

}

  const buy = () => {
    if (recharge === 2) {
      setRecharge(0)
    } else {
      setRecharge(2)
    }
  }
  const handleAmountChange = (text) => {
    // If text is empty, set the amt to null
    // Otherwise, ensure that the entered value is a number before updating the state
    if (text === '') {
      setAmt(null);
    } else {
      const numericValue = parseFloat(text);
      if (!isNaN(numericValue && numericValue % 5 === 0)) {
        setAmt(numericValue);
      }
    }
    // console.log(amt)
  };    
  const demo=()=>{
   navigation.navigate('Music',{id:{id}})
  }
 
  return (
    <View style={{ justifyContent: 'space-around', marginTop: 22, marginRight: 'auto' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handlePress}>
              <Icon name="close-outline" size={30} color="gray" />
            </Pressable>
               <View style={{alignItems:'center'}}>
               <TouchableOpacity onPress={demo}>
               <Image source={require('../../../assets/demo.png')} style={{ marginLeft: 5, width: 45, height: 45, resizeMode: 'contain' }} />
               <Text style={{fontSize:15,marginVertical:'2%'}}>Play Demo</Text>
               </TouchableOpacity>
               </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ margin: '5%', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: '10%' }}>Load Song</Text>
                <TouchableOpacity onPress={buy}>
                  <Image source={require('../../../assets/downloading.png')} style={{ marginLeft: 5, width: 35, height: 35, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
              <View style={{ margin: '5%', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: '10%' }}>Qty Avl</Text>
                <Text style={{ fontSize: 25 }}>{qnt}</Text>
              </View>
              <View style={{ alignItems: 'center', margin: '5%' }}>
                <Text style={{ fontSize: 16, marginBottom: '10%' }}>Recharge</Text>
                <TouchableOpacity onPress={recharges}>
                  <Image source={require('../../../assets/mobile.png')} style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
            </View>
            {status===1?<View><Text style={{color:'green'}}>Recharge Successfull!!</Text></View>:status===2?<View><Text style={{color:'red'}}>Recharge Failed</Text></View>:null}
            {recharge === 1 ? <View style={{ alignItems: 'center', margin: '5%' }}>
              <Custominput
                name="Mobile"
                placeholder="Mobile No."
                control={control}
                rules={{
                  required: 'Mobile No. is required',
                  pattern: {
                    value: /^[0-9]{10}$/, // Regular expression to match 10 digits
                    message: "Mobile Number must be 10 digits",
                  }
                }}
                keyboardTypes="numeric"
                recharge={recharge}
                color='black'
              />
              <CustomButton text='Recharge' recharge='recharge' onPress={handleSubmit(handleRecharge)} />
            </View> : recharge === 2 ? 
            <View>
              <Image source={{ uri: image }} style={{ width: 300, height: 200, resizeMode: 'contain' }} />
                 
               <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'5%'}}>
                <Text style={{fontSize:15}}>Song Name -</Text>
               <Text style={{fontSize:15,width:'65%'}}>{name}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'5%'}}>
                <Text  style={{fontSize:15}}>Artist Name-</Text>
               <Text  style={{fontSize:15,width:'65%'}}>{artist}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
                <Text  style={{fontSize:15}}> Amt per Track -</Text>
               <Text style={{marginRight:'25%',fontSize:20}}> ₹ {cover}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'5%'}}>
                <Text style={{fontSize:15}}>Quantity -</Text>
                <View>
                 
                  
                </View>
                <TextInput
                style={{backgroundColor:'#1DB954',width:'25%',marginRight:'20%',color:'white',padding:'2%',borderRadius:10}}
                value={amt === null ? '' : amt.toString()}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                /> 
               
                </View>
                <Text style={{color:'red'}}>{err}</Text>
                <View style={{alignItems:'center'}}>
                <CustomButton text="Buy Song" recharge='recharge' onPress={price}/>
                </View>
                
            </View>
              

              : null}
          </View>


        </View>
      </Modal> 
      
      <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: '7%' }} onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.imageCard} />
        <Text numberOfLines={1} style={{ color: 'white', maxWidth: 230, marginLeft: 20 }} ellipsizeMode="tail">{name}</Text>
        <Text style={{color:'white',marginLeft:5}}>AVL- {qnt}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VendorMusic

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
    borderRadius: 10,

  },
  imageCard: {
    width: 30,
    height: 30,
    resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
    borderRadius: 3
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: '5%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }, button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the button is above other content
  },
  buttonClose: {
    backgroundColor: 'transparent', // Make button background transparent
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    },
});