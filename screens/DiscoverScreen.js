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
  Right
} from "native-base";

export default function DiscoverScreen() {
  state = {
    discounts: [
      {
        uri:
          "https://tce-live2.s3.amazonaws.com/media/media/edce9657-3d08-4b7c-b369-aa52cc7f8d79.jpg",
        title: "Tomatoes",
        description: "Fresh tomatoes",
        distance: "0.98km",
        old_price: "40",
        new_price: "20"
      },
      {
        uri:
          "https://images.newscientist.com/wp-content/uploads/2019/01/31134057/gettyimages-86304874.jpg",
        title: "Bananas",
        description: "Fresh bananas",
        distance: "2.3km",
        old_price: "60",
        new_price: "10"
      },
      {
        uri:
          "http://2.bp.blogspot.com/-zrL0VD4W6og/UPham_76fZI/AAAAAAAAALg/IekKGx0vx6Q/s1600/Curly+Kale.JPG",
        title: "Kale",
        description: "Fresh kale",
        distance: "0.08km",
        old_price: "50",
        new_price: "20"
      },
      {
        uri:
          "http://www.theluxuryspot.com/wp-content/uploads/2014/11/Soy_milk.jpg",
        title: "Soy milk",
        description: "Soy milk",
        distance: "1.8km",
        old_price: "23",
        new_price: "20"
      }
    ]
  };

  return (
    <Container style={styles.container}>
      <Content>
        <List>
          {this.state.discounts.map((discount, i) => (
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
                <Text note>{discount.description}</Text>
              </Body>
              <Right>
                <Text>{`${discount.old_price}€ -> ${discount.new_price}€`}</Text>
                <Text>{discount.distance}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

DiscoverScreen.navigationOptions = {
  title: "Discover"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
