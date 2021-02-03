import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  ImagesPath,
  Colors,
  Scale,
} from '../CommonConfig';
function RightButton() {
  return <Image style={styles.image} source={ImagesPath.bell} resizeMode="stretch" />;
}

export default RightButton;

const styles = StyleSheet.create({
  image: {marginTop: 0, marginHorizontal: 10, height: Scale(30), width:Scale(30),tintColor:Colors.APPCOLOR},
});
