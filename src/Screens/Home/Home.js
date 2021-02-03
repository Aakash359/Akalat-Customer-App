import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors,Scale,} from '../../CommonConfig';
function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:Scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});
