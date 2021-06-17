import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground,KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Scale, Colors, ImagesPath } from '../../CommonConfig';
import { FormInput, CustomButton, PasswordInput, NumberInput } from '../../Component';
import { Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, loaderRequest, } from '../../redux/actions'
import { LoadWheel } from '../../CommonConfig/LoadWheel'

function CheckAuth(props) {
   
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const  user = useSelector((state) => state.Auth);

    
    
    useEffect(() => {
        
console.log("mytest")
        setTimeout(() => {
          checkdata()
        }, 10);
      }, 
      []); // here
     
      function checkdata(){
          console.log("user_data==>",user)
          if(!user.loginStatus){
//HOme
          navigation.navigate("Home")
          }else{
              //Login
              navigation.navigate("Login")
          }
      }
    

 

    return (
         <View>
             <Text>
                 App Loading
             </Text>
         </View>

    );
}


export default CheckAuth;
