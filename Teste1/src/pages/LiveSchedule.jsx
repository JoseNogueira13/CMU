import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import api from '../../api/api';

function LiveSchedule() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();

    // Refresh routes every 5 minutes
    const intervalId = setInterval(fetchRoutes, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({item, index}) => (
    <View
      style={[
        styles.routeItem,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: index === 0 ? '#A63A50' : '#AB9B96'},
      ]}>
      <Text style={styles.routeTitle}>{item.name}</Text>
      <Text>{`Origin: ${item.origin}`}</Text>
      <Text>{`Destination: ${item.destination}`}</Text>
      <Text>{`Type: ${item.type}`}</Text>
      <Text>{`Next Departure: ${item.next_departure_time}`}</Text>
      <Text>{`Status: ${item.status}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A63A50" />
      <Text style={styles.title}>Next departures</Text>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A63A50',
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  routeItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  routeTitle: {
    color: '#F0E7D8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LiveSchedule;
