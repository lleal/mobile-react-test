import React from 'react';
import { SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import NavigationService from '../services/NavigationService';
import SocketService from '../services/SocketService';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    orderTitle: 'Primera Orden',
    offerTitle: 'Mi Oferta - 1'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    orderTitle: 'Segunda Orden',
    offerTitle: 'Mi Oferta - 2'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    orderTitle: 'Tercera Orden',
    offerTitle: 'Mi Oferta - 3'
  },
];

export default function DashboardScreen() {
  const [selected, setSelected] = React.useState(new Map());

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            title={item.offerTitle}
            subtitle={item.orderTitle}
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