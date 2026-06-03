import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PartnerLoginScreen = () => {
const route = useRoute();
const navigation = useNavigation();
const params = route.params as {mobile?: string} | undefined;

const [phone, setPhone] = useState(
  params?.mobile || '',
);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/partner.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>
        Welcome to{' '}
        <Text style={styles.blueText}>
          Frookoon Rider App
        </Text>
      </Text>

      <Text style={styles.subtitle}>
        it's great to see you again
      </Text>

      <Text style={styles.label}>
        Mobile Number
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.flag}>🇮🇳  </Text>

        <Text style={styles.code}>+91</Text>
        <View style={styles.separator} />

<TextInput
  style={styles.input}
  keyboardType="phone-pad"
  value={phone}
  maxLength={10}
  onChangeText={setPhone}
/>
      </View>

<TouchableOpacity
  style={styles.otpButton}
  onPress={() =>
    navigation.navigate(
      'OtpScreen' as never,
      {mobile: phone} as never,
    )
  }>
  <Text style={styles.otpText}>
    SEND OTP
  </Text>
</TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

<TouchableOpacity
  style={styles.blackButton}
  onPress={() =>
    navigation.navigate(
      'PartnerEmailLogin' as never
    )
  }>
  <Text style={styles.blackButtonText}>
    Login with Email-id & Password
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.blackButton}
  onPress={() => navigation.navigate('PartnerRegister' as never)}>
  <Text style={styles.blackButtonText}>Create a New Account</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

export default PartnerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  logo: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },


  welcome: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 25,
    color: '#111',
  },

  blueText: {
    color: '#2F5BFF',
  },

  subtitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 40,
  },

  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    backgroundColor: '#2F5BFF29',
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#9AA8FF',
  },

  flag: {
    fontSize: 20,
  },

  separator: {
    width: 1,
    height: 25,
    backgroundColor: '#999',
    marginHorizontal: 10,
  },

  code: {
    fontSize: 18,
    fontWeight: '600',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },

  otpButton: {
    marginTop: 35,
    backgroundColor: '#2F5BFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60,
    elevation: 5,
  },

  otpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 30,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#777',
  },

  orText: {
    marginHorizontal: 15,
    color: '#666',
  },

  blackButton: {
    height: 56,
    backgroundColor: '#000',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    elevation: 5,
  },

  blackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});