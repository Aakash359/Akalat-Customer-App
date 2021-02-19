import React, { Component } from 'react';
import {
    View,
    Text,
    I18nManager,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    /**
     * Switch application language between English and Arabic(عربى) >>>>>
     * English 1001
     * Arabic 1002 عربى
     * >>> pass language code during api calling in header with language tag
     */
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
            // RNRestart.Restart();
        }
        await AsyncStorage.multiSet([
            [FIRST_LAUNCH, JSON.stringify(false)],
            [LOAD_LOOKUPS, JSON.stringify(true)],
            [LOAD_PROPERTIES, JSON.stringify(true)],
        ]);
        this.props.navigation.navigate('SelectLoginSignup');

        // Set first launch false for fetching countries when language code changed >>>>>
    }

    render() {
        return (
            <SafeAreaInsetsContext.Consumer>
                {(insets) => (
                    <View style={{ flex: 1 }}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={ImagesPath.arabic} />
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={ImagesPath.us} style={{height:Scale(30),width:Scale(40) ,resizeMode:'stretch'}} />
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

export default SelectLanguage;
