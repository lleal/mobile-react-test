import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ChatScreen from '../screens/ChatScreen';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Dashboard: DashboardScreen,
    ChatScreen: ChatScreen
  },
  {
    initialRouteParams: 'Home',
  }
);