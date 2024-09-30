// // File: src/screens/SelectContactsScreen.js
// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { request, PERMISSIONS } from 'react-native-permissions';
// import { showContactPicker } from 'react-native-contact-picker';

// const SelectContactsScreen = ({ navigation }) => {
//     const [emergencyContacts, setEmergencyContacts] = useState([]);

//     const selectContacts = async () => {
//         try {
//             const permission = await request(PERMISSIONS.ANDROID.READ_CONTACTS);

//             if (permission === 'granted') {
//                 // Open the contact picker
//                 showContactPicker()
//                     .then(contact => {
//                         if (contact) {
//                             const newContacts = [...emergencyContacts, contact];
//                             setEmergencyContacts(newContacts);

//                             // Save contacts to AsyncStorage
//                             AsyncStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
//                         }
//                     })
//                     .catch(err => {
//                         console.warn('Error picking contact:', err);
//                     });
//             } else {
//                 console.warn('Contacts permission denied');
//             }
//         } catch (err) {
//             console.warn('Error requesting permissions:', err);
//         }
//     };

//     return (
//         <View>
//             <Button title="Select Emergency Contacts" onPress={selectContacts} />
//             {emergencyContacts.map((contact, index) => (
//                 <Text key={index}>{contact.displayName} {contact.phoneNumbers[0]?.number}</Text>
//             ))}
//             <Button 
//                 title="Go to Home" 
//                 onPress={() => navigation.navigate('Home')} 
//             />
//         </View>
//     );
// };

// export default SelectContactsScreen;
import React, { useState, useCallback } from 'react';
import { View, Button, Text, PermissionsAndroid, StyleSheet, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectContactsScreen({ navigation }) {
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const selectContacts = useCallback(async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contact permission granted');
        
        const contact = await Contacts.openContactPicker();
        console.log('Selected contact:', contact);

        if (contact) {
          const newContacts = [...emergencyContacts, contact];
          setEmergencyContacts(newContacts);

          // Save contacts to AsyncStorage
          await AsyncStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
        }
      } else {
        console.warn('Contacts permission denied');
        Alert.alert('Permission Denied', 'Please grant contacts permission to use this feature.');
      }
    } catch (err) {
      console.error('Error in selectContacts:', err);
      Alert.alert('Error', 'An error occurred while trying to select a contact.');
    }
  }, [emergencyContacts]);

  return (
    <View style={styles.container}>
      <Button title="Select Emergency Contacts" onPress={selectContacts} />
      {emergencyContacts.map(contact => (
        <Text key={contact.recordID} style={styles.contactText}>
          {contact.displayName} {contact.phoneNumbers[0]?.number}
        </Text>
      ))}
      <Button 
        title="Go to Home" 
        onPress={() => navigation.navigate('Home')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 16,
    marginVertical: 5,
  },
});