// File: src/services/SOSService.js
import SendSMS from 'react-native-sms';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const sendSOS = () => {
    AsyncStorage.getItem('emergencyContacts').then(contacts => {
        if (contacts) {
            const emergencyContacts = JSON.parse(contacts);
            Geolocation.getCurrentPosition(info => {
                const message = `I am in danger! My location is: https://www.google.com/maps/?q=${info.coords.latitude},${info.coords.longitude}`;
                emergencyContacts.forEach(contact => {
                    SendSMS.send({
                        body: message,
                        recipients: [contact.phoneNumbers[0].number],
                        successTypes: ['sent', 'queued']
                    }, (completed, cancelled, error) => {
                        console.log('SMS Callback:', { completed, cancelled, error });
                    });
                });
            });
        }
    });
};