import React, {Component} from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';
import {Scale, Colors, Fonts} from './index';
export const Alert = ({
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
            borderRadius: Scale(10),
            paddingTop: Scale(20),
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: Scale(18),
              fontFamily: Fonts.Regular,
              color: Colors.BLACK,
              width: '80%',
              textAlign: 'center',
            }}>
            {title}
          </Text>

          <Text
            style={{
              fontSize: Scale(16),
              fontFamily: Fonts.Medium,
              color: Colors.BLACK,
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
              height: Scale(40),
              width: '100%',
              flexDirection: 'row',
              marginTop: Scale(25),
            }}>
            <TouchableOpacity
              onPress={onPressLeftButton}
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: Colors.BUTTON_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: Scale(14),
                  fontFamily: Fonts.Medium,
                }}>
                {leftButtonText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressRightButton}
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: Colors.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.BUTTON_COLOR,
              }}>
              <Text
                style={{
                  color: Colors.BUTTON_COLOR,
                  fontSize: Scale(14),
                  fontFamily: Fonts.Medium,
                }}>
                {rightButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
