import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'native-base';
import {Scale, Colors} from '../CommonConfig';

const CustomButton = (props) => (
  <>
    <Button
      block
      style={[
        props.isSecondary ? styles.primaryButton : styles.secondaryButton,
        props?.btnStyle || {},
      ]}
      onPress={props.onSubmit}
      {...props}>
      <Text style={styles.secondaryText}>{props.title}</Text>
    </Button>
  </>
);

export default CustomButton;

const styles = StyleSheet.create({
  primaryButton: {
    marginVertical: Scale(25),
    borderRadius: Scale(20),
    justifyContent: 'center',
    backgroundColor: '#F7A00D',
    width: '100%',
    height: Scale(45),
    alignSelf: 'center',
  },

  secondaryButton: {
    marginVertical: Scale(25),
    borderRadius: Scale(20),
    justifyContent: 'center',
    backgroundColor: Colors.DARK_RED,
    width: '100%',
    height: Scale(45),
    alignSelf: 'center',
  },
  secondaryText: {
    //textTransform: 'uppercase',
    fontSize: Scale(14),
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
