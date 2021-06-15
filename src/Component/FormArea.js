import React from 'react';
import {StyleSheet, TextInput, View,Text} from 'react-native';
import {Colors,Scale,Fonts,} from '../CommonConfig';

const FormArea = ({
  returnKeyType,
  keyboardType,
  name,
  label,
  placeholder,
  errorValue,
  onBlur,
  onChangeText,
  ...props
}) => (
  <>
<Text style={styles.textStyle}> {label}</Text>
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
      multiline
      numberOfLines={6}
    />
  </>
);

export default FormArea;

const styles = StyleSheet.create({
  textInputContainer: {      
    textAlignVertical: 'top',
  marginBottom: Scale(10),
    height: Scale(180),
    fontSize: Scale(16),
    color: Colors.BLACK,
    paddingHorizontal: Scale(10),
    borderWidth: Scale(1),
    borderColor: "#AB8F8E",
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:Scale(5),
  },
  textStyle:{
    color:Colors.BORDERCOLOR,
    fontSize:Scale(14),
    marginBottom:Scale(10),
    marginTop:Scale(15),
    
  },
});
