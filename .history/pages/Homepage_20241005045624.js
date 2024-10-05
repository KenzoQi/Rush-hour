import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function Homepage() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [currentLocationText, setCurrentLocationText] = useState(''); // State for current location text
  const [showDirections, setShowDirections] = useState(false); // State to toggle visibility of search bar

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    // Get human-readable address using reverse geocoding
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      const address = `${reverseGeocode[0].name}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`;
      setCurrentLocationText(address); // Update the "Current Location" TextInput with the address
    } else {
      setCurrentLocationText('Location not found');
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  const toggleDirections = () => {
    setShowDirections(!showDirections); // Toggle visibility of directions inputs
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>

      {/* Directions Button */}
      <TouchableOpacity style={styles.directionsButton} onPress={toggleDirections}>
        <Image source={require('../assets/directions.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {/* Conditionally render search bar if directions are shown */}
      {showDirections && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Current Location"
            value={currentLocationText} // Automatically updates with the current location
            onChangeText={setCurrentLocationText}
          />
          <TextInput style={styles.searchInput} placeholder="Where to?" />
        </View>
      )}

      {/* Bottom white background and icons */}
      <View style={styles.bottomWhiteBackground}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/home.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/bell.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/settings.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location button */}
      <TouchableOpacity style={styles.locationButton} onPress={userLocation}>
        <Image source={require('../assets/location.png')} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    searchContainer: {
      position: 'absolute',
      top: height * 0.07, // Adjusted to fit better on screen
      left: 20,
      right: 20,
      zIndex: 1, // Make sure it's above the map
    },
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 20,
      elevation: 3, // Shadow for Android
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4, // Shadow for iOS
    },
    bottomWhiteBackground: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.12, // Height of the white background at the bottom
      backgroundColor: '#fff', // Solid white background
      borderTopLeftRadius: 20, // Optional: to add rounded corners
      borderTopRightRadius: 20, // Optional: to add rounded corners
      elevation: 5, // Elevation to lift the bottom section
      zIndex: 1, // Ensure it’s above the map
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingTop: 10,
      paddingBottom: 10,
    },
    iconContainer: {
      width: 50,  // Icon container size
      height: 50,
      backgroundColor: '#fff', // White background for icons
      borderRadius: 25, // Rounded icon container
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    iconImage: {
      width: 25, // Adjusted icon size
      height: 25,
    },
    locationButton: {
      position: 'absolute',
      bottom: height * 0.2, // Moved the location button higher
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 25,
      padding: 10,
      elevation: 3,
    },
    directionsButton: {
      position: 'absolute',
      top: height * 0.01, // Moved the button higher
      left: 20,
      backgroundColor: '#fff',
      borderRadius: 25,
      padding: 10,
      elevation: 3,
      zIndex: 10, // Make sure it's on top
    },
    iconImage: {
      width: 25, // Adjusted size for direction button icon
      height: 25,
    },
  });
  