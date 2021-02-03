import React, { Component } from 'react'
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import Colors from './Colors';
import { Scale, Fonts } from '.';

export const LoadWheel = ({ visible }) => {
    return (
        <Modal visible={visible} transparent style={{ flex: 1, }}>
            <View style={{ justifyContent: 'center', position: "absolute", backgroundColor: 'rgba(52, 52, 52, 0.7)', height: visible ? '100%' : 0, width: visible ? '100%' : 0, alignItems: 'center' }}>
                <View style={{ height: Scale(105), width: Scale(105), borderRadius: Scale(10), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE }}>
                    <ActivityIndicator size="large" style={{ marginVertical: 5 }} color={Colors.APPCOLOR} />
                    <Text style={{ fontFamily: Fonts.regular, fontWeight: '600', marginVertical: 5, fontSize: 15, color: Colors.APPCOLOR }}>Loading..</Text>
                </View>
            </View>
        </Modal>
    )
}