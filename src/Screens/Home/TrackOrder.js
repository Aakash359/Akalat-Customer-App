import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {
    ImagesPath,
    Scale,
    Colors,
} from '../../CommonConfig';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { homeStyle } from './homeStyles';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MapScreen } from "../../Component/MapScreen";
const mapScreen = props => {
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [pickUpModal, setPickUpModal] = useState(false);
    return (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <View style={{ flex: 1 }}>
                    <MapScreen />
                    <ImageBackground
                        source={ImagesPath.background}
                        style={homeStyle.bottomViewCont}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <Image
                                source={ImagesPath.backArrow}
                                style={styles.arrowStyle} />
                        </TouchableOpacity>
                        <View style={[styles.bottomContainer, { alignItems: 'center'
                    ,paddingBottom:Scale(0), 
                    borderBottomColor:Colors.GRAY,borderBottomWidth:0, }]}>
                                <Text style={styles.primaryText}>Order ID #123456785 </Text>
                                <Icon
                                    type="FontAwesome"
                                    name='phone-square'
                                    style={styles.buttonImage}
                                />
                            </View>
                        <View style={[styles.cardStyle, {
                            justifyContent: 'center',
                        }]}>                            
                            <View style={[styles.bottomContainer, { alignItems: 'center',
                        paddingBottom:Scale(0), 
                        borderBottomColor:Colors.GRAY,borderBottomWidth:0,  }]}>
                                <Text style={styles.normalText}>Order Received </Text>
                                <Image
                                            source={ImagesPath.check2x}
                                         style={styles.imageStyle}
                                         />
                            </View>
                            <Text style={styles.seconderyText}>We are waiting for the restaurant to confirm your order</Text>
                            <View style={styles.bottomContainer}>
                                <Text style={styles.normalText}>Order Confirmed</Text>
                                <Image
                                            source={ImagesPath.check2x}
                                         style={styles.imageStyle}
                                         />
                            </View>
                            <View style={styles.bottomContainer}>
                                <Text style={styles.normalText}>Order Pick up</Text>
                               
                            </View>
                            <View style={styles.bottomContainer,styles.removeBorder}>
                                <Text style={styles.normalText}>Order Delivered</Text>                                
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
}


export default mapScreen;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignSelf: 'center',
    },

    arrowStyle: {
        tintColor: Colors.DARK_RED,
        width: Scale(20),
        height: Scale(20),
        marginTop: Scale(20),
        resizeMode: 'contain',
    },
    imageStyle:{
        tintColor:'green',
        marginRight: Scale(5),
        width: Scale(20),
        height: Scale(20),
        resizeMode: 'contain',
    },
    buttonImage: {
        fontSize:Scale(40),
        borderRadius:Scale(20),
        color: Colors.APPCOLOR
    },
    cardStyle: {
        height: Scale(240),
        elevation: 5,
        shadowOpacity: 5,
        width: '100%',
        backgroundColor:Colors.WHITE,
        borderColor: Colors.GRAY,
        marginVertical: Scale(10),
        padding: Scale(15),
        alignSelf: 'center',
        borderRadius: Scale(5)
    },
    removeBorder:{paddingBottom:Scale(15), 
        borderBottomColor:Colors.GRAY,borderBottomWidth:0,},
    normalText: { color:Colors.BLACK, fontSize: Scale(17),  },
    seconderyText: { color: Colors.GRAY, fontSize: Scale(14),
        paddingBottom:Scale(5), 
        borderBottomColor:"#E0E0E0",borderBottomWidth:2,  },
    primaryText: { color: "#AB8F8E", fontSize: Scale(18), fontWeight: 'bold' },
    bottomContainer: {
        paddingBottom:Scale(15), 
        borderBottomColor:"#E0E0E0",borderBottomWidth:2,flexDirection: 'row', justifyContent: 'space-between', marginVertical: Scale(5), alignItems: 'center' },

})
