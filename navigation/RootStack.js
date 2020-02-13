import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Dashboard: DashboardScreen,
  },
  {
    initialRouteParams: 'Home',
  }
);