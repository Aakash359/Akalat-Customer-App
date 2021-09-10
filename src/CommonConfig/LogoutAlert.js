import React, {Component} from 'react'
import {View, Modal, TouchableOpacity, Text} from 'react-native'
import {Scale, Colors, Fonts} from './index'

export const LogoutAlert = ({
  visible,
  alertTitle,
  title,
  rightButtonText,
  leftButtonText,
  onPressLeftButton,
  onPressRightButton,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: Colors.WHITE,
            borderRadius: Scale(20),
            paddingTop: Scale(20),
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: Scale(20),
              color: Colors.BUTTON_COLOR,
              width: '80%',
              textAlign: 'center',
            }}>
            {title}
          </Text>

          <Text
            style={{
              fontSize: Scale(16),
              color: 'rgb(100,100,100)',
              width: '80%',
              textAlign: 'center',
              marginTop:
                title != '' || title != null || title != undefined
                  ? Scale(10)
                  : Scale(20),
            }}>
            {alertTitle}
          </Text>

          <View
            style={{
              height: Scale(45),
              width: '90%',
              flexDirection: 'row',
              marginTop: Scale(25),
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: Scale(20),
            }}>
            <TouchableOpacity
              onPress={onPressRightButton}
              style={{
                width: '45%',
                height: '100%',
                backgroundColor: '#909090',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Scale(30),
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: Scale(16),
                  //fontFamily: Fonts.Medium,
                }}>
                {rightButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressLeftButton}
              style={{
                width: '45%',
                height: '100%',
                backgroundColor: Colors.APPCOLOR,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Scale(30),
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: Scale(16),
                  //fontFamily: Fonts.Medium,
                }}>
                {leftButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
