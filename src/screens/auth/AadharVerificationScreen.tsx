import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AadharVerificationScreen = () => {
  const navigation = useNavigation();

  const [aadhar, setAadhar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = () => {
    if (aadhar.length === 12) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
    }
  };

  const handleContinue = () => {
    if (otpVerified) {
      navigation.navigate('ChooseVehicle' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="chevron-left" size={26} color="#2F5BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aadhar Verification</Text>
      </View>

      <View style={styles.content}>

        {/* Aadhar Number */}
        <Text style={styles.fieldLabel}>Aadhar number</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your 12-digit Aadhar number"
            placeholderTextColor="#bbb"
            keyboardType="number-pad"
            value={aadhar}
            onChangeText={text => {
              setAadhar(text);
              if (otpSent) {
                setOtpSent(false);
                setOtpVerified(false);
                setOtp('');
              }
            }}
            maxLength={12}
            editable={!otpVerified}
          />
        </View>
        <Text style={styles.helperText}>
          Aadhar ID should be linked to your mobile number.
        </Text>

        {/* OTP Input — shown after Send OTP */}
        {otpSent && (
          <>
            <Text style={[styles.fieldLabel, {marginTop: 20}]}>Enter OTP</Text>
            <View style={[
              styles.inputBox,
              otpVerified && styles.inputBoxVerified,
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#bbb"
                keyboardType="number-pad"
                value={otp}
                onChangeText={text => {
                  setOtp(text);
                  if (otpVerified) setOtpVerified(false);
                }}
                maxLength={6}
                editable={!otpVerified}
              />
              {otpVerified ? (
                <View style={styles.verifiedBadge}>
                  <Icon name="check-circle" size={14} color="#fff" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleVerifyOtp}
                  disabled={otp.length < 6}>
                  <Text style={[
                    styles.actionLink,
                    otp.length < 6 && styles.actionLinkDisabled,
                  ]}>
                    Verify
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* Send OTP / Continue Button */}
        {!otpSent ? (
          <TouchableOpacity
            style={[
              styles.button,
              aadhar.length < 12 && styles.buttonDisabled,
            ]}
            onPress={handleSendOtp}
            disabled={aadhar.length < 12}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        ) : otpVerified ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.buttonDisabled]}
            disabled>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AadharVerificationScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {marginRight: 8},
  headerTitle: {fontSize: 20, fontWeight: '700', color: '#111'},
  content: {paddingHorizontal: 20, paddingTop: 28},
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F5BFF',
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2F5BFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F7F9FF',
  },
  inputBoxVerified: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FFF4',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    padding: 0,
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  actionLink: {
    fontSize: 13,
    color: '#2F5BFF',
    fontWeight: '700',
    marginLeft: 8,
  },
  actionLinkDisabled: {color: '#bbb'},
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#22C55E',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  verifiedText: {color: '#fff', fontSize: 11, fontWeight: '700'},
  button: {
    marginTop: 32,
    backgroundColor: '#2F5BFF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonDisabled: {backgroundColor: '#bbb', elevation: 0},
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});