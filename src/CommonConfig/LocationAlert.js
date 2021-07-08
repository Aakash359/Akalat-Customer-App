import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Scale, Colors, Fonts } from './index';
export const LocationAlert = ({
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
            <View style={styles.cardStyle}>
                <View style={styles.cardItemStyle}>
                    <Text style={styles.titleText}>Use Location?</Text>
                    <Text style={styles.alertTitleText}>"Akalat" would like to use your {'\n'} current location</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onPressLeftButton}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>{leftButtonText}</Text>
                        </TouchableOpacity>
                        <View style={{width:'2.5%'}}/>
                        <TouchableOpacity
                            onPress={onPressRightButton}
                            style={styles.touchStyle}>
                            <Text style={styles.buttonText}>
                                {rightButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    cardItemStyle: {
        width: '90%',
        backgroundColor: Colors.WHITE,
        borderRadius: Scale(10),
        paddingTop: Scale(20),
        alignItems: 'center',
        overflow: 'hidden',
    },
    titleText: {
        fontSize: Scale(22),
        fontFamily: Fonts.Medium,
        color: Colors.BLACK,
        fontWeight:'bold',
        width: '80%',
        textAlign: 'center',
    },
    alertTitleText: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        color: Colors.BORDERCOLOR,
        width: '90%',
        textAlign: 'center',
        marginTop: Scale(15),
    },
    buttonContainer: {
        height: Scale(50),
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: Scale(25),
        marginBottom:Scale(35),
    },
    buttonStyle: {
        width: '45%',
        height: '100%',
        borderTopWidth: 2,
        borderRadius:Scale(25),
        borderTopColor: '#E0E0E0',
         backgroundColor: Colors.BORDERCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: Scale(18),
        fontFamily: Fonts.Medium,
    },
    touchStyle: {
        width: '45%',
        height: '100%',
        backgroundColor: "#F7A00D",
        borderRadius:Scale(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
})
