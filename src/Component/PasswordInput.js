import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Colors,
  Scale,
} from '../CommonConfig';
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
    ...props
  }) => (
    <View style={styles.container}>
        <Text style={styles.textStyle}> {placeholder}</Text>
      <View style={styles.textBoxContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry={hidePassword1}
          style={styles.textBox}
          placeholder={placeholder}
          placeholderTextColor={Colors.BLACK}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.touachableButton}
          onPress={onSubmit}>
          <Icon
            name={hidePassword1 ? 'visibility-off' : 'visibility'}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
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
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textBox: {
    fontSize: 16,
    alignSelf: 'stretch',
    height: Scale(45),
    paddingRight: Scale(45),
    paddingHorizontal: Scale(8),
    borderWidth: Scale(1),
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: Scale(5),
  },
  touachableButton: {
    position: 'absolute',
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
    color:Colors.BLACK,
    fontSize:Scale(14),
    marginBottom:Scale(10),
    marginTop:Scale(20)
  },
});
