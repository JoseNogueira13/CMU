import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function DetailsScreen({ route }) {
  const { ad } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: ad.image }} style={styles.image} />
      <Text>{`Brand: ${ad.brand}`}</Text>
      <Text>{`Model: ${ad.model}`}</Text>
      <Text>{`Year: ${ad.year}`}</Text>
      <Text>{`Price: ${ad.price}`}</Text>
      <Text>{`City: ${ad.city}`}</Text>
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
    height: 200, // Adjust the height as needed
    marginBottom: 10,
  },
});

export default DetailsScreen;
