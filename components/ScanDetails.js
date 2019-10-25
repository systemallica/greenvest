import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ScanDetails extends React.Component {
  


    constructor(props) {
        super(props);
        this.state = { ...props.scanProps };
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