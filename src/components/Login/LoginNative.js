import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, TextInput } from "react-native";

const Link = props => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(
      styles.link,
      props.style
    )}
  />
);

class Login extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <TextInput
          placeholder='Username'
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
           label='Email'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          placeholder='Password'
          onChangeText={(password) => this.setState({ password })}
          label='Password'
          secureTextEntry={true}
          style={styles.input}
        />
        <Button onPress={this.props.onLoginPress} title="Login" />
      </View>
    );
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

export default Login;
