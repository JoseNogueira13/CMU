import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';

function HomeScreen({ navigation }) {
  const [ads, setAds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
    loadFavorites();
  }, []);

  useEffect(() => {
    // Save favorites to AsyncStorage whenever it changes
    saveFavoritesToAsyncStorage();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = (ad) => {
    // Check if the ad is already in favorites
    const isFavorite = favorites.some((fav) => fav.id === ad.id);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== ad.id);
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, ad];
      setFavorites(updatedFavorites);
    }
  };

  const saveFavoritesToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const navigateToDetails = (ad) => {
    // Navigate to the DetailsScreen and pass the ad data as a parameter
    navigation.navigate('DetailsScreen', { ad });
  };

  const renderAdItem = ({ item }) => (
    <View style={styles.adContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{`Brand: ${item.brand}`}</Text>
      <Text>{`Model: ${item.model}`}</Text>
      <Text>{`Year: ${item.year}`}</Text>
      <Text>{`Price: ${item.price}`}</Text>
      <Text>{`City: ${item.city}`}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Text>{favorites.some((fav) => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <Text>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAdItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    adContainer: {
      width: '100%', // Set the width to 100% of the screen width
      paddingHorizontal: 16, // Add horizontal padding to create some space on the sides
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: '100%', // Set the width to 100% of the parent container
      aspectRatio: 16 / 9, // Maintain aspect ratio (adjust as needed)
      marginBottom: 10,
    },
  });
  

export default HomeScreen;
