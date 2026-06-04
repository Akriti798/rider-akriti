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

const YEARS = Array.from({length: 30}, (_, i) =>
  String(new Date().getFullYear() - i),
);

const COLORS = [
  'Black', 'White', 'Silver', 'Red', 'Blue',
  'Grey', 'Yellow', 'Orange', 'Green', 'Brown',
];

const VehicleInfoScreen = () => {
  const navigation = useNavigation();

  const [vehicleNumber, setVehicleNumber] = useState('');
  const [regYear, setRegYear] = useState('');
  const [color, setColor] = useState('');
  const [rcFileName, setRcFileName] = useState('');
  const [insuranceFileName, setInsuranceFileName] = useState('');
  const [yearModal, setYearModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);

  // Simulate file pick
  const handleUpload = (type: 'rc' | 'insurance') => {
    if (type === 'rc') setRcFileName('RC_document.pdf');
    else setInsuranceFileName('Insurance_certificate.pdf');
  };

  const handleContinue = () => {
    navigation.navigate('BankInfo' as never);
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

        <Text style={styles.heading}>Add your vehicle details</Text>
        <Text style={styles.subheading}>
          This helps us verify your vehicle and assign suitable orders.
        </Text>

        {/* Vehicle Number */}
        <View style={styles.inputRow}>
          <Icon name="car-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter vehicle number"
              placeholderTextColor="#bbb"
              value={vehicleNumber}
              onChangeText={text => setVehicleNumber(text.toUpperCase())}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Registration Year */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setYearModal(true)}
          activeOpacity={0.8}>
          <Icon name="calendar-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Registration Year</Text>
            <Text style={[styles.input, !regYear && {color: '#bbb'}]}>
              {regYear || 'Select year'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* Vehicle Color */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setColorModal(true)}
          activeOpacity={0.8}>
          <Icon name="palette-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Vehicle Color</Text>
            <Text style={[styles.input, !color && {color: '#bbb'}]}>
              {color || 'Select color'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>

        {/* RC Upload */}
        <View style={styles.inputRow}>
          <Icon name="file-document-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>RC (Registration Certificate)</Text>
            <Text style={[styles.input, !rcFileName && {color: '#bbb'}]}>
              {rcFileName || 'Upload clear photo of your RC'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => handleUpload('rc')}>
            <Icon name="upload" size={14} color="#2F5BFF" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Insurance Upload */}
        <View style={styles.inputRow}>
          <Icon name="shield-check-outline" size={20} color="#888" style={styles.iconBox} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Insurance Certificate</Text>
            <Text style={[styles.input, !insuranceFileName && {color: '#bbb'}]}>
              {insuranceFileName || 'Upload valid insurance certificate'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => handleUpload('insurance')}>
            <Icon name="upload" size={14} color="#2F5BFF" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Year Modal */}
      <Modal
        visible={yearModal}
        transparent
        animationType="slide"
        onRequestClose={() => setYearModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setYearModal(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Registration Year</Text>
            <FlatList
              data={YEARS}
              keyExtractor={item => item}
              style={{maxHeight: 300}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    regYear === item && styles.modalOptionHighlight,
                  ]}
                  onPress={() => {
                    setRegYear(item);
                    setYearModal(false);
                  }}>
                  <Text style={[
                    styles.modalOptionText,
                    regYear === item && styles.modalOptionSelected,
                  ]}>
                    {item}
                  </Text>
                  {regYear === item && (
                    <Icon name="check" size={18} color="#2F5BFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Color Modal */}
      <Modal
        visible={colorModal}
        transparent
        animationType="slide"
        onRequestClose={() => setColorModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setColorModal(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Vehicle Color</Text>
            <FlatList
              data={COLORS}
              keyExtractor={item => item}
              style={{maxHeight: 300}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    color === item && styles.modalOptionHighlight,
                  ]}
                  onPress={() => {
                    setColor(item);
                    setColorModal(false);
                  }}>
                  <Text style={[
                    styles.modalOptionText,
                    color === item && styles.modalOptionSelected,
                  ]}>
                    {item}
                  </Text>
                  {color === item && (
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

export default VehicleInfoScreen;

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
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1.5, borderColor: '#2F5BFF', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5, marginLeft: 8,
  },
  uploadText: {fontSize: 12, color: '#2F5BFF', fontWeight: '700'},
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