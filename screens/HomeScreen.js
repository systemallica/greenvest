import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default class App extends React.Component {
  state = {
    markers: [
      {
        latlng: {
          latitude: 50.8503396,
          longitude: 4.3517103
        },
        description: "Fresh vegetables and fruits",
        title: "Joe's shop",
        color: "yellow"
      },
      {
        latlng: {
          latitude: 50.8603396,
          longitude: 4.3517103
        },
        description: "All kind of bio products",
        title: "Bio greens",
        color:"green"
      },
      {
        latlng: {
          latitude: 50.8603396,
          longitude: 4.3617103
        },
        description: "Multinational supermarket",
        title: "Carrefour",
        color:"red"
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 50.8503396,
            longitude: 4.3517103,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={styles.mapStyle}
        >
          {this.state.markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              pinColor={marker.color}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

App.navigationOptions = {
  title: "Home"
};
