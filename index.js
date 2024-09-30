import { enableScreens } from 'react-native-screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { AppRegistry, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { name as appName } from './app.json';
import HomeScreen from './src/screens/HomeScreen.js';
import SelectContactsScreen from './src/screens/SelectContactsScreen.js';

enableScreens();
const Stack = createStackNavigator();
 
const App = () => {
    useEffect(() => {
        async function requestPermissions() {
            try {
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS);
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            } catch (err) {
                console.warn(err);
            }
        }
 
        requestPermissions();
    }, []);
 
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SelectContacts" component={SelectContactsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
 
AppRegistry.registerComponent(appName, () => App);