import React from 'react';
import translator from "../stub/translator"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
} from 'native-base';

import { PieChart } from "react-native-chart-kit";

export default class ScanDetails extends React.Component {
  


    constructor(props) {
        super(props);

        let purchase;
        let details;

        const jsonString = props.scanProps.data;
        if (jsonString !== undefined) {
            try {
                purchase = JSON.parse(jsonString);
            } catch (err) {
                purchase = undefined;
            }
        }

        if (purchase !== undefined) {
            /*
            score = {};
            purchase_weight = purchase.items.reduce((accumulator, currentValue) => accumulator + currentValue.weight);
            console.log("purchase weight ",purchase_weight);
            // Products from abroad are supposed to have gone from Panama to Belgium (8808 km) which translates to 0.89 Kg of carbon footprint per product. 
            footprint_normalizer = Math.max.apply(Math, translator.category_translation.map(function(o) { return o.weight; }));
            // Packaging supposed to be 5 per cent
            footprint_normalizer += 0.05*Math.max.apply(Math, translator.packaging_translation.map(function(o) { return o.weight; }));
            footprint_normalizer += 0.89;
            console.log("normalizer ",footprint_normalizer);
            scores =[];
            total_score = 0;


            purchase.items.forEach(item => {
                prod_type = translator.category_translation.findIndex( categ => categ.category == item["category"] );
                prod_fp_w = translator[prod_type].weight;
                country = translator.country_translation.findIndex( categ => categ.category == item["country"] );
                ct_fp_w = translator[prod_type].weight;
                pkg = translator.packaging_translation.findIndex( categ => categ.category == item["packaging"] );
                pkg_fp_w = translator[prod_type].weight;
                item_score = (prod_fp_w + ct_fp_w + pkg_fp_w*0.05 )/(footprint_normalizer);
                console.log("item score ",item_score);
                total_score += item.weight*(prod_fp_w + ct_fp_w + pkg_fp_w*0.05 )/(purchase_weight*footprint_normalizer);
                console.log("total score ",total_score);
                scores.push(
                    {
                        "item": item.category,
                        "score": item_score
                    }
                );                
            });

            // Telenet score is the ecopoints multiplied by the amount of money you have spent
            telenet_points = total_score*purchase.total;
            //If carbon footprint is less than 2kg is considered a green product
            green_amount = scores.reduce((accumulator, currentValue) => if(currentValue.score<2.0){accumulator + 1},else{accumulator + 0});
            console.log("green amount ",green_amount);
            //purchase_weight = scores.reduce((accumulator, currentValue) => if(currentValue.score<2.0){accumulator + currentValue.weight},else{accumulator + 0});
            //If carbon footprint is less than 7kg is considered a orange product
            yellow_amount = scores.reduce((accumulator, currentValue) => if(currentValue.score<7.0){accumulator + currentValue.weight},else{accumulator + 0});
            console.log("yellow amount ",yellow_amount);
            //If carbon footprint is more than 7kg is considered a red product
            red_amount = scores.reduce((accumulator, currentValue) => if(currentValue.score<=7.0){accumulator + currentValue.weight},else{accumulator + 0});
            console.log("red amount ",red_amount);
            details = {
                greenScore: total_score,
                amount: purchase.total,
                telenetScore: telenet_points,
                categories: {
                    green: green_amount,
                    yellow: yellow_amount,
                    red: red_amount,
                }
            }
            */
            details = {
                greenScore: 70,
                amount: 20.8,
                telenetScore: 220,
                categories: {
                    green: 10,
                    yellow: 20,
                    red: 1,
                }
            };
        }

        const pieChartData = [
            {
                name: "  < 2kg",
                amount: details.categories.green,
                color: '#00FF00',
                legendFontColor: "#000000",
                legendFontSize: 15
            },
            {
                name: "  2 - 7 kg",
                amount: details.categories.yellow,
                color: '#FFFF00',
                legendFontColor: "#000000",
                legendFontSize: 15
            },
            {
                name: "  > 7kg",
                amount: details.categories.red,
                color: '#FF0000',
                legendFontColor: "#000000",
                legendFontSize: 15
            },

        ];

        const chartConfig = {
            backgroundGradientFrom: 'transparent',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: 'transparent',
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage:0.5
          }

        this.state = {
            purchase,
            details,
            chartConfig,
            pieChartData,
        };
    }


    render() {
        return (
            <Container style={this.styles.container}>
                <Content>
                    <Card>
                        <CardItem style={this.styles.cardItem}>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail square source={require("../assets/images/icon.png")} />
                                <Text style={{ marginTop: 5 }}>{this.state.details.greenScore}</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail square source={require("../assets/images/euro.png")} />
                                <Text style={{ marginTop: 5 }}>{this.state.details.amount}</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail
                                    square
                                    source={require("../assets/images/telenet.png")}
                                />
                                <Text style={{ marginTop: 5 }}>{this.state.details.telenetScore}</Text>
                            </View>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{display: 'flex', justifyContent: 'center'}}>
                            <PieChart
                                data={this.state.pieChartData}
                                width={Dimensions.get("window").width}
                                height={220}
                                accessor="amount"
                                backgroundColor="transparent"
                                chartConfig={this.state.chartConfig}
                            />
                        </CardItem>    
                    </Card>
                </Content>
            </Container>
        );
    }

    styles = StyleSheet.create({
        container: {
            
            marginTop: '10%',
        },
        cardItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardItemBadge: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
}