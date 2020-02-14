import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

import SocketService from '../services/SocketService';
import { ListItem } from 'react-native-elements';

export default class ChatScreen extends Component{

  constructor(props) { 
    super(props);
    console.log(this.props.navigation.state.params); 
    this.state = {username : this.props.navigation.state.params.username, message : '', messageList : SocketService.getMessageList()};
    this.sendMessage = this.sendMessage.bind(this); 
     SocketService.getSocket().on('new message', (data) => {
        SocketService.addChatMessage(data);
        this.setState({messageList : SocketService.getMessageList()});
     }); 
  }

  sendMessage(){
    SocketService.sendMessage(this.state.username, this.state.message);
    this.setState({messageList : SocketService.getMessageList(), message : ''});
  } 

  render() { 
    return (
      <View>
        <FlatList
          data={this.state.messageList}
          renderItem={({ item, i }) => (
            <ListItem
              id={i}
              title={item.message}
              subtitle={item.username}
            />
          )}
          extraData={this.state}
        />
      <TextInput  
        style={styles.inpit}
        placeholder="Write Message..." 
        placeholderTextColor="#003f5c"
        value={this.state.message} 
        onChangeText={text => this.setState({message:text})}/>
      
      <TouchableOpacity onPress={this.sendMessage}>
        <Text>Send</Text>
      </TouchableOpacity>
      </View>
    ); 
  } 
}

const styles = StyleSheet.create({
  input: { height: 40, borderColor: 'gray', borderWidth: 1 },
});