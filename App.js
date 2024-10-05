import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Notifications from './pages/Notifications'; // Import Notifications page
import Settings from './pages/Settings'; // Import Settings page

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
