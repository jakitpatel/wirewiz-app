import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, TextInput } from "react-native";

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {
        if (this.state.isLoggedIn) 
      return <Dashboard 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
      else 
        return <Login 
            onLoginPress={() => this.setState({isLoggedIn: true})}
          />;
    }
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
  },
  input: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  }
});

export default App;
