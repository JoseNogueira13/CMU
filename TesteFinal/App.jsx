import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MapScreen from './src/pages/MapScreen';
import DetailsScreen from './src/pages/DetailsScreen';
import ReservationsScreen from './src/pages/ReservationsScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Reservations" component={ReservationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
