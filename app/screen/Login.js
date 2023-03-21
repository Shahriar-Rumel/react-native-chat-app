import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import colors from '../config/colors';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join the Jedi Order: Login Now</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        autocomplete="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        autocomplete="none"
        secureTextEntry={true}
        textContentType="password"
        autoCorrect={false}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.loginButton}>Login</Text>
      <Text
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        Register for Jedi order
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1FDC6',
    paddingTop: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    letterSpacing: -1.0,
    fontWeight: 700,
    marginBottom: 12,
    color: '#38630E'
  },
  input: {
    backgroundColor: colors.bg,
    borderColor: colors.brand,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    width: '90%'
  },
  label: {
    textAlign: 'left',
    width: '90%',
    marginVertical: 14,
    fontSize: 16,
    letterSpacing: -0.5
  },
  loginButton: {
    width: '100%',
    marginTop: 14,
    backgroundColor: '#38630E',
    color: '#ffffff',
    width: '90%',
    textAlign: 'center',
    paddingVertical: 12,
    cursor: 'pointer',
    borderRadius: 7
  },
  registerButton: {
    marginTop: 14,
    paddingVertical: 12,
    textDecorationLine: 'underline'
  }
});
