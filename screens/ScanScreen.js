import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ScanDetails from '../components/ScanDetails';
import GreenCamera from '../components/GreenCamera';

import { NavigationEvents } from 'react-navigation';

export default class ScanScreen extends React.Component {

    state = {
        scanned: false,
        scanType: undefined,
        scanData: undefined,
    }

    onScanned({type, data}) {
        this.setState({scanType: type, scanData: data, scanned: true});
    }

    onClosed() {
        this.setState({ scanned: false });
    }

    onBlur(payload) {
        console.log('blur');
        this.setState({ scanned: false });
    }

    render() {
        <NavigationEvents
            onWillBlur={payload => this.onBlur(payload).bind(this) }
            onDidBlur={payload => this.onBlur(payload).bind(this) }
        />
        if (!this.state.scanned) {
            return (
                <View style={styles.upperContainer}>
                    <GreenCamera scanCallback={ this.onScanned.bind(this) } />
                </View>
            );
        } else {
            return (
                <ScanDetails
                    scanProps={{
                        type: this.state.scanType,
                        data: this.state.scanData,
                    }}
                    closeCallback={ this.onClosed.bind(this) }
                />
            )
        }
    }
}

ScanScreen.navigationOptions = {
    title: 'Scan a code',
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
});
