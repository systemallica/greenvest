import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import shops from "../stub/shops";

export default class App extends React.Component {
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
          {shops.map((shop, i) => (
            <Marker
              key={i}
              coordinate={shop.latlng}
              title={`${shop.title} ${shop.score}%`}
              description={shop.description}
              pinColor={shop.color}
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
