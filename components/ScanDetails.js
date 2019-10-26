import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ScanDetails extends React.Component {
  


    constructor(props) {
        super(props);
        const purchase = this.parsePurchase(props.scanProps.data);
        const details = this.getDetails(purchase);
        this.state = {
            purchase,
            details,
        };
    }

    parsePurchase(jsonString) {
        if (jsonString !== undefined) {
            try {
                const details = JSON.parse(jsonString);
                return details;
            } catch (err) {
                return {};
            }
        } else {
            return {};
        }
    }

    parseDetails(purchase) {
        return undefined;
    }


    render() {
        return (
            <View style={this.styles.container}>
                <Text>
                    { this.state.data }
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