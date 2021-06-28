import React, {useState} from 'react'
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale} from '../CommonConfig'
import Font from '../CommonConfig/Fonts'
import DropDown from '../Component/DropDown'

const NumberInput = ({
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
      <View style={{flexDirection: 'row' ,backgroundColor:'green'}}>
      <DropDown
       placeholder={'+91'}
       
       />      
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
)

export default NumberInput
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Scale(10),
  },
  textBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: Scale(1),
    paddingHorizontal: Scale(10),
    borderColor: '#AB8F8E',
    borderRadius: Scale(5),
  },
  textBox: {
    flex: 1,
    fontSize: Scale(16),
    fontFamily: Font.Bold,
    fontWeight: '500',
    alignSelf: 'stretch',
    left: 15,
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
    paddingRight: Scale(5),
    fontSize: Scale(30),
    color: Colors.BLACK,
  },
  textStyle: {
    color: '#909090',
    fontSize: Scale(14),
    marginBottom: Scale(14),
    marginTop: Scale(5),
  },
})
