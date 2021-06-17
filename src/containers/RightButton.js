import React from 'react';
import {View,StyleSheet, Image,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ImagesPath,
  Colors,
  Scale,
} from '../CommonConfig';

function RightButton() {
  const { navigate } = useNavigation()  
  const redirectToNotification = () => {
    navigate('Notification');
};
  return (
    <TouchableOpacity onPress={redirectToNotification}>
     <Image style={styles.image} source={ImagesPath.bell} resizeMode='contain' />
     </TouchableOpacity>
  );
  
}

export default RightButton;

const styles = StyleSheet.create({
  image:{width: Scale(20),
  height: Scale(20),
  resizeMode: 'contain',
  tintColor: Colors.WHITE,
  marginRight:Scale(20)
  }
});
