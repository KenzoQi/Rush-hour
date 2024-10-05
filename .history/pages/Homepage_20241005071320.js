import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image, Modal, Text } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function Homepage() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [currentLocationText, setCurrentLocationText] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications modal
  const [showSettings, setShowSettings] = useState(false); // State for settings modal

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      const address = `${reverseGeocode[0].name}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`;
      setCurrentLocationText(address);
    } else {
      setCurrentLocationText('Location not found');
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  const toggleDirections = () => {
    setShowDirections(!showDirections);
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

      {/* Bottom Navigation Bar */}
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

      {/* Location Button */}
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
  container: { flex: 1 },
  map: { flex: 1 },
  bottomWhiteBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    zIndex: 1,
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
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  locationButton: {
    position: 'absolute',
    bottom: height * 0.2,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  directionsButton: {
    position: 'absolute',
    top: height * 0.00,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
    zIndex: 10,
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
