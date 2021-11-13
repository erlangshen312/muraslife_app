import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardStackScreen } from './DashboardRoutes';
import { ProfileStackScreen } from './ProfilesRoutes';
import { getTabBarVisible } from './config/naviFocusedRoutes';
import { stackNavigationOptions } from './config/stackNavigationOptions';
import Icon from '../../CustomIcon';

const TabStack = createBottomTabNavigator();
export const TabStackScreen = () => (
  <TabStack.Navigator tabBarOptions={stackNavigationOptions}>
    <TabStack.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon name="fi-br-home" color={color} size={size} />
        ),
        tabBarVisible: getTabBarVisible(route),
      })}
    />
    <TabStack.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon name="fi-br-user" color={color} size={size} />
        ),
        tabBarVisible: getTabBarVisible(route),
      })}
    />
  </TabStack.Navigator>
);
