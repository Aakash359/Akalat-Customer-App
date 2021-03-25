import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import Accordion from '../../Component/Accordion';
import { useNavigation } from '@react-navigation/native';
function FAQs() {
  const { navigate } = useNavigation();
    const navigation = useNavigation();
    const redirectToPlaceOrder = () => {
        navigate('PlaceOrder');
    };
    const [menu, setMenu] = React.useState([
        {
          title: 'What is VIP?',
          data: [
            {
              key:
                'VIP is a personal safety system designed to summon help when you need it. ',
            },
          ],
        },
        {
          title: 'Is VIP a free service?',
          data: [
            {
              key: 'No. VIP is a subscription service, offered at a modest fee.',
            },
          ],
        },
        {
          title: ' How does VIP work?',
          data: [
            {
              key:
                'VIP allows you to select up to three (3) Guardians to monitor your safety?',
            },
          ],
        },
        {
          title: 'Do Guardians have to pay?',
          data: [
            {
              key:
                ' No. The subscribed member is the only person with an account. The Guardians are only notified in case of an emergency. ',
            },
          ],
        },
        {
          title: 'What are VIP’s key features?',
          data: [
            {
              key:
                'The key features are:\n(1) VIP has an Unsafe button for when you feel unsafe.\n(2) VIP has an SOS button to summon immediate help in time of trouble.\n(3) VIP has a tracking system that gives your Guardian or 911 your exact location.\n(4) In case you or your loved one is abducted or kidnapped, VIP has a tracing system that tracks your whereabouts.\n(5) When you press the Unsafe button an audio recorder is activated.\n(6) When you press the SOS button the video camera is activated.',
            },
          ],
        },
        {
          title: 'How does my Guardian know the call is an emergency?',
          data: [
            {
              key: 'VIP sends an unusual ringtone to the Guardians cell phone.',
            },
          ],
        },
        {
          title: 'What if my Guardian(s) does not respond? ',
          data: [
            {
              key:
                'VIP automatically contacts each of your assigned Guardians. If, after 20 seconds, the Guardian does not respond the system contacts 911.',
            },
          ],
        },
        
        {
            title: 'What if my Guardian(s) does not respond? ',
            data: [
              {
                key:
                  'VIP automatically contacts each of your assigned Guardians. If, after 20 seconds, the Guardian does not respond the system contacts 911.',
              },
            ],
          },
          
        {
            title: 'What if my Guardian(s) does not respond? ',
            data: [
              {
                key:
                  'VIP automatically contacts each of your assigned Guardians. If, after 20 seconds, the Guardian does not respond the system contacts 911.',
              },
            ],
          },
          
        {
            title: 'What if my Guardian(s) does not respond? ',
            data: [
              {
                key:
                  'VIP automatically contacts each of your assigned Guardians. If, after 20 seconds, the Guardian does not respond the system contacts 911.',
              },
            ],
          },
          
        {
            title: 'What if my Guardian(s) does not respond? ',
            data: [
              {
                key:
                  'VIP automatically contacts each of your assigned Guardians. If, after 20 seconds, the Guardian does not respond the system contacts 911.',
              },
            ],
          },
       
      ],);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
      <Icon onPress={() => navigation.goBack()} name="arrowleft" type="AntDesign" style={styles.logoStyle}/>              
       </View>
       <Text style={styles.headerText}>FAQs </Text>
     
        <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          data={menu}
          renderItem={({item}) => (<Accordion  item={item} />)}
          keyExtractor={(item, index) => index.toString()}
        />
        </ImageBackground>
    
    </View>
  );
}
export default FAQs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR
  },  
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal:Scale(15),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText:{
      fontSize:Scale(20),
      marginHorizontal:Scale(25),
      marginBottom:Scale(25),
      color:Colors.WHITE
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
      marginTop:Scale(15),
    fontSize:Scale(25),
    color:Colors.WHITE,
},
});
