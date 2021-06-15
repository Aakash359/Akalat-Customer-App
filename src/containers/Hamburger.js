//library imports
import React, {useState, useEffect} from 'react';
import {Container,} from 'native-base';
import {
  StyleSheet,  
  ScrollView,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import { Scale,Colors } from '../CommonConfig';


const Hamburger = (props) => {

  return (
    <Container style={styles.container}>      
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <DrawerItemList {...props} />        
      </ScrollView>
    </Container>
  );
};

export default Hamburger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  paddingVertical:Scale(30)
  },
  imageContainer: {
    flexDirection: 'row',
    paddingLeft: Scale(10),
    marginTop: Scale(15),
    marginBottom: Scale(25),
  },
  textStyle: {fontSize: Scale(18), color: Colors.WHITE, marginLeft: Scale(37)},
  
});
