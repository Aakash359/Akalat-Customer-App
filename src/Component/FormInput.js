import React from 'react';
import {StyleSheet, TextInput, View,Text} from 'react-native';
import {Colors,Scale,Fonts,} from '../CommonConfig';

const FormInput = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  errorValue,
  onBlur,
  onChangeText,
  ...props
}) => (
  <>
<Text style={styles.textStyle}> {placeholder}</Text>
    <TextInput
      style={styles.textInputContainer}
      name={name}
      label={placeholder}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChange={onChangeText}
      placeholderTextColor={Colors.BORDERCOLOR}
      underlineColorAndroid="transparent"      
       onBlur={onBlur}
      {...props}
    />
  </>
);

export default FormInput;

const styles = StyleSheet.create({
  textInputContainer: {
  marginVertical: Scale(10),
    height: Scale(50),
    fontSize: Scale(16),
    color: Colors.BLACK,  
    paddingHorizontal: Scale(10),
    borderWidth: Scale(1),
    borderColor: Colors.BORDERCOLOR,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:Scale(5),
  },
  textStyle:{
    color:Colors.BORDERCOLOR,
    fontSize:Scale(14),
    marginBottom:Scale(5),
    marginTop:Scale(10)
  },
});
