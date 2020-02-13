import React from 'react';
import { createAppContainer } from 'react-navigation';
import RootStack from './navigation/RootStack';
import NavigationService from './services/NavigationService';
import SocketService from './services/SocketService';

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
      <AppContainer 
        ref={navigatorRef => {
          SocketService.openServiceSocket();
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
  );
}