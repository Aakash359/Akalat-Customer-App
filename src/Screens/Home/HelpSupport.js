import React, { useState,} from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import { CustomButton, FormInput,FormArea } from '../../Component';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { HelpRequest } from '../../redux/actions'

function HelpSupport(props) {
    
    const navigation = useNavigation();  
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const helpResponse = useSelector((state) => state.Setting);
    const [sub, setSub] = useState('');
    const [des, setdes] = useState('');
    const [loader,] = useState(false);

    const  onSubmit = () =>{
        if(sub == '') {
        alert("Please enter subject")
        }
        else if(des == '') {
          alert("Please enter description")
        }
        else
        {
            const data = { 
                'subject_for_support': sub,
                'description_for_support':des,
            }
                   
              navigate('MyAccount')
              dispatch(HelpRequest(data));
              alert("Submitted Sucessfully")
              
        }
      }

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
            <Text style={styles.headerText}>Help & Support </Text>
            <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
            <ScrollView indicatorStyle='white' style={{ paddingHorizontal: Scale(30)}}>
                <KeyboardAvoidingView behavior={Platform.OS == 'android' ? '' : 'padding'}
                    enabled>
                        <FormInput
                            placeholder="Subject"
                            autoCapitalize="none"
                            maxLength={30}
                            value={sub}
                            onChangeText={(text) => setSub(text )}
                        />
                       <FormArea
                            placeholder="Please tell us in detail..."
                            label="Description"
                            autoCapitalize="none"
                            maxLength={30}
                            value={des}
                            onChangeText={(text) => setdes(text )}
                        />
                        
                    
                        <View style={{marginTop:Scale(30),}}>
                        <CustomButton title="Submit" isSecondary={true} onSubmit={onSubmit}  />
                        </View>
                </KeyboardAvoidingView>
                
                </ScrollView>
            </ImageBackground>

        </View>
    );
}
export default HelpSupport;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR
    },
    textStyle: {
        color: Colors.BORDERCOLOR,
        fontSize: Scale(14),
        marginTop: Scale(10)
    },
    inputStyle: {
        color: Colors.BLACK,
        fontSize: Scale(16),
        marginBottom: Scale(15),
        fontWeight: 'bold'
    },
    loginInputCont: {
        flex: 1,
        paddingTop: Scale(10),
        paddingBottom: Scale(10),
        borderTopLeftRadius: Scale(25),
        borderTopRightRadius: Scale(25),
        backgroundColor: Colors.WHITE,
    },
    headerText: {
        fontSize: Scale(20),
        marginHorizontal: Scale(25),
        marginBottom: Scale(25),
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
