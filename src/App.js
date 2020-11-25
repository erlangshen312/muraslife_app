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
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthContext} from './AuthContext';
import SpashScreen from './components/Splash';

import Auth from '../src/screens/auth/Auth';
import Dashboard from '../src/screens/dashboard/Dashboard';
import Details from '../src/screens/dashboard/Details';
import News from './screens/news/News';
import NewsDetails from './screens/news/NewsDetails';
import Shop from './screens/shop/Shop';
import Profile from '../src/screens/profile/Profile';
import PostCreate from './screens/profile/post/PostCreate';
import PostUpdate from './screens/profile/post/PostUpdate';
import PostDetails from './screens/profile/post/PostDetails';
import PostLists from './screens/profile/post/PostLists';
import Settings from './screens/profile/settings/Settings';
import Faq from './screens/profile/settings/Faq';
import AboutApp from './screens/profile/settings/AboutApp';

import {
    getAuthData,
    getToken,
    removeAuthData,
    removeToken,
    setToken,
} from './utils/asyncStorage';

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
            name="Create"
            component={PostCreate}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="Update"
            component={PostUpdate}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="PostLists"
            component={PostLists}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="Details"
            component={PostDetails}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="Settings"
            component={Settings}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="Faq"
            component={Faq}
            options={{animationEnabled: false}}
        />
        <ProfileStack.Screen
            name="App"
            component={AboutApp}
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

const ShopStack = createStackNavigator();
const ShopStackScreen = () => (
    <ShopStack.Navigator>
        <ShopStack.Screen
            name="Shop"
            component={Shop}
            options={{animationEnabled: false}}
        />
        {/* <ShopStack.Screen
      name="Details"
      component={ShopDetails}
      options={{animationEnabled: false}}
    /> */}
        {/* <ShopStack.Screen
      name="Checkout"
      component={ShopCheckout}
      options={{animationEnabled: false}}
    /> */}
    </ShopStack.Navigator>
);

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => (
    <TabStack.Navigator
        tabBarOptions={{
            // activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        }}>
        <TabStack.Screen
            name="Dashboard"
            component={DashboardStackScreen}
            options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({color, size}) => (
                    <Icon name="planet-outline" color={color} size={size}/>
                ),
            }}
        />
        <TabStack.Screen
            name="News"
            component={NewsStackScreen}
            options={{
                tabBarLabel: 'News',
                tabBarIcon: ({color, size}) => (
                    <Icon name="newspaper-outline" color={color} size={size}/>
                ),
            }}
        />
        <TabStack.Screen
            name="Shop"
            component={ShopStackScreen}
            options={{
                tabBarLabel: 'Shop',
                tabBarIcon: ({color, size}) => (
                    <Icon name="fast-food-outline" color={color} size={size}/>
                ),
            }}
        />
        <TabStack.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Icon name="person-outline" color={color} size={size}/>
                ),
            }}
        />
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
                // const authData = await removeAuthData();
                console.warn('remove', token);
                // console.warn('remove', authData);
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
        return <SpashScreen/>;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer initialRouteName="Dashboard">
                <RootStackScreen/>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
