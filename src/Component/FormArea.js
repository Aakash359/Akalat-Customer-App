import React from 'react';
import {StyleSheet, TextInput,} from 'react-native';
import {Colors,Scale,} from '../CommonConfig';

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
       multiline={true}
       numberOfLines={10}
      {...props}
    />
  </>
);

export default FormInput;

const styles = StyleSheet.create({
  textInputContainer: {
      textAlignVertical:'top',
  marginVertical: Scale(10),
    height: Scale(100),
    fontSize: Scale(16),
    color: Colors.BORDERCOLOR,
    paddingHorizontal: Scale(10),
    borderWidth: Scale(1),
    borderColor: Colors.BORDERCOLOR,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:Scale(5),
  },
  textStyle:{
      marginHorizontal:'5%',
    color:Colors.BORDERCOLOR,
    fontSize:Scale(14),
    marginBottom:Scale(5),
    marginTop:Scale(10)
  },
});
