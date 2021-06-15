import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { CustomButton } from '../../Component';

function PlaceOrder() {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToHome = () => {
        navigate('HomeScreen');
    };
    const redirectToTrackOrder = () => {
        navigate('TrackOrder');
    };
    return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
             <View style={styles.container}>
                        <Image source={ImagesPath.checkmark} style={{alignSelf:'center'}}/>
                        <Text style={styles.primaryText}>Order Placed Succusfully</Text> 
                        <View style={{ marginTop: Scale(40) }}>
                        <CustomButton title="Track Order" onSubmit={redirectToTrackOrder} isSecondary={true} />
                        </View>
                        <CustomButton title="Place New Order" onSubmit={redirectToHome} isSecondary={true} />
                    </View>

        </ImageBackground>

    );
}
export default PlaceOrder;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        paddingHorizontal: Scale(25),        
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%'
    },
    logoStyle: {
        fontSize: Scale(25),
        color: Colors.DARK_RED,
        height: Scale(20),
        width: Scale(45),
    },
    primaryText: {
        marginTop: Scale(25),
        fontSize: Scale(16),
        textAlign: 'center',
    },
    normalText: {
        fontSize: Scale(16),
        color: Colors.BLACK,
        textAlign: "left",
    },
});
