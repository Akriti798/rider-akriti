import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PartnerEmailLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/partner.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>
        <Text style={{color: '#2F5BFF'}}>Login </Text>
        <Text style={{color: '#111'}}>to your account</Text>
      </Text>
      <Text style={styles.subHeading}>it's great to see you again</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email Address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.forgotRow}>
        <Text style={styles.forgotText}>Forgot your password ? </Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset Your Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.orRow}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Mobile Login Button */}
<TouchableOpacity
  style={styles.darkButton}
  onPress={() => navigation.navigate('PartnerLogin')}  // Add this
>
  <Text style={styles.darkButtonText}>Login with Mobile Number</Text>
</TouchableOpacity>

      {/* Create Account Button */}
<TouchableOpacity
  style={styles.darkButton}
  onPress={() => navigation.navigate('PartnerRegister' as never)}>
  <Text style={styles.darkButtonText}>Create a New Account</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

export default PartnerEmailLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  subHeading: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  label: {
    fontWeight: '700',
    marginBottom: 5,
    marginTop: -10,
    color: '#111',
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666',
    paddingHorizontal: 15,
    shadowColor: '#000',
    marginBottom: 20,
    marginTop: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,

  },
  forgotText: {
    fontSize: 13,
    color: '#555',
  },
  resetText: {
    fontSize: 13,
    color: '#FF8C32',
    fontWeight: '700',
  },
  loginButton: {
    marginTop: 20,
    height: 55,
    backgroundColor: '#2F5BFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  // OR Divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },

  // Dark Buttons
  darkButton: {
    height: 55,
    backgroundColor: '#111',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});