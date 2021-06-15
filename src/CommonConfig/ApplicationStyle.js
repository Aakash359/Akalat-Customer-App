import { View, Text, Platform } from 'react-native';
import Colors from "./Colors";
import Scale from "./Matrics";
import Fonts from "./Fonts";
import { screenWidth } from './HelperFunctions/functions';

export const ApplicationStyles = {
    shadowOpt: {
        color: "#000",
        border: 2,
        radius: 3,
        opacity: 0.2,
        x: 0,
        y: 3,
        style: { marginVertical: 5 }
    },
    headerTitleStyle: {
        color: Colors.MATEBLACK,
        fontFamily: Fonts.bold,
        width: screenWidth - 75,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: Scale(20),
        // fontWeight: '600',
    },
    headerStyle: {
        // shadowOffset: { height: Scale(2), width: Scale(0) },
        shadowOpacity: 0,
        // justifyContent: 'center',
        // shadowRadius: 2,
        // fontFamily: Fonts.regular,
        borderBottomWidth: 0,
        elevation: 0,
        // shadowColor: Colors.GRAY,
        height: Platform.OS == 'android' ? Scale(80) : Scale(50),
        backgroundColor: Colors.WHITE
    },
    headerShadowStyle: {
        shadowOffset: { height: Scale(2), width: Scale(0) },
        shadowOpacity: 0.3,
        justifyContent: 'center',
        shadowRadius: 2,
        // fontFamily: Fonts.regular,
        borderBottomWidth: 0,
        elevation: 5,
        shadowColor: Colors.GRAY,
        height: Platform.OS == 'android' ? Scale(80) : Scale(50),
        backgroundColor: Colors.WHITE
    },
    hiddenStyle: {
        height: Scale(0)
    },
    backArrowStyle: {
        height: Scale(25),
        width: Scale(25),
        marginLeft: Scale(15), tintColor: Colors.MATEBLACK
    }
}