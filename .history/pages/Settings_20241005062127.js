import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Settings() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleLocation = () => setLocationEnabled((previousState) => !previousState);
  const toggleNotifications = () => setNotificationsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Location</Text>
        <Switch
          value={locationEnabled}
          onValueChange={toggleLocation}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
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
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 18,
  },
});
