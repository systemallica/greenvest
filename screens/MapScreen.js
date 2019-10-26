import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Right } from "native-base";
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
            <Marker key={i} coordinate={shop.latlng} pinColor={shop.color}>
              <Callout>
                <View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={{ fontWeight: "bold" }}
                    >{`${shop.title}`}</Text>
                    <Right style={{ display: "flex", flexDirection: "row" }}>
                      {calculateScoreIcons(shop.score)}
                    </Right>
                  </View>
                  <Text>{shop.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

function calculateScoreIcons(score) {
  scoreItems = [];

  for (let i = 0; i < Math.max(Math.floor(score / 25), 1); i++) {
    scoreItems.push(
      <Text key={i}>
        <Image
          style={{
            height: 15,
            width: 15
          }}
          source={require("../assets/images/icon.png")}
        />
      </Text>
    );
  }

  return scoreItems;
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
  title: "Eco shops nearby"
};
