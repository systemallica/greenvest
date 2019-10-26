import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import translator from "../stub/translator"

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
            }
        }

        this.state = {
            purchase,
            details,
        };
    }


    render() {
        return (
            <View style={this.styles.container}>
                <Text>
                    { String(this.state.details) }
                </Text>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            marginTop: '10%',
        },
    });
}