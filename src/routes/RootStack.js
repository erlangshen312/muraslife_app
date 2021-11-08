import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { DashboardStackScreen } from './DashboardRoutes';
import { ProfileStackScreen } from './ProfilesRoutes';
import { getTabBarVisible } from './config/naviFocusedRoutes';
import { stackNavigationOptions } from './config/stackNavigationOptions';

const TabStack = createBottomTabNavigator();
export const TabStackScreen = () => (
  <TabStack.Navigator tabBarOptions={stackNavigationOptions}>
    <TabStack.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon name="albums" color={color} size={size} />
        ),
        tabBarVisible: getTabBarVisible(route),
      })}
    />
    <TabStack.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        ),
        tabBarVisible: getTabBarVisible(route),
      })}
    />
  </TabStack.Navigator>
);
