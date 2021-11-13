import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../screens/profile/Profile';
import PostCreate from '../screens/profile/post/PostCreate';
import PostUpdate from '../screens/profile/post/PostUpdate';
import PostLists from '../screens/profile/post/PostLists';
import { ProfileData } from '../screens/profile/ProfileData';
import PostDetails from '../screens/profile/post/PostDetails';
import Settings from '../screens/profile/settings/Settings';
import Faq from '../screens/profile/settings/Faq';
import AboutApp from '../screens/profile/settings/AboutApp';
import Notification from '../screens/profile/notification/Notification';

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
    <ProfileStack.Screen
      name="Create"
      component={PostCreate}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="Update"
      component={PostUpdate}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="PostLists"
      component={PostLists}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="ProfileData"
      component={ProfileData}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="Details"
      component={PostDetails}
      options={{
        headerTitle: false,
        animationEnabled: false,
      }}
    />
    <ProfileStack.Screen
      name="Settings"
      component={Settings}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="Faq"
      component={Faq}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="App"
      component={AboutApp}
      options={{ animationEnabled: false }}
    />
    <ProfileStack.Screen
      name="Notification"
      component={Notification}
      options={{ animationEnabled: false }}
    />
  </ProfileStack.Navigator>
);
