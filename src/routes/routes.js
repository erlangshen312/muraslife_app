import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Auth from '../screens/auth/Auth';
import Dashboard from '../screens/dashboard/Dashboard';
import Details from '../screens/dashboard/Details';
import Find from '../screens/dashboard/Find';
import News from '../screens/news/News';
import NewsDetails from '../screens/news/NewsDetails';
import Profile from '../screens/profile/Profile';
import PostCreate from '../screens/profile/post/PostCreate';
import PostUpdate from '../screens/profile/post/PostUpdate';
import PostDetails from '../screens/profile/post/PostDetails';
import PostLists from '../screens/profile/post/PostLists';
import Settings from '../screens/profile/settings/Settings';
import Faq from '../screens/profile/settings/Faq';
import AboutApp from '../screens/profile/settings/AboutApp';
import Notification from '../screens/profile/notification/Notification';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { mlColors } from '../configs/config';
import { ProfileData } from '../screens/profile/ProfileData';

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

const DashboardStack = createStackNavigator();
const DashboardStackScreen = () => (
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

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
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

const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
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

function getTabBarVisible(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'Details':
      return false;
    case 'Find':
      return false;
    case 'Create':
      return false;
    case 'Auth':
      return false;
    case 'Sign in':
      return false;
    default:
      true;
  }
}

const TabStack = createBottomTabNavigator();
export const TabStackScreen = () => (
  <TabStack.Navigator
    tabBarOptions={{
      activeTintColor: mlColors.blue,
      inactiveTintColor: mlColors.note,
      tabStyle: {
        backgroundColor: mlColors.white,
        paddingBottom: 5,
        paddingTop: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }}
  >
    <TabStack.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={({ route }) => ({
        tabBarLabel: 'Главная',
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
        tabBarLabel: 'Профиль',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        ),
        tabBarVisible: getTabBarVisible(route),
      })}
    />
  </TabStack.Navigator>
);

export const RootStack = createStackNavigator();
