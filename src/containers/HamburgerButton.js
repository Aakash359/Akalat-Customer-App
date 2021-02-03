import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {
  ImagesPath,
  Colors,
  Scale,
} from '../CommonConfig';
function HamburgerButton({}) {
  const navigation = useNavigation();
  const isDrawerOpen = useIsDrawerOpen();
  const handleDrawerOpen = () => {
    isDrawerOpen ? navigation.closeDrawer() : navigation.openDrawer();
  };
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleDrawerOpen}
        accessible={true}
        accessibilityLabel={'lawBooth lawyer'}
        accessibilityHint={'Double Tab to activate'}
        accessibilityTraits={'button'}
        accessibilityComponentType={'button'}>
        <Image
          style={styles.image}
          source={ImagesPath.menu}
          tintColor={Colors.BLACK}
        />
      </TouchableOpacity>
    </>  
  );
}

export default HamburgerButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: Scale(60),
  },
  image: {
    width: Scale(35),
    height: Scale(27),
    alignSelf: 'center',
  },
});
