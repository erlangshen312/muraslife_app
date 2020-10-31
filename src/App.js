/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from './AuthContext';
import SpashScreen from './components/Splash';

import Auth from '../src/screens/auth/Auth';
import Login from '../src/screens/auth/Login';
import Registration from '../src/screens/auth/Registration';
import Dashboard from '../src/screens/dashboard/Dashboard';
import Details from '../src/screens/dashboard/Details';
import Profile from '../src/screens/profile/Profile';
import News from './screens/news/News';
import NewsDetails from './screens/news/NewsDetails';
import {getToken, removeToken, setToken} from './utils/asyncStorage';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
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
      options={{animationEnabled: false}}
    />
    <DashboardStack.Screen
      name="Details"
      component={Details}
      options={{
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
      options={{animationEnabled: false}}
    />
    <ProfileStack.Screen
      name="Login"
      component={Login}
      options={{animationEnabled: false}}
    />
    <ProfileStack.Screen
      name="Registration"
      component={Registration}
      options={{animationEnabled: false}}
    />
  </ProfileStack.Navigator>
);

const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen
      name="News"
      component={News}
      options={{animationEnabled: false}}
    />
    <NewsStack.Screen
      name="Details"
      component={NewsDetails}
      options={{animationEnabled: false}}
    />
  </NewsStack.Navigator>
);

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => (
  <TabStack.Navigator>
    <TabStack.Screen name="Dashboard" component={DashboardStackScreen} />
    <TabStack.Screen name="News" component={NewsStackScreen} />
    <TabStack.Screen name="Profile" component={ProfileStackScreen} />
  </TabStack.Navigator>
);

const RootStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState();

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        const token = await getToken();
        console.warn('signIn', token);
        setIsLoading(false);
        setUserToken(token);
      },
      signUp: async () => {
        const token = await getToken();
        console.warn('signUp', token);
        setIsLoading(false);
        setUserToken(token);
      },
      signOut: async () => {
        const token = await removeToken();
        console.warn('remove', token);
        setIsLoading(false);
        setUserToken(token);
      },
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      setUserToken(token);
    }
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Details') {
      return false;
    }

    return true;
  };

  const RootStackScreen = () => (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={TabStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );

  if (isLoading) {
    return <SpashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer initialRouteName="Dashboard">
        <RootStackScreen
          options={({route}) => ({
            tabBarVisible: getTabBarVisibility(route),
          })}
        />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
