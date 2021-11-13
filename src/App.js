import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './store/store';
import { SplashScreen } from './components/SplashScreen';
import { TabStackScreen } from './routes/RootStack';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName="Dashboard">
        <TabStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
