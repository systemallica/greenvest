import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-map${focused ? "" : "-outline"}` : "md-map"
      }
    />
  )
};

HomeStack.path = "";

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

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

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
    HomeStack,
    DiscoverStack,
    SettingsStack,
    ScanStack
  },
  {
    initialRouteName: "DiscoverStack"
  }
);

tabNavigator.path = "";

export default tabNavigator;
