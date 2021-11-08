import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '../screens/auth/Auth';

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Auth"
      component={Auth}
      options={{
        headerShown: false,
        title: 'Sign in',
      }}
    />
  </AuthStack.Navigator>
);
