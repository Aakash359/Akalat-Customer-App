import React, {useState} from 'react'
import {Text, View, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Colors, Scale} from '../CommonConfig'

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
  value,
  ...props
}) => (
  <View style={styles.container}>
    <Text style={styles.textStyle}> {placeholder}</Text>
    <View style={[styles.textBoxContainer, {backgroundColor: backgroundColor}]}>
      <View
        activeOpacity={0.8}
        style={styles.touachableButton}
        onPress={onSubmit}>
        <Icon name="my-location" style={styles.buttonImage} />
      </View>
      <Text style={styles.textBox} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  </View>
)

export default LocationInput
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Scale(10),
  },
  textBoxContainer: {
    borderWidth: 1,
    borderRadius: Scale(5),
    borderColor: '#AB8F8E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginHorizontal: 10,
    maxWidth: 250,
  },
  touachableButton: {
    justifyContent: 'center',
    height: Scale(45),
    paddingLeft: Scale(5),
  },
  buttonImage: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: Scale(5),
    fontSize: Scale(20),
    color: '#F7A00D',
  },
  textStyle: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(14),
    marginBottom: Scale(10),
  },
})
