/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
// import App from 'react-native-ble-manager/example/App';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent('MyAwesomeApp', () => App);
