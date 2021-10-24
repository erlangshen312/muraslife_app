import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthContext';
import SpashScreen from './components/Splash';
import { getToken, removeToken } from './utils/asyncStorage';
import { AuthStackScreen, TabStackScreen, RootStack } from './routes/routes';

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
      {!userToken ? (
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
        <RootStackScreen />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
