import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Scale, Colors, Fonts } from './index';
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
            <View style={styles.cardStyle}>
                <View style={styles.cardItemStyle}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.alertTitleText}>{alertTitle}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onPressLeftButton}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>{leftButtonText}</Text>
                        </TouchableOpacity>
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
        width: '80%',
        backgroundColor: Colors.WHITE,
        borderRadius: Scale(10),
        paddingTop: Scale(20),
        alignItems: 'center',
        overflow: 'hidden',
    },
    titleText: {
        fontSize: Scale(18),
        fontFamily: Fonts.Bold,
        color: Colors.BLACK,
        width: '80%',
        textAlign: 'center',
    },
    alertTitleText: {
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        color: Colors.BLACK,
        width: '80%',
        textAlign: 'center',
        marginTop: Scale(10),
    },
    buttonContainer: {
        height: Scale(50),
        width: '100%',
        flexDirection: 'row',
        marginTop: Scale(25),
    },
    buttonStyle: {
        width: '50%',
        height: '100%',
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        // backgroundColor: Colors.BUTTON_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#A4A4A4",
        fontSize: Scale(18),
        fontFamily: Fonts.Medium,
    },
    touchStyle: {
        width: '50%',
        height: '100%',
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderColor: '#E0E0E0',
    },
})
