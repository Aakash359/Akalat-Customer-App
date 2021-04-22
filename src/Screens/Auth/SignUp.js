import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUpRequest } from '../../redux/actions';
import { Scale, Colors, ImagesPath,COUNTRY } from '../../CommonConfig';
import { localize } from '../../Utils/Localization';
import { FormInput, CustomButton, PasswordInput } from '../../Component';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { StackActions, CommonActions } from '@react-navigation/native';
import {withTranslation} from 'react-i18next'


export class SignUp extends Component {

    // const { navigate } = useNavigation();
    // const navigation = useNavigation();
    // const redirectToHome = () => {
    //     navigate('Address');
    // };
    
    state = {
    
        first_name : '',
        last_name : '',
        phone: this.props.route && this.props.route.params && this.props.route.params.phone,
        email : '',
        password:'',
        confirm_pass: '',
        signupLoader: false,
        checkBox : false,
        data: [
          { id: 1, 
            image: ImagesPath.selectLanguage 
          }
        ],
      }

      componentDidUpdate(prevProps) {
        if(this.props.Auth && this.props.Auth.signupSuccess == true && this.props.Auth.signupResponse.status == 0 && this.state.signupLoader == true) {
          if(this.props.Auth != prevProps.Auth) {
            this.setState({
                signupLoader : false
            })
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
            );
            
            global.dropDownAlertRef && global.dropDownAlertRef.alertWithType('success', localize.SignupAlert.success, localize.SignupAlert.register);
          }
        }else if (this.props.Auth && this.props.Auth.signupSuccess == true && this.props.Auth.signupResponse.status == 1 && this.state.signupLoader == true)  {
          if(this.props.Auth != prevProps.Auth) {
            this.setState({
                signupLoader : false
            })
            global.dropDownAlertRef && global.dropDownAlertRef.alertWithType('error', "Error", this.props.Auth.signupResponse.message);
          }
        }else if (this.props.Auth && this.props.Auth.signupSuccess == false && this.state.signupLoader == true)  {
          if(this.props.Auth != prevProps.Auth) {
            this.setState({
                signupLoader : false
            })
            global.dropDownAlertRef && global.dropDownAlertRef.alertWithType('error', localize.SignupAlert.error, localize.SignupAlert.errorText);
          }
        }
      }

      onSubmit() {
        // const {
        //   navigation: {navigate},
        //   t,
        //    } = this.props
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.first_name == '') {
          alert(localize.SignupAlert.first_name)
        }
        else if(this.state.last_name == '') {
          alert(localize.SignupAlert.last_name)
        }
        else if(this.state.phone == '') {
          alert(localize.SignupAlert.number)
        }
        else if(this.state.email == '') {
          alert(localize.SignupAlert.email)
        }
        else if (reg.test(this.state.email) == false) {
          alert(localize.SignupAlert.emailValid)
        }
        else if(this.state.password == '') {
          alert(localize.SignupAlert.password)
        }
        else if(this.state.confirm_pass == '') {
            alert(localize.SignupAlert.confirm_pass)
        }
        else if (this.state.checkBox == false) {
          alert(localize.SignupAlert.terms)
        }else {
          let fromData = new FormData()
          fromData.append('country_code' , COUNTRY == "IN" ? "91" : "971")
          fromData.append('role_for_user' , 'user')
          fromData.append('phone' , this.state.first_name)
          fromData.append('email' , this.state.last_name)
          fromData.append('name' , this.state.phone)
          fromData.append('phone' , this.state.email)
          fromData.append('email' , this.state.password)
          this.setState({
            signupLoader : true
          })
          this.props.signUpRequest({
              data : fromData
          })
        }
      }
       
    render() {
        return (
        <ImageBackground source={ImagesPath.background} style={styles.imageBachgroundStyle}>
            <KeyboardAvoidingView style={styles.keyboardStyle} behavior={Platform.OS == 'android' ? '' : 'padding'}
                enabled>
                <ScrollView indicatorStyle={Colors.WHITE}>
                    <View style={styles.container}>
                        <Icon name="arrowleft" type="AntDesign" style={styles.logoStyle} onPress={() => navigation.goBack()} />
                        <Text style={styles.primaryText}>Signup</Text>
                        
                        <FormInput
                            placeholder="First Name"
                            autoCapitalize="none"
                            maxLength={30}
                            value={this.state.first_name}
                            onChangeText={(text) => this.setState({ first_name: text })}
                        />
                        <FormInput
                            placeholder="Last Name"
                            autoCapitalize="none"
                            maxLength={30}
                            value={this.state.last_name}
                            onChangeText={(text) => this.setState({ last_name: text })}
                        />
                        <View style={{marginTop:Scale(-5)}}> 
                         <PasswordInput
                            placeholder="Mobile Number"
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            maxLength={30}
                            value={this.state.phone}
                            onChangeText={(text) => this.setState({ phone: text })}
                        />
                        </View>
                        
                        <FormInput
                            placeholder="Email Address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            maxLength={30}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />

                        <FormInput
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <FormInput
                            placeholder="Confirm Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            maxLength={30}
                            value={this.state.confirm_pass}
                            onChangeText={(text) => this.setState({ confirm_pass: text })}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Scale(10),}}>
                          
                          <TouchableOpacity 
                          onPress = { ()=> this.setState({ checkBox : !this.state.checkBox }) }
                          activeOpacity = {0.7}
                          >
                        <Image source = {this.state.checkBox == true ? ImagesPath.check1: ImagesPath.uncheck}
                           style={{width:Scale(17),height:Scale(17),marginRight:Scale(5)}}/>
                           </TouchableOpacity>
                            <Text style={styles.forgotButton}>I accept <Text style={{ color: Colors.APPCOLOR }}>Privacy Policy</Text> and <Text style={{ color: Colors.APPCOLOR }}>Terms &{'\n'}Conditions </Text></Text>

                        </View>
                        <View style={{ marginTop: Scale(10) }}>
                            <CustomButton title="Signup" onSubmit={() => this.onSubmit()} isSecondary={true} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Scale(25),
        paddingTop: Scale(50),
    },
    imageBachgroundStyle: {
        height: '100%',
        width: '100%'
    },
    forgotButton: {
        marginTop: Scale(12),
        fontSize: Scale(16),
        marginLeft: Scale(15),
        color: Colors.BORDERCOLOR,
    },
    logoStyle: {
        fontSize: Scale(25),
        color: Colors.DARK_RED,
        height: Scale(20),
        width: Scale(45),
    },
    primaryText: {
        marginVertical: Scale(30),
        fontSize: Scale(30),
        fontWeight: 'bold',
        textAlign: 'left',
    },
    normalText: {
        fontSize: Scale(16),
        color: Colors.BLACK,
        textAlign: "left",
    },
});

// SignUp.propTypes = {
//   signupSuccess: func.isRequired,
//   navigation: shape({
//       dispatch: func.isRequired,
//       goBack: func.isRequired,
//   }).isRequired,
//   t: func.isRequired,
// }

// =============== REDUX CONNECT & RESPONSE ===============
const mapStateToProps = (res) => {
    return {
      Auth: res.AuthReducer,
      CommonReducer: res.CommonReducer
    };
  }
  export default connect(mapStateToProps, { signUpRequest })(SignUp);
