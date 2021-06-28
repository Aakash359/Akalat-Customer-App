import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import { Scale,Colors } from '../CommonConfig';
import { Dropdown } from 'react-native-material-dropdown-v2';


const DropDown = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  errorValue,
  onBlur,
  onChangeText,
  dropDownData,
  value,
  ...props
}) => (
  <View>
    <View style={styles.heading}>
       <Dropdown
        rippleOpacity={0}
        animationDuration={0}
        dropdownPosition={0}
        containerStyle={styles.dropdown}
        pickerStyle={styles.dropdownOverLay}
        dropdownOffset={styles.margin}
        dropdownMargins={{ paddingTop: 10 }}
        inputContainerStyle={styles.container}
        onChangeText={onChangeText}
        placeholder={placeholder}
        itemCount={1}
        value={value}
        selectedItemColor={Colors.BLACK}
        overlayStyle={{ padding: 20, marginTop: 25 }}
        fontSize={20}
        placeholderTextColor={Colors.BORDERCOLOR}
        underlineColorAndroid="transparent"       
        data={dropDownData}
        underlineColor="transparent"
      />
      <Icon name="angle-down" type="FontAwesome" style={{ marginTop: Scale(12), marginRight: Scale(10), color: Colors.BORDERCOLOR }} />
    </View>
  </View>
);

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    textAlign: 'center',
    width: '95%',
    borderRadius: Scale(5),
    height: Scale(50),
    alignSelf: 'center',
    marginTop: Scale(-10),
    paddingRight: Scale(15),
    borderWidth: 0,
    borderColor: '#707070',
    
  },
  container: {
    alignContent: 'center',
    borderBottomWidth: 0,
  },
  margin: { top: 15 },
  dropdownOverLay: {
    width: '102%',
    height: 160,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  heading: {
    flexDirection: 'row',
    height: Scale(50),
    justifyContent: 'space-around',
    borderColor: '#707070',
    borderRadius: Scale(5),
    width: '55%',
    backgroundColor:'red',
    marginLeft:Scale(-10)
  },
  textStyle: {
    color: Colors.BORDERCOLOR,
    fontSize: Scale(14),
    marginBottom: Scale(10),
    marginTop: Scale(20),
  },
});
