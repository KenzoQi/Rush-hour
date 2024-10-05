import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Image, Modal, Text } from 'react-native';
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
  const [destinationText, setDestinationText] = useState(''); // State for "Where to" text
  const [showDirections, setShowDirections] = useState(false); // State to toggle visibility of search bar
  const [showNotifications, setShowNotifications] = useState(false); // State to show/hide notifications modal
  const [showSettings, setShowSettings] = useState(false); // State to show/hide settings modal

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

  const clearCurrentLocation = () => {
    setCurrentLocationText(''); // Clears the current location text
  };

  const clearDestination = () => {
    setDestinationText(''); // Clears the "Where to" text
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
          {/* Current Location TextInput with "X" button */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Location"
              value={currentLocationText} // Automatically updates with the current location
              onChangeText={setCurrentLocationText}
            />
            {currentLocationText !== '' && (
              <TouchableOpacity onPress={clearCurrentLocation} style={styles.clearButton}>
                <Image source={require('../assets/clear.png')} style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>

          {/* "Where to?" TextInput with "X" button */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Where to?"
              value={destinationText}
              onChangeText={setDestinationText}
            />
            {destinationText !== '' && (
              <TouchableOpacity onPress={clearDestination} style={styles.clearButton}>
                <Image source={require('../assets/clear.png')} style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Bottom white background and icons */}
      <View style={styles.bottomWhiteBackground}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/home.png')} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => setShowNotifications(true)}>
            <Image source={require('../assets/bell.png')} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => setShowSettings(true)}>
            <Image source={require('../assets/settings.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location button */}
      <TouchableOpacity style={styles.locationButton} onPress={userLocation}>
        <Image source={require('../assets/location.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {/* Notifications Modal */}
      <Modal transparent={true} visible={showNotifications} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text>This is a static notification modal.</Text>
            <TouchableOpacity onPress={() => setShowNotifications(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal transparent={true} visible={showSettings} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Text>This is a static settings modal.</Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingRight: 10, // Space for the "X" button
    elevation: 3, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Shadow for iOS
  },
  searchInput: {
    flex: 1, // Make TextInput take full width
    padding: 10,
    borderRadius: 20,
  },
  clearButton: {
    padding: 5, // Space around the "X" button
  },
  clearIcon: {
    width: 15, // Size of the "X" icon
    height: 15,
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
    width: 50, // Icon container size
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
    top: height * 0.00, // Moved the button higher
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    color: 'blue',
  },
});
