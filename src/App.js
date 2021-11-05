import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './store/store';
import SplashScreen from './components/SplashScreen';
import { TabStackScreen, RootStack } from './routes/routes';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const RootStackScreen = () => (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="App"
        component={TabStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName="Dashboard">
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
