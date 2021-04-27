/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  // NativeEventEmitter,
  Button,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
} from 'react-native';

// import BleManager from 'react-native-ble-manager';
// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import {NativeEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import BluetoothStateManager from 'react-native-bluetooth-state-manager';
// import {BleManager} from 'react-native-ble-plx';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         HELLLO
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

class App extends Component {
  state = {
    peripherals: new Map(),
  };
  componentDidMount() {
    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );

    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );

    this.scanForDevices();

    BluetoothStateManager.requestToEnable().then(result => {
      // result === true -> user accepted to enable bluetooth
      // result === false -> user denied to enable bluetooth
    });
  }
  //   // BleManager.enableBluetooth()
  //   //   .then(() => {
  //   //     // Success code
  //   //     console.log('The bluetooth is already enabled or the user confirm');
  //   //   })
  //   //   .catch(error => {
  //   //     // Failure code
  //   //     console.log('The user refuse to enable bluetooth');
  //   //   })
  // });

  // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', args => {
  //   // The id: args.id
  //   // The name: args.name
  //   console.log(args);

  // this.setState({manager: new BleManager()});
  scanForDevices() {
    BleManager.scan([], 15);
  }

  handleDiscoverPeripheral = peripheral => {
    // const {peripherals} = this.state;
    // if (peripheral.name) {
    //   peripherals.set(peripheral.id, peripheral.name);
    // }
    // this.setState({peripherals});
    // console.log(peripheral);
  };

  handleStopScan = () => {
    BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
      // Success code
      peripheralsArray.forEach(ele => {
        console.log('each ', ele);
      });
      // console.log('Discovered peripherals: ' + peripheralsArray);
    });
    console.log('Scan is stopped. Devices: ', this.state.peripherals);
  };

  enableB = () => {
    BluetoothStateManager.enable().then(result => {
      // do something...
      console.log('Enabled');
    });
  };

  disableB = () => {
    BluetoothStateManager.disable().then(result => {
      // do something...
      console.log('Disabled');
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            BluetoothStateManager.enable().then(result => {
              // do something...
              console.log('Enabled');
            });
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            }}>
            ENABLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            BluetoothStateManager.disable().then(result => {
              // do something...
              console.log('Disabled');
            });
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            }}>
            DISABLE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // this.state.manager.startDeviceScan(null, null, (error, device) => {
            //   if (error) {
            //     // Handle error (scanning will be stopped automatically)
            //     console.log('err', error);
            //     return;
            //   }
            //   console.log('conn', device.name);
            //   // Check if it is a device you are looking for based on advertisement data
            //   // or other criteria.
            //   // if (device.name === 'TI BLE Sensor Tag' ||
            //   //     device.name === 'SensorTag') {

            //   //     // Stop scanning as it's not necessary if you are scanning for one device.
            //   //     manager.stopDeviceScan();

            //   //     // Proceed with connection.
            //   // }
            // });
            this.scanForDevices();
            // BleManager.scan([], 5, true).then(res => {
            //   // Success code
            //   console.log('Scan started');
            //   console.log(res);
            // });
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            }}>
            SCAN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            BleManager.createBond('65:4F:EB:09:39:1A')
              .then(() => {
                console.log(
                  'createBond success or there is already an existing one',
                );
              })
              .catch(() => {
                console.log('fail to bond');
              });
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            }}>
            CONNECTED
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
