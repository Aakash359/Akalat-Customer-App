import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors,Scale,} from '../../CommonConfig';
function Past() {
  return (
    <View style={styles.container}>
      <Text>Past Screen</Text>
    </View>
  );
}
export default Past;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:Scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});
