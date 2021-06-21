import React, { useState,} from 'react'
import {
    Switch,
    Text,
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
} from 'react-native'
import { Icon } from 'native-base'
import {
    Colors,
    Scale,
    ImagesPath,
} from '../../CommonConfig'
import { CustomButton, FormInput } from '../../Component'
import { useNavigation , useRoute} from '@react-navigation/native'
import Slider from '@react-native-community/slider'
import {API_BASE} from '../../apiServices/ApiService'
import axios from 'axios'

function Filter({na}) {
    const [value, setValue] = useState()
    const [value1, setValue1] = useState()

    const { navigate } = useNavigation()
    const navigation = useNavigation()
    const route = useRoute(); 

    const redirectToHome = () => {
        route.params.onBack('rahul');
        navigate('Home')
    }
    const [isEnabled, setIsEnabled] = useState(true)

    const setCheckedSwitch = () => {
        setIsEnabled(!isEnabled)
    }

   

    const onFilter = async () => {
       
        const url = `${API_BASE}/restro/filter`
        const payload = {
            // 'distance': value1,
            'rating_from_user': value+"",
            'restaurent_type': 'veg_and_non_veg'
          }
        try 
          {
          const res = await axios.post(url, payload)
          route.params.onBack();
          navigate('Home')
          console.log("Aakash======>",res)
        
        } 
        catch (error) 
        {
          console.log('Error',error);  
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
                <Icon
                    onPress={() => navigation.goBack()}
                    name="arrowleft"
                    type="AntDesign"
                    style={styles.logoStyle}
                />
            </View>
            <Text style={styles.headerText}>Filters </Text>
            <ImageBackground
                source={ImagesPath.background}
                style={styles.loginInputCont}
            >
                <View
                    style={{
                        marginTop: Scale(20),
                        justifyContent: 'center',
                        height: Scale(100),
                        paddingVertical: Scale(20),
                        borderRadius: 10,
                        borderWidth: Scale(2),
                        width: '100%',
                        borderColor: Colors.LIGHT_GRAY,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: Scale(15),
                        }}
                    >
                        <Text>Distance</Text>
                        <Text
                            style={{
                                fontSize: Scale(14),
                                color: Colors.DARK_RED,
                            }}
                        >
                            {value1 + ' Miles'}
                        </Text>
                    </View>
                    <Slider
                        style={{ marginTop: Scale(20) }}
                        minimumValue={0}
                        maximumValue={10}
                        value={value1}
                        onValueChange={(value) => setValue1(value)}
                        thumbTintColor={Colors.APPCOLOR}
                        minimumTrackTintColor={Colors.APPCOLOR}
                        maximumTrackTintColor="#000000"
                    />
                </View>
                <View
                    style={{
                        marginTop: Scale(25),
                        justifyContent: 'center',
                        height: Scale(100),
                        paddingVertical: Scale(20),
                        borderRadius: 10,
                        borderWidth: Scale(2),
                        width: '100%',
                        borderColor: Colors.LIGHT_GRAY,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: Scale(15),
                        }}
                    >
                        <Text>Rating</Text>
                        <Text
                            style={{
                                fontSize: Scale(14),
                                color: Colors.DARK_RED,
                            }}
                        >
                            {value}
                        </Text>
                    </View>
                    <Slider
                        style={{ marginTop: Scale(20) }}
                        minimumValue={0}
                        maximumValue={10}
                        value={value}
                        onValueChange={(value) => setValue(value)}
                        thumbTintColor={Colors.APPCOLOR}
                        minimumTrackTintColor={Colors.APPCOLOR}
                        maximumTrackTintColor="#000000"
                    />
                </View>
                <View
                    style={{
                        marginTop: Scale(25),
                        justifyContent: 'center',
                        paddingVertical: Scale(15),
                        borderRadius: 10,
                        borderWidth: Scale(2),
                        width: '100%',
                        borderColor: Colors.LIGHT_GRAY,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: Scale(15),
                        }}
                    >
                        <Text>Veg only</Text>
                        <Switch
                            trackColor={{
                                false: Colors.GRAY,
                                true: Colors.RED,
                            }}
                            style={{
                                transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
                            }}
                            thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
                            ios_backgroundColor={Colors.GREEN}
                            onValueChange={setCheckedSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: 'flex-end',
                        flex: 1,
                        marginVertical: 30,
                    }}
                >
                    <View
                        style={{ marginTop: Scale(50), flexDirection: 'row' }}
                    >
                        <View style={{ flex: 1, marginRight: Scale(15) }}>
                            <CustomButton title="Reset All" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomButton
                                title="Apply"
                                isSecondary={true}
                                onSubmit={onFilter}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Filter
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APPCOLOR,
    },
    textStyle: {
        color: Colors.BORDERCOLOR,
        fontSize: Scale(14),
        marginTop: Scale(10),
    },
    inputStyle: {
        color: Colors.BLACK,
        fontSize: Scale(16),
        marginBottom: Scale(15),
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        marginHorizontal: Scale(25),
        marginBottom: Scale(25),
        color: Colors.WHITE,
    },
    notificationStyle: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: 'contain',
        tintColor: Colors.WHITE,
        alignSelf: 'flex-end',
    },
    headerContainer: {
        paddingTop: Scale(20),
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
})
