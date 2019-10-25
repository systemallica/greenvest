import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class GreenCamera extends React.Component {
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: BarCodeScanner.Constants.Type.back,
      scanned: false,
    };
  }

  handleScan(data) {
    if (!this.state.scanned) {
      this.props.scanCallback(data);
      this.setState({scanned: true});
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner style={{ flex: 1 }} type={this.state.type} onBarCodeScanned={ this.handleScan.bind(this) }>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
          </BarCodeScanner>
        </View>
      );
    }
  }
}