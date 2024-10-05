import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import the screens
import Login from './Screen/Login';
import Signup from './Screen/Signup';
import Home from './Screen/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">  {/* Set Login as the initial screen */}
        
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}   {/* Hide the header */}
        />

        {/* Signup Screen */}
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false }}   {/* Hide the header */}
        />

        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}   {/* Hide the header */}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
