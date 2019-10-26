import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Left,
  Thumbnail
} from "native-base";
import moment from "moment";

import purchases from "../stub/purchases";

export default function DashboardScreen() {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  const aggregatedPurchase = purchases.reduce((results, purchase) => {
    results.categories.green += purchase.categories.green;
    results.categories.red += purchase.categories.red;
    results.categories.yellow += purchase.categories.yellow;
    results.greenScore += purchase.greenScore;
    results.telenetScore += purchase.telenetScore;
    results.amount += purchase.amount;

    return results;
  });

  const purchaseCategoriesParsedForPiechart = [
    {
      name: "< 2kg",
      value: aggregatedPurchase.categories.green,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: " 2kg - 7kg",
      value: aggregatedPurchase.categories.yellow,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "> 7kg",
      value: aggregatedPurchase.categories.red,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  let purchaseGreenScores = [];
  let purchaseDates = [];

  for (purchase of purchases) {
    purchaseGreenScores.push(purchase.greenScore);
    purchaseDates.push(moment(purchase.date).format("DD/MM"));
  }

  // Only take last four elements
  purchaseGreenScores = purchaseGreenScores.slice(
    purchaseGreenScores.length - 4
  );
  purchaseDates = purchaseDates.slice(purchaseDates.length - 4);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem style={this.styles.cardItem}>
            <View style={this.styles.cardItemBadge}>
              <Thumbnail square source={require("../assets/images/icon.png")} />
              <Text style={{ marginTop: 5 }}>
                {aggregatedPurchase.greenScore}
              </Text>
            </View>
            <View style={this.styles.cardItemBadge}>
              <Thumbnail square source={require("../assets/images/euro.png")} />
              <Text style={{ marginTop: 5 }}>{aggregatedPurchase.amount}</Text>
            </View>
            <View style={this.styles.cardItemBadge}>
              <Thumbnail
                square
                source={require("../assets/images/telenet.png")}
              />
              <Text style={{ marginTop: 5 }}>
                {aggregatedPurchase.telenetScore}
              </Text>
            </View>
          </CardItem>
        </Card>

        <Card>
          <Body>
            <Text>GreenScore over time</Text>
          </Body>
          <LineChart
            data={{
              labels: purchaseDates,
              datasets: [
                {
                  data: purchaseGreenScores
                }
              ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={chartConfig}
          />
        </Card>

        <Card>
          <Body>
            <Text>Purchases by category</Text>
          </Body>
          <PieChart
            data={purchaseCategoriesParsedForPiechart}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            absolute
          />
        </Card>
      </Content>
    </Container>
  );
}

DashboardScreen.navigationOptions = {
  title: "Dashboard"
};

styles = StyleSheet.create({
  cardItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardItemBadge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
