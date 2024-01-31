import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Modal, Text } from 'react-native';
import api from '../../api/api';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, [selectedType]);

  const fetchBikes = async () => {
    try {
      const response = await api.get('/bikes');
      const filteredBikes = selectedType
        ? response.data.filter((bike) => bike.type === selectedType)
        : response.data;

      setBikes(filteredBikes);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  const navigateToDetails = (bike) => {
    navigation.navigate('Details', { bike });
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const applyFilter = (type) => {
    setSelectedType(type);
    closeFilterModal();
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text>Select Bike Type</Text>
          <Button title="Electric" onPress={() => applyFilter('Electric')} />
          <Button title="Mountain" onPress={() => applyFilter('Mountain')} />
          <Button title="Road" onPress={() => applyFilter('Road')} />
          <Button title="Clear Filter" onPress={() => applyFilter(null)} />
          <Button title="Close" onPress={closeFilterModal} />
        </View>
      </Modal>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.3486,
          longitude: -8.7478,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {bikes.map((bike) => (
          <Marker
            key={bike.id}
            coordinate={{
              latitude: bike.latitude,
              longitude: bike.longitude,
            }}
            title={`${bike.brand} ${bike.model}`}
            onPress={() => navigateToDetails(bike)}
            pinColor={bike.type === 'Electric' ? 'blue' : bike.type === 'Mountain' ? 'green' : 'red'}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
        <Text>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
  },
  map: {
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
