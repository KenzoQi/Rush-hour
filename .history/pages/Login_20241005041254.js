import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const Login = () => {
  const navigation = useNavigation();

  const handleSignInPress = () => {
    console.log('Button Pressed');
    navigation.navigate('Home');  // Navigate to the Home screen on sign-in
  };

  const handleSignupPress = () => {
    console.log('Signup Button Pressed');
    navigation.navigate('Signup');  // Navigate to the Signup screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TDeO</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ex: jon.smith@email.com"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignInPress}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {/* "Or sign in with" Text */}
      <Text style={styles.orText}>or sign in with</Text>

      {/* Social Media Icons */}
      <View style={styles.socialIcon}>
        <View style={styles.iconBackground}>
          <Image source={require('../assets/Google.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconBackground}>
          <Image source={require('../assets/Facebook.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconBackground}>
          <Image source={require('../assets/Twitter.png')} style={styles.iconImage} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
  signInButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    marginTop: 20,
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  socialIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 30,
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
  footer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: 16,
    color: '#00FFFF',
    marginLeft: 5,
  },
});
