import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Switch,FlatList, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, LogoutAlert,ImagesPath, Fonts } from '../../CommonConfig';
import { useNavigation } from '@react-navigation/native';
function SavedCard() {
    const [checked, setChecked] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const[deleteAdd , setDeleteAdd]=useState(false);
    const [items, setItems] = React.useState([
        {name: 'Anuj Tyagi', cardNo: '1234 XXXX XXXX 5678',  },
        {name: 'Anuj Tyag', cardNo: '1234 XXXX XXXX 9876', },
    
      ]);
    const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToAddress = () => {
        navigate('AddNewCard');
    };
    
    const toggleSwitch = (value) => {
        setSwitchValue(value);
      };
    const renderItems = ({ item, index }) => (
      
        <View style={styles.cardStyle}>
            <View style={styles.nameStyle}>
                <View>
                    <Text style={[styles.nameText,{fontWeight:'bold'}]}>{item.name}</Text>
                </View>
                <View style={{flexDirection:'row',}}>
                    <Text onPress={() => setDeleteAdd(true)} style={[styles.nameStyle,{fontWeight:'bold',color:Colors.APPCOLOR}]}>Delete  </Text>
                    <Text onPress={() => navigate('EditCard')} style={[styles.nameStyle,{fontWeight:'bold',color:Colors.APPCOLOR,marginLeft:Scale(10)}]}>Edit</Text>
                </View>
            </View>
            <Text style={styles.nameText}>
                {item.cardNo}
                </Text>
                <View style={styles.bottomStyle}>
                    <Text style={{fontSize:Scale(16),color:'#AB8F8E'}}>Set as default</Text>                
                <Switch
              trackColor={{ false: Colors.LIGHTGREY, true: Colors.DARK_RED }}
              style={{transform: [{scaleX: 1.1}, {scaleY: 1.1}]}}
              thumbColor={switchValue ? Colors.WHITE : Colors.WHITE}
              ios_backgroundColor={Colors.GREEN}
              onValueChange={toggleSwitch}
              value={switchValue}
            />
            </View>
        </View>
    );
    
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
            <View style={styles.buttonHeader}>
                <Text style={styles.headerText}>Saved Cards</Text>
                <Text onPress={redirectToAddress} style={styles.textStyle}>Add New Card</Text>
            </View>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
                <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                    enabled>
                    <ScrollView indicatorStyle={Colors.WHITE}>
                        <FlatList
                            data={items}
                            renderItem={renderItems}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
            <LogoutAlert
          visible={deleteAdd}
          title={'Delete Card'}
          alertTitle={'Are you sure you want to delete this Card?'}
          rightButtonText={'Yes'}
          leftButtonText={'No'}
          //  onPressLeftButton={() => this.setState({ logoutModal: false })}
          onPressLeftButton={() => setDeleteAdd(false)}
          onPressRightButton={() => setDeleteAdd(false)}
        />
        </View>
    );
}
export default SavedCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    nameStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:Scale(10)
    },
    bottomStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
    borderColor:'#00000029',
    marginTop:Scale(15),
    paddingTop:Scale(10),
    borderTopWidth:Scale(1.5)
},
    nameText:{
        fontSize:Scale(16),
        fontFamily:Fonts.Bold,
        color:Colors.BLACK
    },
    cardStyle: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: Scale(2),
        borderColor: Colors.LIGHTGREY,
        marginVertical: Scale(15),
        paddingHorizontal: Scale(15),
        paddingVertical: Scale(15),
        alignSelf: 'center',
        borderRadius: Scale(10)
      },
    buttonContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        borderWidth: Scale(1),
        borderColor: Colors.WHITE,
        borderRadius: Scale(26)
    },
    buttonHeader: {
        height:Scale(50),
        marginBottom: Scale(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Scale(25),
    },
    textStyle: {
        borderRadius: Scale(20),
        borderWidth: Scale(1),
        borderColor: Colors.WHITE,
        paddingHorizontal: Scale(15),
        height: Scale(40),
        textAlignVertical: 'center',
        color: Colors.WHITE,
        fontSize: Scale(15),
        fontWeight: 'bold'
    },
    loginInputCont: {
        flex: 1,
        paddingTop: Scale(10),
        paddingBottom: Scale(10),
        paddingHorizontal: Scale(30),
        borderTopLeftRadius: Scale(25),
        borderTopRightRadius: Scale(25),
        backgroundColor: Colors.WHITE,
    },
    headerText: {
        fontSize: Scale(20),
        color: Colors.WHITE
    },
    notificationStyle: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: 'contain',
        tintColor: Colors.WHITE,
        alignSelf: 'flex-end',
    },
    headerContainer: {        
        paddingTop:Scale(20),
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
