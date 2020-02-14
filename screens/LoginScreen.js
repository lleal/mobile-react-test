import React, { Component } from 'react';

import { AsyncStorage, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import NavigationService from '../services/NavigationService';

import SocketService from '../services/SocketService';

export default class LoginScreen extends Component {

	async checkIfLoggedIn (){
	try {
	    const value = await AsyncStorage.getItem('username');
	    if (value !== null) {
	      // We have data!!
	      NavigationService.navigate('Dashboard', {username : value});
	    }
	  } catch (error) {
	    // Error retrieving data
	  }

	}

	constructor(props) {
	  super(props);
	  this.state = {username : '', email: "", password: "", validEmail : false, validPassowrd: false};
	  this._onPressButton = this._onPressButton.bind(this); 
	}

	
	_onPressButton() {
		this.state.validEmail = this.state.email && this.validateEmail(this.state.email)
		this.state.validPassword = this.state.password && this.state.password.length > 7 && this.validatePassword(this.state.password)
		if (!SocketService.getUserList().includes(this.state.username) && this.state.username && this.state.validEmail && this.state.validPassword){
			console.log("Valid");
			SocketService.addUserName(this.state.username);
			AsyncStorage.setItem('username', this.state.username);
			NavigationService.navigate('Dashboard', {username : this.state.username});
		} else {
			console.log(this.state.validEmail);
			console.log(this.state.validPassword);
		}
	}

	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	validatePassword (password){
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        return re.test(String(password));
	}

  	render(){
	    return (
	      <View style={styles.container}>
	        <Text style={styles.logo}>HeyAPP</Text>
	        <View style={styles.inputView} >
	          <TextInput  
	            style={styles.inputText}
	            placeholder="Username..." 
	            placeholderTextColor="#003f5c"
	            value={this.state.username} 
	            onChangeText={text => this.setState({username:text})}/>
	        </View>
	        <View style={styles.inputView} >
	          <TextInput  
	            style={styles.inputText}
	            placeholder="Email..." 
	            placeholderTextColor="#003f5c"
	            value={this.state.email} 
	            onChangeText={text => this.setState({email:text})}/>
	        </View>
	        <View style={styles.inputView} >
	          <TextInput  
	            secureTextEntry
	            style={styles.inputText}
	            placeholder="Password..." 
	            placeholderTextColor="#003f5c"
	            value={this.state.password} 
	            onChangeText={text => this.setState({password:text})}/>
	        </View>
	        <TouchableOpacity style={styles.loginBtn} onPress={this._onPressButton}>
	          <Text style={styles.loginText}>LOGIN</Text>
	        </TouchableOpacity>
	        <TouchableOpacity>
	          <Text style={styles.loginText}>Signup</Text>
	        </TouchableOpacity>
	      </View>
	    );
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});