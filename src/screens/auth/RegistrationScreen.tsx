import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({length: 100}, (_, i) => String(currentYear - i));
const DAYS = Array.from({length: 31}, (_, i) => String(i + 1).padStart(2, '0'));

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  // Custom DOB picker state
  const [dobModalVisible, setDobModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [dobDisplay, setDobDisplay] = useState('');
  const [dobPickerStep, setDobPickerStep] = useState<'day' | 'month' | 'year'>('day');

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
    }
  };

  const handleDobConfirm = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      setDobDisplay(`${selectedDay} ${selectedMonth} ${selectedYear}`);
      setDobModalVisible(false);
      setDobPickerStep('day');
    }
  };

  const handleContinue = () => {
    navigation.navigate('AadharVerification' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}>Let's get you started</Text>
        <Text style={styles.subheading}>
          Please enter your basic details to create your rider account
        </Text>

        {/* Full Name */}
        <View style={styles.inputRow}>
          <Icon name="account-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#bbb"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

        {/* Mobile Number */}
        <View style={styles.inputRow}>
          <Icon name="phone-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#bbb"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={text => {
                setMobile(text);
                setOtpVerified(false);
                setOtp('');
              }}
              maxLength={10}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.actionLink}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {/* OTP */}
        <View style={styles.inputRow}>
          <Icon
            name={otpVerified ? 'shield-check' : 'shield-outline'}
            size={20}
            color={otpVerified ? '#22C55E' : '#888'}
            style={styles.iconBox}
          />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>OTP</Text>
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
          </View>
          {otpVerified ? (
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={14} color="#fff" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleVerifyOtp}
              disabled={otp.length < 6}>
              <Text style={[styles.actionLink, otp.length < 6 && styles.actionLinkDisabled]}>
                Verify
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Date of Birth */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => {
            setDobPickerStep('day');
            setDobModalVisible(true);
          }}
          activeOpacity={0.8}>
          <Icon name="calendar-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={[styles.input, !dobDisplay && {color: '#bbb'}]}>
              {dobDisplay || 'Select date of birth'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* Gender */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setGenderModalVisible(true)}
          activeOpacity={0.8}>
          <Icon name="gender-male-female" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Gender</Text>
            <Text style={[styles.input, !gender && {color: '#bbb'}]}>
              {gender || 'Select gender'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* Password */}
        <View style={styles.inputRow}>
          <Icon name="lock-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#bbb"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputRow}>
          <Icon name="lock-check-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#bbb"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowConfirmPassword(p => !p)}>
            <Icon
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('PartnerLogin' as never)}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── DOB Modal ── */}
      <Modal
        visible={dobModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDobModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDobModalVisible(false)}>
          <View
            style={styles.modalSheet}
            onStartShouldSetResponder={() => true}>

            {/* Step indicator */}
            <View style={styles.dobStepRow}>
              {(['day', 'month', 'year'] as const).map(step => (
                <TouchableOpacity
                  key={step}
                  style={[styles.dobStep, dobPickerStep === step && styles.dobStepActive]}
                  onPress={() => setDobPickerStep(step)}>
                  <Text style={[styles.dobStepText, dobPickerStep === step && styles.dobStepTextActive]}>
                    {step === 'day'
                      ? selectedDay || 'Day'
                      : step === 'month'
                      ? selectedMonth || 'Month'
                      : selectedYear || 'Year'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Day picker */}
            {dobPickerStep === 'day' && (
              <>
                <Text style={styles.modalTitle}>Select Day</Text>
                <FlatList
                  data={DAYS}
                  keyExtractor={item => item}
                  numColumns={7}
                  style={{maxHeight: 200}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.dayCell,
                        selectedDay === item && styles.dayCellSelected,
                      ]}
                      onPress={() => {
                        setSelectedDay(item);
                        setDobPickerStep('month');
                      }}>
                      <Text style={[
                        styles.dayCellText,
                        selectedDay === item && styles.dayCellTextSelected,
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {/* Month picker */}
            {dobPickerStep === 'month' && (
              <>
                <Text style={styles.modalTitle}>Select Month</Text>
                <FlatList
                  data={MONTHS}
                  keyExtractor={item => item}
                  style={{maxHeight: 220}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.modalOption,
                        selectedMonth === item && styles.modalOptionHighlight,
                      ]}
                      onPress={() => {
                        setSelectedMonth(item);
                        setDobPickerStep('year');
                      }}>
                      <Text style={[
                        styles.modalOptionText,
                        selectedMonth === item && styles.modalOptionSelected,
                      ]}>
                        {item}
                      </Text>
                      {selectedMonth === item && (
                        <Icon name="check" size={18} color="#2F5BFF" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {/* Year picker */}
            {dobPickerStep === 'year' && (
              <>
                <Text style={styles.modalTitle}>Select Year</Text>
                <FlatList
                  data={YEARS}
                  keyExtractor={item => item}
                  style={{maxHeight: 220}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.modalOption,
                        selectedYear === item && styles.modalOptionHighlight,
                      ]}
                      onPress={() => setSelectedYear(item)}>
                      <Text style={[
                        styles.modalOptionText,
                        selectedYear === item && styles.modalOptionSelected,
                      ]}>
                        {item}
                      </Text>
                      {selectedYear === item && (
                        <Icon name="check" size={18} color="#2F5BFF" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {/* Confirm button */}
            <TouchableOpacity
              style={[
                styles.dobConfirmBtn,
                !(selectedDay && selectedMonth && selectedYear) && styles.dobConfirmBtnDisabled,
              ]}
              onPress={handleDobConfirm}
              disabled={!(selectedDay && selectedMonth && selectedYear)}>
              <Text style={styles.dobConfirmText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Gender Modal ── */}
      <Modal
        visible={genderModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGenderModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setGenderModalVisible(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <FlatList
              data={GENDERS}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    gender === item && styles.modalOptionHighlight,
                  ]}
                  onPress={() => {
                    setGender(item);
                    setGenderModalVisible(false);
                  }}>
                  <Text style={[
                    styles.modalOptionText,
                    gender === item && styles.modalOptionSelected,
                  ]}>
                    {item}
                  </Text>
                  {gender === item && (
                    <Icon name="check" size={18} color="#2F5BFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  scrollContent: {paddingHorizontal: 20, paddingBottom: 40},
  logo: {width: 60, height: 60, alignSelf: 'flex-start', marginTop: 16, marginBottom: 12},
  heading: {fontSize: 22, fontWeight: '800', color: '#111'},
  subheading: {fontSize: 13, color: '#888', marginTop: 4, marginBottom: 20},
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F5F5', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12,
  },
  iconBox: {marginRight: 10},
  inputWrapper: {flex: 1},
  label: {fontSize: 11, color: '#888', marginBottom: 2},
  input: {fontSize: 14, color: '#111', padding: 0},
  actionLink: {fontSize: 13, color: '#2F5BFF', fontWeight: '700', marginLeft: 8},
  actionLinkDisabled: {color: '#bbb'},
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#22C55E', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3, marginLeft: 8,
  },
  verifiedText: {color: '#fff', fontSize: 11, fontWeight: '700'},
  continueButton: {
    backgroundColor: '#2F5BFF', borderRadius: 12,
    height: 52, justifyContent: 'center', alignItems: 'center',
    marginTop: 8, elevation: 4,
  },
  continueText: {color: '#fff', fontSize: 16, fontWeight: '700'},
  loginRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 16},
  loginText: {color: '#888', fontSize: 14},
  loginLink: {color: '#2F5BFF', fontSize: 14, fontWeight: '700'},

  // Modal shared
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end'},
  modalSheet: {
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingTop: 20, paddingBottom: 30, paddingHorizontal: 20,
  },
  modalTitle: {fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 12},
  modalOption: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  modalOptionHighlight: {backgroundColor: '#F0F4FF', borderRadius: 8, paddingHorizontal: 6},
  modalOptionText: {fontSize: 15, color: '#333'},
  modalOptionSelected: {color: '#2F5BFF', fontWeight: '700'},

  // DOB custom picker
  dobStepRow: {flexDirection: 'row', marginBottom: 16, gap: 8},
  dobStep: {
    flex: 1, paddingVertical: 8, borderRadius: 8,
    backgroundColor: '#F0F0F0', alignItems: 'center',
  },
  dobStepActive: {backgroundColor: '#2F5BFF'},
  dobStepText: {fontSize: 13, color: '#555', fontWeight: '600'},
  dobStepTextActive: {color: '#fff'},
  dayCell: {
    flex: 1, margin: 3, paddingVertical: 8,
    borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center',
  },
  dayCellSelected: {backgroundColor: '#2F5BFF'},
  dayCellText: {fontSize: 13, color: '#333', fontWeight: '600'},
  dayCellTextSelected: {color: '#fff'},
  dobConfirmBtn: {
    marginTop: 16, backgroundColor: '#2F5BFF', borderRadius: 10,
    height: 48, justifyContent: 'center', alignItems: 'center',
  },
  dobConfirmBtnDisabled: {backgroundColor: '#bbb'},
  dobConfirmText: {color: '#fff', fontWeight: '700', fontSize: 15},
});