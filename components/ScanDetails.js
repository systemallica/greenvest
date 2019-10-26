import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
                    green: 10,
                    yellow: 2,
                    red: 10,
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