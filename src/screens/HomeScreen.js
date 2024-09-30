// File: src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [emergencyContacts, setEmergencyContacts] = useState([]);

    useEffect(() => {
        // Fetch saved emergency contacts from AsyncStorage
        AsyncStorage.getItem('emergencyContacts').then(storedContacts => {
            if (storedContacts) {
                setEmergencyContacts(JSON.parse(storedContacts));
            }
        });
    }, []);

    return (
        <View>
            <Text>Welcome to the SOS App</Text>
            <Button
                title="Set Emergency Contacts"
                onPress={() => navigation.navigate('SelectContacts')}
            />
            <Text>Emergency Contacts:</Text>
            {emergencyContacts.length > 0 ? (
                emergencyContacts.map(contact => (
                    <Text key={contact.recordID}>{contact.displayName} - {contact.phoneNumbers[0]?.number}</Text>
                ))
            ) : (
                <Text>No emergency contacts set.</Text>
            )}
        </View>
    );
};

export default HomeScreen;
