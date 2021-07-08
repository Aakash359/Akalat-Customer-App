// Libraries
import React from 'react';
import {StyleSheet} from 'react-native';

// Assets
// assets
import {
  screenWidth,
  screenHeight,
  ImagesPath,
  Colors,
  Fonts,
  Scale,
} from '../../CommonConfig';

export const homeStyle = StyleSheet.create({
  bottomViewCont: {
      
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    paddingHorizontal:Scale(25),
    paddingVertical:Scale(15),
    borderBottomWidth: 0,
  },
});
