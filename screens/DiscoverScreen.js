import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  View
} from "native-base";

import discounts from "../stub/discounts";

export default function DiscoverScreen() {
  return (
    <Container style={styles.container}>
      <Content>
        <List>
          {discounts.map((discount, i) => (
            <ListItem thumbnail key={i}>
              <Left>
                <Thumbnail
                  circle
                  source={{
                    uri: discount.uri
                  }}
                />
              </Left>
              <Body>
                <Text>{discount.title}</Text>
                <Text>{discount.shop}</Text>
                <Text note>{discount.description}</Text>
              </Body>
              <Right>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{ color: "#BB4430", textDecorationLine: "line-through" }}
                  >{`${discount.old_price}€ `}</Text>
                  <Text> -> </Text>
                  <Text
                    style={{ color: "#44AA00" }}
                  >{`${discount.new_price}€`}</Text>
                </View>
                <Text>{discount.distance} away</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

DiscoverScreen.navigationOptions = {
  title: "Discover discounts"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
