import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/dashboard/Dashboard';
import Details from '../screens/dashboard/Details';
import Find from '../screens/dashboard/Find';

const DashboardStack = createStackNavigator();
export const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
    <DashboardStack.Screen
      name="Details"
      component={Details}
      options={{
        headerTitle: false,
        animationEnabled: false,
      }}
    />
    <DashboardStack.Screen
      name="Find"
      component={Find}
      options={{
        headerTitle: false,
        animationEnabled: false,
      }}
    />
  </DashboardStack.Navigator>
);
