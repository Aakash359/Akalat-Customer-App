import React, {useState, useEffect} from 'react'
import { Text,Image, View, StyleSheet, StatusBar,FlatList, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Colors, Scale, ImagesPath } from '../../CommonConfig';
import Accordion from '../../Component/Accordion';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { setFcmToken,  } from '../../CommonConfig/HelperFunctions/AppHelper'

function Notification() {

  const { navigate } = useNavigation();
    const navigation = useNavigation();
    const [notification, setNotification] = useState({
      title: '',
      body: '',
      image: '',
    });
    const redirectToPlaceOrder = () => {
        navigate('PlaceOrder');
    };

    const getToken = async () => {
      const token = await messaging().getToken();
      setFcmToken(token)
     
    };

    useEffect(() => {
      getToken();
      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        setNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          image: remoteMessage.notification.android.imageUrl,
        });
      });
  
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
        setNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          image: remoteMessage.notification.android.imageUrl,
        });
      });
  
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              JSON.stringify(remoteMessage),
            );
            setNotification({
              title: remoteMessage.notification.title,
              body: remoteMessage.notification.body,
              image: remoteMessage.notification.android.imageUrl,
            });
          }
        });
    }, []);

    const renderItems = ({item, index}) => (
      <View >
      <Text>Firebase Messaging</Text>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`title: ${notification?.body}`}</Text>
      <Image source={{uri: notification?.image}} width={500} height={500} />
      </View>
    )
    
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
       <Text style={styles.headerText}>Notification </Text>
     
        <ImageBackground source={ImagesPath.background} style={styles.loginInputCont}>
         <FlatList
          data={[0,1,2,3]}
          renderItem={renderItems}
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <Text style={{alignSelf: 'center'}}>
                You don't have any notifications 
              </Text>
            )
          }}
        />
        </ImageBackground>
    
    </View>
  );
}
export default Notification;
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
