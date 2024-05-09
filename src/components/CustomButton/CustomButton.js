import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress,text,type='PRIMARY',bgColor,fgColor,recharge}) => {
  return (
    <Pressable onPress={onPress} 
    style={[
        styles.container,
        styles[`container_${type}`],
        bgColor? {backgroundColor:bgColor}:{},
        recharge?{marginTop:20,width:150}:{}
        ]}>
      <Text style={[
        styles.text,
        styles[`text_${type}`],
        fgColor?{color:fgColor}:{}
        ]}>{text}</Text>
    </Pressable>
  )
}

const styles=StyleSheet.create({
    container:{
       
        width:'100%',
        padding:15,
        marginVertical:5,
        alignItems:'center',
        borderRadius:5
    },
    container_PRIMARY:{
        backgroundColor:'#1DB954',
    },
    container_TERTIARY:{
      textShadowColor:"green"
    },
    container_SECONDARY:{
         borderColor:'green',
         borderWidth:2
    },
    text:{
        fontWeight:'bold',
        color:'white'
    },
    text_TERTIARY:{
        color:'#1DB954'
    },
    text_SECONDARY:{
        color:'green'
    }
})

export default CustomButton