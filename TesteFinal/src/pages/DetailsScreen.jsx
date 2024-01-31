import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function DetailsScreen({ route }) {
  const { bike } = route.params;
  const [isReserved, setIsReserved] = useState(bike.reserved);

  const handleReservation = async () => {
    try {
      if (!bike.reserved) {
        const existingBikesData = await AsyncStorage.getItem('bikes');
        console.log(existingBikesData);
        let reserves = existingBikesData ? JSON.parse(existingBikesData) : [];
  
        const existingBikeIndex = reserves.findIndex((item) => item.id === bike.id);
  
        if (existingBikeIndex !== -1) {
          console.log(existingBikesData);
          reserves[existingBikeIndex].reserved = true;
        } else {
          reserves.push({ id: bike.id, reserved: true });
        }
        
  
        await AsyncStorage.setItem('bikes', JSON.stringify(reserves));
  
        setIsReserved(true);
        console.log(`Bike with ID ${bike.id} is now reserved.`);
      } else {
        console.log(`Bike with ID ${bike.id} is already reserved.`);
      }
    } catch (error) {
      console.error('Error handling reservation:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>{`Brand: ${bike.brand}`}</Text>
      <Text>{`Model: ${bike.model}`}</Text>
      <Text>{`Type: ${bike.type}`}</Text>
      <Text>{`Latitude: ${bike.latitude}`}</Text>
      <Text>{`Longitude: ${bike.longitude}`}</Text>
      <Text>{`Reserved: ${isReserved ? 'Yes' : 'No'}`}</Text>

      {isReserved ? (
        <Text style={styles.reservationStatus}>This bike is currently reserved.</Text>
      ) : (
        <Button title="Reserve Bike" onPress={handleReservation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  reservationStatus: {
    color: 'red',
    marginTop: 10,
  },
});

export default DetailsScreen;
