import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const nearbyCities = ['Jabalpur'];

const allCities = [
  'Ajmer', 'Agra', 'Ahmedabad', 'Akola', 'Aligarh',
  'Alwar', 'Allahabad', 'Amravati', 'Amritsar', 'Aurangabad',
];

const SelectCityScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ Single handler used by ALL city buttons
const handleCitySelect = async (city: string) => {
  await AsyncStorage.setItem('userToken', 'logged_in');
  await AsyncStorage.setItem('selectedCity', city);
  navigation.reset({           // ← reset instead of navigate
    index: 0,
    routes: [{name: 'Home' as never}],
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select City</Text>
      </View>

      <View style={styles.searchBox}>
        <Icon name="magnify" size={22} color="#28C840" />
        <TextInput
          placeholder="Search your work city"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>NEARBY CITIES</Text>
      </View>

      {nearbyCities.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.cityRow}
          onPress={() => handleCitySelect(item)}>
          <Text style={styles.cityText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ALL CITIES</Text>
      </View>

      <FlatList
        data={filteredCities}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cityRow}
            onPress={() => handleCitySelect(item)}> {/* ✅ saves token */}
            <Text style={styles.cityText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SelectCityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: '700', marginLeft: 10, color: '#000' },
  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#DDE3FF', borderRadius: 10, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#5A6FFF', marginBottom: 25 },
  searchInput: { flex: 1, marginLeft: 10, color: '#000' },
  sectionHeader: { backgroundColor: '#3458F6', paddingVertical: 10, alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cityRow: { paddingHorizontal: 30, paddingVertical: 18 },
  cityText: { fontSize: 18, fontWeight: '600', color: '#111' },
});