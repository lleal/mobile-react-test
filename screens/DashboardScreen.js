import React from 'react';
import { SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import NavigationService from '../services/NavigationService';
import SocketService from '../services/SocketService';

let DATA = [
  {
    username: '',
  }
];

export default function DashboardScreen() {
  const [selected, setSelected] = React.useState(new Map());
  SocketService.getSocket().on('user joined', (data) => {
    console.log(data.username + ' joined');
    console.log(data + ' joined');
    DATA.push({username : username})
  });
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <ListItem
            id={item.username}
            title={item.username}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});