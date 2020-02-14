import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import NavigationService from '../services/NavigationService';
import SocketService from '../services/SocketService';

export default class DashboardScreen extends Component{

  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params); 
    this.state = {username : this.props.navigation.state.params.username, userList : SocketService.getUserList()}
    SocketService.getSocket().on('user joined', (data) => {
      console.log(data.username + ' joined');
      console.log(data + ' joined');
      SocketService.getUserList().push({username : username, avatarurl: 'https://via.placeholder.com/150'});
      this.setState({userList : SocketService.getUserList()});
    });
    this.enterChatScreen = this.enterChatScreen.bind(this); 
  }

  enterChatScreen(){
    NavigationService.navigate('ChatScreen', {username : this.state.username})
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.enterChatScreen}>
          <Text>Enter Chat!</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.userList}
          renderItem={({ item, i }) => (
            <ListItem
              id={i}
              title={item.username}
              leftAvatar={{ source: { uri: item.avatarurl } }}
            />
          )}
          extraData={this.state}
        />
      </SafeAreaView>
    );
  }

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