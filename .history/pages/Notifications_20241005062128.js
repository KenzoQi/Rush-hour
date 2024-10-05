import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Notifications() {
  // Sample notifications data
  const notifications = [
    { id: '1', title: 'Welcome to the app!' },
    { id: '2', title: 'Your location has been updated.' },
    { id: '3', title: 'New features available. Check the settings.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  notification: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  notificationText: {
    fontSize: 16,
  },
});
