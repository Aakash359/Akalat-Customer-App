import React, { Component } from 'react';
import {
    View,
    Text,
    I18nManager,
    ImageBackground,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import {
    SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import {
    ImagesPath,
    Colors,
    Scale,
    FIRST_LAUNCH,
    LOAD_PROPERTIES,
    LANGUAGE_CODE,
    LOAD_LOOKUPS,
} from '../../CommonConfig';
import { AuthStyle } from './AuthStyle';
import RNRestart from 'react-native-restart';
import { localize } from '../../Utils/Localization';


class SelectLanguage extends Component {
    constructor() {
        super();
        this.state = {
            languageCode: '1001',
        };
    }
    async onPressContinue(languageCode) {
        if (this.state.languageCode == '1002') {
            await AsyncStorage.setItem(LANGUAGE_CODE, '1002');
           
            localize.setLanguage('ar');
            this.setState({ languageCode: '1002' });
            if (!I18nManager.isRTL) {
                I18nManager.forceRTL(true);
            }
            RNRestart.Restart();
        }
        if (this.state.languageCode == 1001) {
            await AsyncStorage.setItem(LANGUAGE_CODE, '1001');
            
            localize.setLanguage('en');
            this.setState({ languageCode: '1001' });
            if (I18nManager.isRTL) {
                I18nManager.forceRTL(false);
            }
           
        }
        await AsyncStorage.multiSet([
            [FIRST_LAUNCH, JSON.stringify(false)],
            [LOAD_LOOKUPS, JSON.stringify(true)],
            [LOAD_PROPERTIES, JSON.stringify(true)],
        ]);
        this.props.navigation.navigate('SelectLoginSignup');

        
    }

    render() {
        return (
            <SafeAreaInsetsContext.Consumer>
                {(insets) => (
                    <View style={{ flex: 1 ,}}>
                        <StatusBar translucent backgroundColor="transparent"
                        />
                        <ImageBackground source={ImagesPath.bg} style={{height:'100%',width:"100%",resizeMode:'stretch'}}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                }}>
                                <Text style={AuthStyle.languateHeaderText}>Select</Text>
                                <Text style={AuthStyle.languateHeaderText}>Language</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        AuthStyle.languageTouchable,
                                        {
                                            marginTop: Scale(35),
                                            backgroundColor: Colors.WHITE,
                                            borderWidth: 1,
                                            borderColor: Colors.BORDERCOLOR,
                                            borderRadius: Scale(10),
                                        },
                                    ]}
                                    onPress={() => this.setState({ languageCode: '1002' })}>
                                    <View style={{ flexDirection: 'row',marginLeft:Scale(6) }}>
                                        <Image source={ImagesPath.arabic}
                                        style={{height:Scale(23),width:Scale(33),marginRight:Scale(-5),resizeMode:'stretch'}} 
                                           />
                                        <Text style={AuthStyle.languageText}>Arabic</Text>
                                    </View>
                                    {this.state.languageCode == '1002' ? (
                                        <Image
                                            source={ImagesPath.check2x}
                                            style={{
                                                tintColor:Colors.DARK_RED,
                                                marginRight: Scale(5),
                                                width: Scale(20),
                                                height: Scale(20),
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    ) : null}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        AuthStyle.languageTouchable,
                                        {
                                            backgroundColor: Colors.WHITE,
                                            borderWidth: 1,
                                            borderColor: Colors.BORDERCOLOR,
                                            borderRadius: Scale(10),
                                        },
                                    ]}
                                    onPress={() => this.setState({ languageCode: '1001' })}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:Scale(6) }}>
                                        <Image source={ImagesPath.us}
                                         style={{height:Scale(33),width:Scale(32) ,marginRight:Scale(-5),resizeMode:'stretch'}} />
                                        <Text style={AuthStyle.languageText}>English</Text>
                                    </View>

                                    {this.state.languageCode == '1001' ? (
                                        <Image
                                            source={ImagesPath.check2x}
                                            style={{
                                                tintColor:Colors.DARK_RED,
                                                marginRight: Scale(5),
                                                width: Scale(20),
                                                height: Scale(20),
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    ) : null}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        borderRadius: Scale(20),
                                        width: '80%',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: Scale(45),                                        
                                        marginVertical: Scale(50),
                                        backgroundColor: "#F7A00D",
                                    }}
                                    activeOpacity={0.7}
                                    onPress={() => this.props.navigation.navigate('Step')}>
                                    <Text style={AuthStyle.buttonText}>Get Started</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}

export default SelectLanguage
