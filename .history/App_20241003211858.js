import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    });
    return(    
    <View style={styles.container}>
    <MapView style={styles.map}
     region={mapRegion}
    >
    <Marker coordinate={mapRegion} title='Marker' />
    </MapView>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
