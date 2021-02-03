import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors,Scale,} from '../../CommonConfig';
function Ready() {
  return (
    <View style={styles.container}>
      <Text>Ready Screen</Text>
    </View>
  );
}
export default Ready;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:Scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});
