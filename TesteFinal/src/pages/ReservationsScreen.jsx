import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';

function ReservationsScreen() {
  const [reservedBikes, setReservedBikes] = useState([]);

  useEffect(() => {
    const fetchReservedBikes = async () => {
      try {
        const existingBikesData = await AsyncStorage.getItem('bikes');
        const reserves = existingBikesData ? JSON.parse(existingBikesData) : [];

        const reservedBikesFromApi = await api.get('/bikes');
        const filteredReservedBikes = reservedBikesFromApi.data.filter((bike) =>
          reserves.some((reservedBike) => reservedBike.id === bike.id && reservedBike.reserved)
        );

        setReservedBikes(filteredReservedBikes);
      } catch (error) {
        console.error('Error fetching reserved bikes:', error);
      }
    };

    fetchReservedBikes();
  }, []);

  const cancelReservation = async (bikeId) => {
    try {
      const existingBikesData = await AsyncStorage.getItem('bikes');
      const reserves = existingBikesData ? JSON.parse(existingBikesData) : [];

      const bikeIndex = reserves.findIndex((item) => item.id === bikeId);

      if (bikeIndex !== -1) {
        reserves[bikeIndex].reserved = false;

        await AsyncStorage.setItem('bikes', JSON.stringify(reserves));

        setReservedBikes((prevBikes) =>
          prevBikes.filter((reservedBike) => reservedBike.id !== bikeId)
        );
      }
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  const renderReservedBike = ({ item }) => (
    <View style={styles.reservedBikeContainer}>
      <Text>{`Brand: ${item.brand}`}</Text>
      <Text>{`Model: ${item.model}`}</Text>
      <Text>{`Type: ${item.type}`}</Text>
      <Text>{`Latitude: ${item.latitude}`}</Text>
      <Text>{`Longitude: ${item.longitude}`}</Text>

      <Button title="Cancel Reservation" onPress={() => cancelReservation(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {reservedBikes.length > 0 ? (
        <FlatList
          data={reservedBikes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReservedBike}
        />
      ) : (
        <Text>No reserved bikes.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  reservedBikeContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ReservationsScreen;
