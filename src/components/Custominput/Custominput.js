import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { Controller ,contr} from 'react-hook-form'
import Icon from 'react-native-vector-icons/FontAwesome';
export default function CustomInput({ control, name, placeholder, rules = {}, secureTextEntry,keyboardTypes,recharge,color }) {
  const [secureEntry, setSecureEntry] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
   
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const keyboardType=({value})=>{
    if(value==='Mobile No.'){
       return 'numeric'
    }
  }

  return (
      
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur },fieldState:{error} }) => (
          <>
          <View style={[styles.container,{borderColor: error?'red':isFocused?'#1DB954':recharge ? '#ADD8E6':'#2F2B2B'},styles]}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            style={{
              padding:10,
              color:color===undefined?'white':'black',
              width:recharge?200:null,
              width:'90%'
            }}
            secureTextEntry={secureEntry}
            placeholderTextColor={color===undefined?'white':color}
            onFocus={handleFocus}
            keyboardType={keyboardTypes}
          />
           {secureTextEntry && ( // Only show the eye icon if secureTextEntry is true
          <TouchableOpacity
            style={{ marginRight: 10,backgroundColor: recharge ? '#1DB954' : null }}
            onPress={() => setSecureEntry(!secureEntry)}

          >
            <Icon
              name={secureEntry ? 'eye-slash' : 'eye'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        )}
          </View>
         
          {error &&(
          <Text style={{color:'red', alignSelf:'stretch'}}>{error.message||Error}</Text>
          )}
          </>
        )}
      />
         
  )
}


const styles = StyleSheet.create({
  container: {
    
    width: "100%",
    borderColor: '#2F2B2B',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection:'row',
    alignItems:'center',
    
  },

  input: {
    padding:10,
    
  }
})
