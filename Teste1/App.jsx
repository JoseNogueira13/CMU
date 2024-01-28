import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LiveSchedule from './src/pages/LiveSchedule';
import Stations from './src/pages/Stations';
import Tickets from './src/pages/Tickets';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Apply StatusBar settings */}
      <StatusBar backgroundColor="#A63A50" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Hide the header for all screens
          activeTintColor: '#A63A50',
          inactiveTintColor: '#AB9B96',
        }}>
        <Tab.Screen
          name="Live Schedule"
          component={LiveSchedule}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="alarm" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Stations"
          component={Stations}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bus-stop" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={Tickets}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="ticket-confirmation"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
