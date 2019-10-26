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
  Thumbnail
} from "native-base";
import moment from "moment";

import purchases from "../stub/purchases";
import * as colors from '../constants/Colors';

export default function DashboardScreen() {
  const chartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 1) => `rgba(120, 188, 97, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#78BC61"
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

  aggregatedPurchase.greenScore /= purchases.length;
  aggregatedPurchase.greenScore = aggregatedPurchase.greenScore.toFixed(2);
  aggregatedPurchase.amount = aggregatedPurchase.amount.toFixed(2);
  aggregatedPurchase.telenetScore = aggregatedPurchase.telenetScore.toFixed(2);

  const purchaseCategoriesParsedForPiechart = [
    {
      name: "< 3.5kg",
      value: aggregatedPurchase.categories.green,
      color: '#44AA00',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: " 3.5kg - 7kg",
      value: aggregatedPurchase.categories.yellow,
      color: '#E5E059',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "> 7kg",
      value: aggregatedPurchase.categories.red,
      color: "#BB4430",
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
              <Thumbnail large square source={require("../assets/images/icon.png")} />
              <Text style={{ marginTop: 5 }}>
                {aggregatedPurchase.greenScore}%
              </Text>
            </View>
            <View style={this.styles.cardItemBadge}>
              <Thumbnail large square source={require("../assets/images/euro.png")} />
              <Text style={{ marginTop: 5 }}>{aggregatedPurchase.amount}€</Text>
            </View>
            <View style={this.styles.cardItemBadge}>
              <Thumbnail
                large
                square
                source={require("../assets/images/eco-points.png")}
              />
              <Text style={{ marginTop: 5 }}>
                {aggregatedPurchase.telenetScore}
              </Text>
            </View>
          </CardItem>
        </Card>

        <Card>
          <Body>
            <Text>GreenScore per purchase</Text>
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
