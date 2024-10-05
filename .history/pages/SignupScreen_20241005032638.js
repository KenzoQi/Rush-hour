import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const Signup = () => {
  const navigation = useNavigation();

  const handleSignupPress = () => {
    console.log('Signup Button Pressed');
    // Navigate to Homepage or Login after successful signup
    navigation.navigate('Homepage'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TDeO</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignupPress}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <Text style={styles.orText}>Or sign up with</Text>

      <View style={styles.socialIcon}>
        <View style={styles.iconBackground}>
          <Image source={require('./assets/Google.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconBackground}>
          <Image source={require('./assets/Facebook.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconBackground}>
          <Image source={require('./assets/Twitter.png')} style={styles.iconImage} />
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  input: {
    padding: 10,
    color: '#000000',
  },
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    marginTop: 30,
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  socialIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
  iconBackground: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginHorizontal: 10, 
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
