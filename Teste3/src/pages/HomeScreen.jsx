import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import api from '../../api/api';

const HomeScreen = ({ navigation }) => {
  const [bags, setBags] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBags = useCallback(async () => {
    try {
      const response = await api.get('/bags');
      // Sort bags by popularity_score in descending order
      const sortedBags = response.data.sort((a, b) => b.popularity_score - a.popularity_score);
      setBags(sortedBags);
    } catch (error) {
      console.error('Error fetching bags:', error);
    }
  }, []);

  useEffect(() => {
    fetchBags();
  }, [fetchBags]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBags();
    setRefreshing(false);
  };

  const navigateToDetails = (bag) => {
    navigation.navigate('DetailsScreen', { bag });
  };

  const renderBagItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.bagContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text>{`Brand: ${item.brand}`}</Text>
        <Text>{`Name: ${item.title}`}</Text>
        <Text>{`Price: ${item.price}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bags}
      keyExtractor={(item) => item.title.toString()}
      renderItem={renderBagItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  bagContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default HomeScreen;
