import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';

export default function Homepage() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Current Location" />
        <TextInput style={styles.searchInput} placeholder="Where to?" />
      </View>

      {/* Bottom icons */}
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
    top: 40,
    left: 20,
    right: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 3, // shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // shadow for iOS
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  locationButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
});
