import React, { useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Scale, Colors, ImagesPath } from '../../CommonConfig'
import { CustomButton } from '../../Component'
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { round } from 'react-native-reanimated'

function PlaceOrder(props) {
    const { navigate } = useNavigation()
    const navigation = useNavigation()
    const  { Restro_id } = props.route.params

    const redirectToHome = () => {
        navigate('NearMe')
    }
    const redirectToTrackOrder = () => {
        navigate('TrackOrder', {Restro_id : props.route.params} )
    }
    return (
        <ImageBackground
            source={ImagesPath.background}
            style={styles.imageBachgroundStyle}
        >
            <View style={styles.container}>
                <Image
                    source={ImagesPath.checkmark}
                    style={{ alignSelf: 'center' }}
                />
                <Text style={styles.primaryText}>Order Placed Succusfully</Text>
                <View style={{ marginTop: Scale(40) }}>
                    <CustomButton
                        title="Track Order"
                        onSubmit={redirectToTrackOrder}
                        isSecondary={true}
                        btnStyle={{
                            width: '90%',
                            paddingVertical: 10,
                            marginVertical: 0,
                        }}
                    />
                </View>
                <CustomButton
                    title="Place New Order"
                    onSubmit={redirectToHome}
                    isSecondary={true}
                    btnStyle={{ width: '90%', paddingVertical: 10 }}
                />
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = ({
    Cart: { restroDetails, },
    Auth: { user },
}) => ({
    restroDetails,
    
})

export default connect(mapStateToProps,null)(PlaceOrder)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Scale(25),
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%',
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
        textAlign: 'left',
    },
})
