import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import ScanScreen from "../screens/ScanScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-map${focused ? "" : "-outline"}` : "md-map"
      }
    />
  )
};

MapStack.path = "";

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen
  },
  config
);

DiscoverStack.navigationOptions = {
  tabBarLabel: "Discover",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-compass" : "md-compass"}
    />
  )
};

DiscoverStack.path = "";

const ScanStack = createStackNavigator(
  {
    Scan: ScanScreen
  },
  config
);

ScanStack.navigationOptions = {
  tabBarLabel: "Scan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-barcode" : "md-barcode"}
    />
  )
};

ScanStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    MapStack,
    DiscoverStack,
    ScanStack
  },
  {
    initialRouteName: "DiscoverStack"
  }
);

tabNavigator.path = "";

export default tabNavigator;
