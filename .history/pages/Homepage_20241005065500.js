import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // Import Google Places Autocomplete

const { width, height } = Dimensions.get('window');

export default function Homepage() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [currentLocationText, setCurrentLocationText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [showDirections, setShowDirections] = useState(false);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
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
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>

      <TouchableOpacity style={styles.directionsButton} onPress={toggleDirections}>
        <Image source={require('../assets/directions.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {showDirections && (
        <View style={styles.searchContainer}>
          {/* Google Places Autocomplete for Location */}
          <GooglePlacesAutocomplete
            placeholder="Location"
            fetchDetails={true}
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              setMapRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              setCurrentLocationText(data.description);
            }}
            query={{
              key: 'YOUR_GOOGLE_PLACES_API_KEY', // Replace with your Google Places API Key
              language: 'en',
            }}
            styles={{
              textInput: styles.searchInput,
              container: { flex: 0 },
            }}
          />

          {/* Google Places Autocomplete for "Where to?" */}
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            fetchDetails={true}
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              setDestinationText(data.description);
              // You can add further logic for handling the destination here
            }}
            query={{
              key: 'YOUR_GOOGLE_PLACES_API_KEY',
              language: 'en',
            }}
            styles={{
              textInput: styles.searchInput,
              container: { flex: 0, marginTop: 10 },
            }}
          />
        </View>
      )}

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

      <TouchableOpacity style={styles.locationButton} onPress={userLocation}>
        <Image source={require('../assets/location.png')} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: height * 0.07,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
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
});
