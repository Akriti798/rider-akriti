import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#0D8BFF" barStyle="light-content" />

      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/rider.png')}
          style={styles.riderImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.title}>
          Start delivering with{'\n'}Frookoon
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.code}>+91 |</Text>

<TextInput
  placeholder="Enter mobile number"
  keyboardType="phone-pad"
  value={mobile}
  onChangeText={setMobile}
  style={styles.input}
  maxLength={10}
  onFocus={() =>
    navigation.navigate(
      'PartnerLogin' as never,
      { mobile } as never,
    )
  }
/>
        </View>

<TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('PartnerLogin' as never)}
  >
    <Text style={styles.buttonText}>Continue</Text>
  </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D8BFF',
  },

  topSection: {
    flex: 0.68,
    justifyContent: 'center',
    alignItems: 'center',
  },

  riderImage: {
    width: 400,
    height: 490,
  },

  bottomCard: {
    flex: 0.32,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingBottom: 8,
  },

  code: {
    fontSize: 18,
    color: '#000',
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#3B5AFB',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});