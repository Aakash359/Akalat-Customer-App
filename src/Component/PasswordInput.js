import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Icon} from 'native-base';
import {
  Colors,
  Scale,
} from '../CommonConfig';
import DropDown from './DropDown1';
import Font from '../CommonConfig/Fonts';

const PasswordInput = ({
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    errorValue,
    onBlur,
    onSubmit,
    onChangeText,
    hidePassword1,
    data,
    ...props
  }) => (
    <View style={styles.container}>
        <Text style={styles.textStyle}> {placeholder}</Text>
      <View style={styles.textBoxContainer}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:Scale(16),color:'#000000'}}>+91</Text>
          <Icon type='AntDesign' name="caretdown" 
           style={{fontSize:Scale(16),marginLeft:Scale(2)}}/>
          </View>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.textBox}
          placeholder={placeholder}          
          keyboardType={keyboardType}
          placeholderTextColor={'#909090'}
          maxLength={15}
        />
      </View>
    </View>
  );


export default PasswordInput;
const styles = StyleSheet.create({
  container: {    
    justifyContent: 'center',
    marginVertical: Scale(10),
  
  },
  textBoxContainer: {
    //width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth: Scale(1),
    
    paddingHorizontal: Scale(10),
    borderColor: '#AB8F8E',
    borderRadius: Scale(5),
    //position: 'relative',
    //alignSelf: 'stretch',
   // justifyContent: 'center',
  },
  textBox: {
    //position:'absolute',
    //width:'100%',
    flex:1,
    fontSize: Scale(16),
    fontFamily:Font.Bold,
    fontWeight:'500',
    alignSelf: 'stretch',
    left:15,
    height: Scale(45),
    paddingRight: Scale(45),
    paddingVertical: 0,
  },
  touachableButton: {
   // position: 'absolute',
    right: Scale(3),
    height: Scale(45),
    width: Scale(45),
    padding: Scale(3),
  },
  buttonImage: {
      paddingRight:Scale(5),
    fontSize: Scale(30),
    color: Colors.BLACK,
  },
  textStyle:{
    color:'#909090',
    fontSize:Scale(14),
    marginBottom:Scale(14),
    marginTop:Scale(5)
  },
});
