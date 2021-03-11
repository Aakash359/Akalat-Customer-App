import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Colors,
  Scale,
} from '../CommonConfig';
const LocationInput = ({
    returnKeyType,
    backgroundColor,
    keyboardType,
    name,
    placeholder,
    errorValue,
    onBlur,
    onSubmit,
    onChangeText,
    hidePassword1,
    ...props
  }) => (
    <View style={styles.container}>
        <Text style={styles.textStyle}> {placeholder}</Text>
      <View style={[styles.textBoxContainer,{backgroundColor:backgroundColor}]}>       
        <View
          activeOpacity={0.8}
          style={styles.touachableButton}
          onPress={onSubmit}>
          <Icon
            name='my-location'
            style={styles.buttonImage}
          />
        </View>
        <TextInput
      style={styles.textBox}
      name={name}
      label={placeholder}      
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      numberOfLines={1}    
      onChange={onChangeText}
      placeholderTextColor={Colors.BORDERCOLOR}
      underlineColorAndroid="transparent"      
       onBlur={onBlur}
      {...props}
    />
      </View>
    </View>
  );


export default LocationInput;
const styles = StyleSheet.create({
  container: {    
    justifyContent: 'center',
    marginVertical: Scale(10),
  
  },
  textBoxContainer: {
      borderWidth:1,
      borderRadius:Scale(5),
      borderColor:'grey',
    flexDirection:'row',
    alignItems:'center'
  },
  textBox: {
    fontSize: 16,
    //alignSelf: 'stretch',
    height: Scale(45),
    paddingRight: Scale(45),
    paddingHorizontal: Scale(8),    
    paddingVertical: 0,
    borderRadius: Scale(5),
  },
  touachableButton: {
      justifyContent:'center',
    right: Scale(3),
    height: Scale(45),
    paddingLeft:Scale(5),
   // width: Scale(30),
  },
  buttonImage: {
      textAlign:'center',
      textAlignVertical:'center',
      paddingLeft:Scale(5),
    fontSize: Scale(20),
    color: "#F7A00D",
  },
  textStyle:{
    color:Colors.BORDERCOLOR,
    fontSize:Scale(14),
    marginBottom:Scale(10),
    
  },
});