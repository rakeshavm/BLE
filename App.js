/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import RNBluetoothClassic, {
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

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
    // peripherals: new Map(),
  };
  componentDidMount() {
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
          onPress={async () => {
            try {
              let paired = await RNBluetoothClassic.getBondedDevices();

              // console.log('boat', paired[2]);
              let connection = await paired[2].connect();
              console.log('conn', connection);
              let connd = await RNBluetoothClassic.getConnectedDevices();
              console.log('connd', connd);
              // let iscon = await paired[2].isConnected();
              // console.log('iscon', iscon);
              // let wri = await paired[2].write('helllo');
              // console.log('wri', wri);
              // console.log('paired', paired);
            } catch (err) {
              // Error if Bluetooth is not enabled
              // Or there are any issues requesting paired devices
              console.log(err);
            }
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

        <TouchableOpacity onPress={async () => {}}>
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
