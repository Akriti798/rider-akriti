import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank',
  'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank',
  'Bank of Baroda', 'Canara Bank', 'Union Bank of India',
  'IndusInd Bank',
];

const ACCOUNT_TYPES = ['Savings', 'Current', 'Salary'];

const BankInfoScreen = () => {
  const navigation = useNavigation();

  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankModal, setBankModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);

  const handleContinue = () => {
    // navigation.navigate('NextScreen' as never);
    console.log({accountHolder, bankName, accountNumber, ifsc, accountType});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoRow}>
          <Icon name="truck-fast" size={32} color="#2F5BFF" />
        </View>

        <Text style={styles.heading}>Bank Information</Text>
        <Text style={styles.subheading}>
          Add your bank details to receive payments for your deliveries
        </Text>

        {/* Account Holder Name */}
        <View style={styles.inputRow}>
          <Icon name="account-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Account Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account holder name"
              placeholderTextColor="#bbb"
              value={accountHolder}
              onChangeText={setAccountHolder}
            />
          </View>
        </View>

        {/* Bank Name */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setBankModal(true)}
          activeOpacity={0.8}>
          <Icon name="bank-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Bank Name</Text>
            <Text style={[styles.input, !bankName && {color: '#bbb'}]}>
              {bankName || 'Select your Bank'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* Account Number */}
        <View style={styles.inputRow}>
          <Icon name="credit-card-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor="#bbb"
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={setAccountNumber}
              maxLength={18}
            />
          </View>
        </View>

        {/* IFSC Code */}
        <View style={styles.inputRow}>
          <Icon name="shield-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>IFSC Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter IFSC code"
              placeholderTextColor="#bbb"
              value={ifsc}
              onChangeText={text => setIfsc(text.toUpperCase())}
              autoCapitalize="characters"
              maxLength={11}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.actionLink}>Find IFSC</Text>
          </TouchableOpacity>
        </View>

        {/* Account Type */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setTypeModal(true)}
          activeOpacity={0.8}>
          <Icon name="bank-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={[styles.input, !accountType && {color: '#bbb'}]}>
              {accountType || 'Select account Type'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* Continue */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bank Modal */}
      <Modal
        visible={bankModal}
        transparent
        animationType="slide"
        onRequestClose={() => setBankModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setBankModal(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Bank</Text>
            <FlatList
              data={BANKS}
              keyExtractor={item => item}
              style={{maxHeight: 320}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    bankName === item && styles.modalOptionHighlight,
                  ]}
                  onPress={() => {
                    setBankName(item);
                    setBankModal(false);
                  }}>
                  <Text style={[
                    styles.modalOptionText,
                    bankName === item && styles.modalOptionSelected,
                  ]}>
                    {item}
                  </Text>
                  {bankName === item && (
                    <Icon name="check" size={18} color="#2F5BFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Account Type Modal */}
      <Modal
        visible={typeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setTypeModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setTypeModal(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Account Type</Text>
            <FlatList
              data={ACCOUNT_TYPES}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    accountType === item && styles.modalOptionHighlight,
                  ]}
                  onPress={() => {
                    setAccountType(item);
                    setTypeModal(false);
                  }}>
                  <Text style={[
                    styles.modalOptionText,
                    accountType === item && styles.modalOptionSelected,
                  ]}>
                    {item}
                  </Text>
                  {accountType === item && (
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

export default BankInfoScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollContent: {paddingHorizontal: 20, paddingBottom: 40},
  logoRow: {marginTop: 16, marginBottom: 12},
  heading: {fontSize: 22, fontWeight: '800', color: '#111'},
  subheading: {fontSize: 13, color: '#888', marginTop: 4, marginBottom: 24},
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F5F5', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12,
  },
  iconBox: {marginRight: 10},
  inputWrapper: {flex: 1},
  label: {fontSize: 11, color: '#888', marginBottom: 2},
  input: {fontSize: 14, color: '#111', padding: 0},
  actionLink: {fontSize: 13, color: '#2F5BFF', fontWeight: '700', marginLeft: 8},
  continueButton: {
    backgroundColor: '#2F5BFF', borderRadius: 12,
    height: 52, justifyContent: 'center', alignItems: 'center',
    marginTop: 8, elevation: 4,
  },
  continueText: {color: '#fff', fontSize: 16, fontWeight: '700'},
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingTop: 20, paddingBottom: 36, paddingHorizontal: 20,
  },
  modalTitle: {fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 12},
  modalOption: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  modalOptionHighlight: {
    backgroundColor: '#F0F4FF', borderRadius: 8, paddingHorizontal: 6,
  },
  modalOptionText: {fontSize: 15, color: '#333'},
  modalOptionSelected: {color: '#2F5BFF', fontWeight: '700'},
});