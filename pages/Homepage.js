import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
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
  const [destinationText, setDestinationText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Locations list for suggestion
  const locationSuggestions = [
    'Cagayan de Oro City',
    'University of Science and Technology',
    'Ayala Centrio',
  ];

  // Mapping of locations to their coordinates
  const locationMapping = {
    'Cagayan de oro city': {
      latitude: 8.48222,
      longitude: 124.64722,
    },
    'University of Science and Technology': {
      latitude: 8.48591,
      longitude: 124.65667,
    },
    'Ayala Centrio': {
      latitude: 8.4790,
      longitude: 124.6451,
    },
  };
  const locationSuggestionsCurrent = [
    'Cagayan de Oro City',
    'University of Science and Technology',
    'Ayala Centrio',
  ];
  

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

  const clearCurrentLocation = () => {
    setCurrentLocationText('');
    setFilteredSuggestions([]);
  };

  const clearDestination = () => {
    setDestinationText('');
    setFilteredSuggestions([]);
  };

    const handleSearch = (text, setText, suggestions) => {
      setText(text);
      const location = locationMapping[text.toLowerCase()];
      if (location) {
        setMapRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    
      // Filter suggestions based on input
      const filtered = suggestions.filter((location) =>
        location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    };
    
  const selectSuggestion = (suggestion, setText) => {
    setText(suggestion);
    setFilteredSuggestions([]);
    handleSearch(suggestion, setText);
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
              placeholder={currentLocationText ? '' : 'Location'}
              value={currentLocationText}
              onChangeText={(text) => handleSearch(text, setCurrentLocationText, locationSuggestionsCurrent)}
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
              placeholder={destinationText ? '' : 'Where to?'}
              value={destinationText}
              onChangeText={(text) => handleSearch(text, setDestinationText)}
            />
            <TouchableOpacity onPress={() => handleSearch(destinationText, setDestinationText)} style={styles.searchButton}>
              <Image source={require('../assets/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
            {destinationText !== '' && (
              <TouchableOpacity onPress={clearDestination} style={styles.clearButton}>
                <Image source={require('../assets/clear.png')} style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>

          {/* Suggestions List */}
          {filteredSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectSuggestion(suggestion, setDestinationText)}
                  style={styles.suggestionItem}
                >
                  <Text>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    top: height * 0.07,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 15,
    height: 15,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  locationButton: {
    position: 'absolute',
    bottom: height * 0.14,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  directionsButton: {
    position: 'absolute',
    top: height * 0.00,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 10,
  },
});
