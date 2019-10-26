import React from "react";
import { Dimensions } from "react-native";
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
      name: "Green",
      value: aggregatedPurchase.categories.green,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Red",
      value: aggregatedPurchase.categories.red,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Yellow",
      value: aggregatedPurchase.categories.yellow,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const purchaseGreenScores = [];
  const purchaseDates = [];

  for (purchase of purchases) {
    purchaseGreenScores.push(purchase.greenScore);
    purchaseDates.push(moment(purchase.date).format("DD/MM"));
  }

  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={require("../assets/images/icon.png")} />
              <Text>{aggregatedPurchase.greenScore}</Text>
            </Left>
            <Body>
              <Thumbnail square source={require("../assets/images/euro.png")} />
              <Text>{aggregatedPurchase.amount}</Text>
            </Body>
            <Right>
              <Thumbnail
                square
                source={require("../assets/images/telenet.png")}
              />
              <Text>{aggregatedPurchase.telenetScore}</Text>
            </Right>
          </CardItem>
        </Card>

        <Card>
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
            bezier
          />
        </Card>

        <Card>
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
