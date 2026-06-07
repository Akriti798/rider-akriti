import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PartnerRegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}>Let's get you started</Text>
        <Text style={styles.subHeading}>
          Please enter your basic details to create your rider account
        </Text>

        {/* Full Name */}
        <View style={styles.inputBox}>
          <Icon name="account-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#BBB"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

        {/* Mobile Number */}
        <View style={styles.inputBox}>
          <Icon name="cellphone" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#BBB"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.actionText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {/* OTP */}
        <View style={styles.inputBox}>
          <Icon name="shield-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#BBB"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.actionText}>Verify</Text>
          </TouchableOpacity>
        </View>

        {/* Date of Birth */}
        <View style={styles.inputBox}>
          <Icon name="calendar-month-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Select date of birth"
              placeholderTextColor="#BBB"
              value={dob}
              onChangeText={setDob}
            />
          </View>
          <Icon name="chevron-down" size={22} color="#555" />
        </View>

        {/* Gender */}
        <View style={styles.inputBox}>
          <Icon name="account-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Select gender"
              placeholderTextColor="#BBB"
              value={gender}
              onChangeText={setGender}
            />
          </View>
          <Icon name="chevron-down" size={22} color="#555" />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Icon name="lock-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#BBB"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputBox}>
          <Icon name="lock-outline" size={20} color="#999" style={styles.icon} />
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#BBB"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Icon
              name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
<TouchableOpacity
  style={styles.continueButton}
  onPress={() => navigation.navigate('AadharVerification' as never)}>
  <Text style={styles.continueText}>Continue</Text>
</TouchableOpacity>

        {/* Already have account */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('PartnerLogin' as never)}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PartnerRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginTop: 16,
  },
  subHeading: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginBottom: 24,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
  },
  inputInner: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  input: {
    fontSize: 15,
    color: '#111',
    padding: 0,
  },
  actionText: {
    color: '#2F5BFF',
    fontWeight: '700',
    fontSize: 13,
  },
  continueButton: {
    height: 55,
    backgroundColor: '#2F5BFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  continueText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#2F5BFF',
    fontWeight: '700',
    fontSize: 14,
  },
});