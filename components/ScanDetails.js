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
                // ...
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
                    { 'todo' }
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