import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView,ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { useNavigation } from '@react-navigation/native';
function PrivacyPolicy() {
    const navigation = useNavigation();    
    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor={Colors.APPCOLOR}
                barStyle="light-content"
            />
            <View style={styles.headerContainer}>
                <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle} />
            </View>
            <Text style={styles.headerText}>Privacy Policy </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <ScrollView style={styles.mainContainer}>
                    <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                    duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                    duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua. At vero eos et accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                   </Text>
                </ScrollView>
            </ImageBackground>

        </View>
    );
}
export default PrivacyPolicy;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    loginInputCont: {
        height: '100%',
        flex: 1,
        paddingTop: Scale(10),
        paddingBottom: Scale(10),       
        borderTopLeftRadius: Scale(25),
        borderTopRightRadius: Scale(25),
        backgroundColor: Colors.WHITE,
    },
    mainContainer:{ paddingHorizontal: Scale(25),paddingVertical:Scale(15)},
    textStyle:{fontSize:Scale(16),color:Colors.BLACK},
    headerText: {
        fontSize: Scale(20),
        marginHorizontal: Scale(25),
        marginBottom: Scale(25),
        color: Colors.WHITE
    },
    headerContainer: {
        height: Scale(80),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
        paddingHorizontal: Scale(25),
    },

    logoStyle: {
        marginTop: Scale(15),
        fontSize: Scale(25),
        color: Colors.WHITE,
    },
});
