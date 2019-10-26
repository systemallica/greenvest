import React from 'react';
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
            // calculate score
            details = {
                greenScore: 70,
                amount: 50.16,
                telenetScore: 7,
                categories: {
                    green: 8,
                    yellow: 2,
                    red: 9,
                }
            };
        }

        if (details !== undefined) {
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
                                <Text style={{ marginTop: 5 }}>{this.state.details.greenScore}</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail large square source={require("../assets/images/euro.png")} />
                                <Text style={{ marginTop: 5 }}>{this.state.details.amount}</Text>
                            </View>
                            <View style={this.styles.cardItemBadge}>
                                <Thumbnail
                                    square
                                    large
                                    source={require("../assets/images/telenet.png")}
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