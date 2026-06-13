import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any, 'Incentives'>;
};

const incentives = [
  { label: 'Peak Hour Incentive', date: '20 May, 12:00 PM', amount: '10.00 Rs.' },
  { label: 'Weekend Bonus',       date: '19 May, All Day',  amount: '15.00 Rs.' },
  { label: 'Performance Bonus',   date: '18 May, All Day',  amount: '5.00 Rs.'  },
];

export default function IncentivesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.circularButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#2D5BFF" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Incentives</Text>
          <TouchableOpacity style={[styles.circularButton, { marginLeft: 'auto' }]}>
            <Ionicons name="calendar-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ── Total Incentives Card ── */}
        <View style={styles.totalCard}>
          <View style={styles.totalCardLeft}>
            <Text style={styles.totalLabel}>Total Incentives</Text>
            <Text style={styles.totalAmount}>30.00 Rs.</Text>
            <Text style={styles.totalSub}>From 3 incentives</Text>
          </View>
          <MaterialCommunityIcons name="gift-outline" size={56} color="rgba(255,255,255,0.85)" />
        </View>

        {/* ── Earnings Overview ── */}
        <Text style={styles.sectionTitle}>Earnings Overview</Text>
        <TouchableOpacity style={styles.overviewCard}>
          <View style={styles.overviewLeft}>
            <Ionicons name="bar-chart-outline" size={22} color="#3A6FF8" />
            <View style={styles.overviewText}>
              <Text style={styles.overviewLabel}>Average Per Incentive</Text>
              <Text style={styles.overviewValue}>10.00Rs.</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
        </TouchableOpacity>

        {/* ── Incentive List ── */}
        <Text style={styles.sectionTitle}>Incentive List</Text>
        <View style={styles.listCard}>
          {incentives.map((item, index) => (
            <View key={item.label}>
              <TouchableOpacity style={styles.incentiveRow}>
                <View style={styles.incentiveIconBox}>
                  <MaterialCommunityIcons name="gift-outline" size={20} color="#3A6FF8" />
                </View>
                <View style={styles.incentiveInfo}>
                  <Text style={styles.incentiveLabel}>{item.label}</Text>
                  <Text style={styles.incentiveDate}>{item.date}</Text>
                </View>
                <Text style={styles.incentiveAmount}>{item.amount}</Text>
                <Ionicons name="chevron-forward" size={16} color="#BDBDBD" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
              {index < incentives.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.bottomBar}>
        {[
          { icon: 'home-outline',   label: 'HOME',     active: false },
          { icon: 'cube-outline',   label: 'ORDER',    active: false },
          { icon: 'cash-outline',   label: 'Earnings', active: true  },
          { icon: 'person-outline', label: 'PROFILE',  active: false },
        ].map(tab => (
          <TouchableOpacity key={tab.label} style={styles.tabItem}>
            <Ionicons
              name={tab.active ? tab.icon.replace('-outline', '') : tab.icon}
              size={22}
              color={tab.active ? '#3A6FF8' : '#999'}
            />
            <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F5' },

  /* ── Top Bar ── */
  topBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 12,
  },
  logo: { width: 52, height: 52, marginBottom: 12 },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  circularButton: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  screenTitle: { fontSize: 17, fontWeight: '700', color: '#000' },

  /* ── Scroll ── */
  scrollContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 30 },

  /* ── Total Card ── */
  totalCard: {
    backgroundColor: '#3A6FF8',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    ...Platform.select({
      ios: { shadowColor: '#3A6FF8', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10 },
      android: { elevation: 8 },
    }),
  },
  totalCardLeft: { flex: 1 },
  totalLabel:  { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 6, fontWeight: '500' },
  totalAmount: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  totalSub:    { fontSize: 12, color: 'rgba(255,255,255,0.75)' },

  /* ── Section Title ── */
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },

  /* ── Overview Card ── */
  overviewCard: {
    backgroundColor: '#fff', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1, borderColor: '#EEEEEE',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  overviewLeft:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  overviewText:  {},
  overviewLabel: { fontSize: 13, color: '#555', fontWeight: '500' },
  overviewValue: { fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 2 },

  /* ── Incentive List ── */
  listCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#EEEEEE',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  incentiveRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
  },
  incentiveIconBox: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  incentiveInfo:   { flex: 1 },
  incentiveLabel:  { fontSize: 14, fontWeight: '700', color: '#222' },
  incentiveDate:   { fontSize: 11, color: '#999', marginTop: 2 },
  incentiveAmount: { fontSize: 13, fontWeight: '700', color: '#222' },
  divider: { height: 1, backgroundColor: '#F2F2F2' },

  /* ── Bottom Tab Bar ── */
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#EEEEEE',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 10 },
    }),
  },
  tabItem:        { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  tabLabel:       { fontSize: 10, color: '#999', fontWeight: '600' },
  tabLabelActive: { color: '#3A6FF8' },
});