import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function Tickets() {
  return (
    <View style={styles.container}>
      {/* Image takes 1/3 of the screen */}
      <Image
        source={require('../../assets/undraw_In_progress_re_m1l6.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text takes 2/3 of the screen */}
      <Text style={styles.text}>Work in progress...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '33%', // 1/3 of the screen
  },
  text: {
    color: '#A63A50',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 16, // Adjust as needed
  },
});

export default Tickets;
