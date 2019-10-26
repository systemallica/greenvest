import React from 'react';
import translator from "../stub/translator";
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
    Button,
    Icon,
} from 'native-base';

import { GREEN, YELLOW, RED } from '../constants/Colors';

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
            
            score = {};
            console.log(purchase);
            purchase_weight = purchase.items.length;
            console.log("purchase weight ",purchase_weight);
            // Products from abroad are supposed to have gone from Panama to Belgium (8808 km) which translates to 0.89 Kg of carbon footprint per product. 
            footprint_normalizer = Math.max.apply(Math, translator.category_translation.map(function(o) { return o.weight; }));
            // Packaging supposed to be 5 per cent
            console.log("normalizer 1 ",footprint_normalizer);
            footprint_normalizer += 0.05*Math.max.apply(Math, translator.packaging_translation.map(function(o) { return o.weight; }));
            console.log("normalizer 2 ",footprint_normalizer);
            footprint_normalizer += 0.89;
            console.log("normalizer ",footprint_normalizer);
            scores =[];
            total_score = 0;

            purchase.items.forEach(item => {
                prod_fp_w = translator.category_translation.find(categ => categ.category == item["category"] ).weight;
                ct_fp_w = translator.country_translation.find(categ => categ.category == item["country"]);
                if (ct_fp_w !== undefined) {
                    ct_fp_w = ct_fp_w.weight;
                } else {
                    ct_fp_w = 0.89;
                }
                pkg_fp_w = translator.packaging_translation.find(categ => categ.category == item["packaging"]).weight;
                item_score = (prod_fp_w + ct_fp_w + pkg_fp_w*0.05 );
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

            //If carbon footprint is less than 2kg is considered a green product

            let green_amount = 0;
            let yellow_amount = 0;
            let red_amount = 0;

            scores.forEach(item => {
                if (item.score < 3.5) {
                    green_amount++;
                } else if (item.score < 7.0) {
                    yellow_amount++;
                } else {
                    red_amount++;
                }
            });

            const greenScore = (1 - total_score);
            // Telenet score is the ecopoints multiplied by the amount of money you have spent
            const telenetScore = purchase.total * greenScore;

            details = {
                greenScore: (greenScore * 100).toFixed(2),
                amount: purchase.total.toFixed(2),
                telenetScore: telenetScore.toFixed(2),
                categories: {
                    green: green_amount,
                    yellow: yellow_amount,
                    red: red_amount,
                },
            };

            console.log(details);
        }

        if (details !== undefined) {
            const pieChartData = [
                {
                    name: "  < 3.5kg",
                    amount: details.categories.green,
                    color: '#44AA00',
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "  3.5 - 7 kg",
                    amount: details.categories.yellow,
                    color: '#E5E059',
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "  > 7kg",
                    amount: details.categories.red,
                    color: '#BB4430',
                    legendFontColor: "#7F7F7F",
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
        } else {
            this.state = { error: true };
        }

        
    }

    handleClose() {
        this.props.closeCallback();
    }


    render() {
        return (
            <Container style={this.styles.container}>
                <Content>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: Dimensions.get('window').width - 20,
                    }}>
                        <Button iconLeft transparent onPress={ this.handleClose.bind(this) }>
                            <Icon name='close' />
                        </Button>
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 21,
                        marginTop: '5%',
                        marginBottom: '5%',
                    }}>
                        Purchase summary
                    </Text>
                    <Card>
                        <CardItem style={this.styles.cardItem}>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail large square source={require("../assets/images/icon.png")} />
                                <Text style={{ marginTop: 5 }}>{this.state.details.greenScore}%</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail large square source={require("../assets/images/euro.png")} />
                                <Text style={{ marginTop: 5 }}>{this.state.details.amount}€</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail
                                    square
                                    large
                                    source={require("../assets/images/eco-points.png")}
                                />
                                <Text style={{ marginTop: 5 }}>{this.state.details.telenetScore}</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{display: 'flex', justifyContent: 'center'}}>
                            <PieChart
                                data={this.state.pieChartData}
                                width={Dimensions.get("window").width}
                                height={220}
                                accessor="amount"
                                backgroundColor="transparent"
                                chartConfig={this.state.chartConfig}
                                absolute
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