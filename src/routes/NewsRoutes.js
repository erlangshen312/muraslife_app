import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../screens/news/News';
import NewsDetails from '../screens/news/NewsDetails';

const NewsStack = createStackNavigator();
export const NewsStackScreen = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen
      name="News"
      component={News}
      options={{ animationEnabled: false }}
    />
    <NewsStack.Screen
      name="Details"
      component={NewsDetails}
      options={{ animationEnabled: false }}
    />
  </NewsStack.Navigator>
);
