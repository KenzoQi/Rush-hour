import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state for button

  const handleLogin = () => {
    // Simple validation
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Simulate login process
    setIsLoading(true); // Show loading indicator
    setTimeout(() => {
      // Replace this with your actual login logic (API call, authentication, etc.)
      setIsLoading(false); // Hide loading indicator
      
      // Assume login is successful and navigate to the homepage
      navigation.reset({
        index: 0,
        routes: [{ name: 'Homepage' }],
      });
    }, 1500); // Simulating a network request delay (1.5 seconds)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
