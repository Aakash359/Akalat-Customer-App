import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    FlatList,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { setIntroComplete } from '../../redux/actions/AuthActions'

import {
    screenWidth,
    screenHeight,
    ImagesPath,
    Colors,
    Scale,
    Fonts,
} from '../../CommonConfig';
import {connect} from 'react-redux'
import { AuthStyle } from './AuthStyle';
import { localize } from '../../Utils/Localization';
import { CustomButton } from '../../Component';
export class Step2 extends Component {
    state = {
        data: [
            { id: 1, image: ImagesPath.loginBg },
            { id: 2, image: ImagesPath.loginBg1 },
            { id: 3, image: ImagesPath.loginBg2 },
        ],
    };
    renderItem = ({ item, index }) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image resizeMode='stretch' source={item.image} style={{ width: screenWidth, flex: 1 }} />
            </View>
        );
    };
    onViewableItemsChanged = ({ viewableItems, changed }) => {
        
        this.setState({
            selectedIndex: viewableItems[0].index,
        });
        
    };

    onPressSubmit() {
        this.props.navigation.navigate('SelectLoginSignUp')
    }
    render() {
        return (
            <SafeAreaInsetsContext.Consumer>
                {(insets) => (
                    <KeyboardAvoidingView
                        style={AuthStyle.keyboardAware}
                        behavior={Platform.OS == 'android' ? '' : 'padding'}
                        enabled>
                        <ScrollView
                            bounces={false}
                            keyboardShouldPersistTaps={'handled'}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <FlatList
                                    data={this.state.data}
                                    horizontal={true}
                                    renderItem={this.renderItem}
                                    pagingEnabled={true}
                                    onViewableItemsChanged={this.onViewableItemsChanged}
                                    viewabilityConfig={{
                                        itemVisiblePercentThreshold: 50,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    {this.state.data.map((data, index) => {
                                        return (
                                            <View style={[styles.dotStyle, {
                                                backgroundColor:
                                                    this.state.selectedIndex == index ? 'red' : 'white',
                                                marginLeft: index == 0 ? 0 : Scale(10),
                                            }]} />
                                        );
                                    })}
                                </View>
                            </View>
                            <ImageBackground source={ImagesPath.background} style={[AuthStyle.loginInputCont, { padding: Scale(25), }]}>
                                <Text style={styles.primaryText}>Step 3</Text>
                                <Text style={styles.normalText}>Deliver it hot</Text>
                                <CustomButton title="Get Started" onSubmit={() => {this.props.navigation.navigate('SelectLoginSignup')
                            this.props.setIntroComplete() }}isSecondary={true} />

                            </ImageBackground>
                        </ScrollView>
                    </KeyboardAvoidingView>
                )}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}


const mapStateToProps = ({Auth: {isIntro}}) => ({
   
    isIntro,
})
const mapDispatchToProps = {
    setIntroComplete
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Step2)

const styles = StyleSheet.create({
    container: { height: screenHeight / 1.5, alignItems: 'center' },
    mainContainer: { justifyContent: 'space-between', paddingBottom: Scale(10) },
    normalText: {
        alignSelf: 'center',
        fontSize: Scale(16),
        fontFamily: Fonts.Medium,
        marginTop: Scale(5),
        marginBottom: Scale(40),
        textAlign: 'center',
        width: '80%',
        color: Colors.GRAY,
    },
    dotStyle: {
        bottom: Scale(40),
        height: Scale(8),
        width: Scale(8),
        borderRadius: Scale(4),
    },
    primaryText: {
        textAlign: 'left',
        fontSize: Scale(24),
        fontWeight: 'bold',
        color: Colors.BLACK,
        fontFamily: Fonts.Light,
        textAlign: 'center',
        marginTop: Scale(35),
    },
})
