import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import Homepage from './Homepage'; // Assuming you have a Homepage component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
