import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
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
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Get Location" onPress={userLocation} />
      </View>
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
  buttonContainer: {
    position: 'absolute', // Position the button over the map
    bottom: 20, // Adjust as needed to display properly
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
