import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker} from 'react-native-maps';

 const MapScreen = ({ route }) => { 
    // const location = route.params.location;
    // const placeName = route.params.place;

  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} initialRegion={{
         latitude: location.latitude,
         longitude: location.longitude,
         latitudeDelta: 0.001,
         longitudeDelta: 0.006,
         }}>
            <Marker coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
              }} title={placeName}
            />
      </MapView> */}
      <Text>fddngdkkd</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // width: '100%',
    // height: '100%',
    flex: 1,
  },
});

export default MapScreen;