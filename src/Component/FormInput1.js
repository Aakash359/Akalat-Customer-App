import React from 'react';
import {StyleSheet, TextInput, View,Text} from 'react-native';
import {Colors,Scale,Fonts,} from '../CommonConfig';

const FormInput1 = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  errorValue,
  onBlur,
  lable,
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
      placeholder={lable}
      keyboardType={keyboardType}
      onChange={onChangeText}
      placeholderTextColor={Colors.BORDERCOLOR}
      underlineColorAndroid="transparent"      
       onBlur={onBlur}
      {...props}
    />
  </>
);

export default FormInput1;

const styles = StyleSheet.create({
  textInputContainer: {
  marginVertical: Scale(10),
    height: Scale(50),
    fontSize: Scale(16),
    color: Colors.BLACK, 
    fontWeight:'500', 
    paddingHorizontal: Scale(10),
    borderWidth: Scale(1),
    borderColor: "#AB8F8E",
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:Scale(5),
  },
  textStyle:{
    color:'#909090',
    fontSize:Scale(14),
    marginBottom:Scale(5),
    marginTop:Scale(10)
  },
});
