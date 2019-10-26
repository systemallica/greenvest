import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Text, Body, Container } from "native-base";
import purchases from "../stub/purchases";

export default function DashboardScreen() {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  const aggregatedPurchaseCategories = purchases.reduce((results, purchase) => {
    results.categories.green += purchase.categories.green;
    results.categories.red += purchase.categories.red;
    results.categories.yellow += purchase.categories.yellow;

    return results;
  });

  const purchaseCategoriesParsedForPiechart = [
    {
      name: "Green",
      value: aggregatedPurchaseCategories.categories.green,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Red",
      value: aggregatedPurchaseCategories.categories.red,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Yellow",
      value: aggregatedPurchaseCategories.categories.yellow,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <Container>
      <View>
        <Body>
          <Text>Bezier Line Chart</Text>
        </Body>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel={"$"}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 24,
            borderRadius: 16
          }}
        />
      </View>

      <View>
        <Body>
          <Text>Pie Chart</Text>
        </Body>
        <PieChart
          data={purchaseCategoriesParsedForPiechart}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </Container>
  );
}

DashboardScreen.navigationOptions = {
  title: "Dashboard"
};
