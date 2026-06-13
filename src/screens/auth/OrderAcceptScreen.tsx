import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any, 'IncomingOrder'>;
};

export default function IncomingOrderScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.orderTitle}>Order #1245</Text>
        </View>

        {/* ── Map Placeholder ── */}
        <View style={styles.mapContainer}>
          <View style={styles.mapBg}>

            {/* Fake road lines */}
            <View style={[styles.road, styles.roadH, {top: '40%'}]} />
            <View style={[styles.road, styles.roadH, {top: '60%'}]} />
            <View style={[styles.road, styles.roadV, {left: '30%'}]} />
            <View style={[styles.road, styles.roadV, {left: '65%'}]} />

            {/* Route line (decorative) */}
            <View style={styles.routeLine} />

            {/* "You" marker — bottom left */}
            <View style={[styles.youMarkerWrap, {bottom: '22%', left: '18%'}]}>
              <View style={styles.youRipple}>
                <View style={styles.youDot} />
              </View>
              <View style={styles.youLabel}>
                <Text style={styles.youLabelText}>You</Text>
              </View>
            </View>

            {/* Store marker — top right */}
            <View style={[styles.storeMarkerWrap, {top: '14%', right: '16%'}]}>
              <View style={styles.storePinBox}>
                <MaterialCommunityIcons name="store" size={16} color="#fff" />
              </View>
              <View style={styles.storeCallout}>
                <Text style={styles.storeCalloutName}>Shyam Grocery</Text>
                <Text style={styles.storeCalloutDist}>1.2 km away</Text>
              </View>
            </View>

            {/* Recenter button */}
            <TouchableOpacity style={styles.recenterBtn}>
              <Ionicons name="locate" size={18} color="#3A6FF8" />
            </TouchableOpacity>

            {/* Live map label */}
            <View style={styles.mapFootnote}>
              <Text style={styles.mapFootnoteText}>Live map • Coming soon</Text>
            </View>
          </View>
        </View>

        {/* ── Pick up location ── */}
        <Text style={styles.sectionLabel}>Pick up location</Text>
        <View style={styles.card}>
          <View style={styles.storeLogoBox}>
            <Image
              source={require('../../assets/images/partner.png')}
              style={styles.storeLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>Shyam Grocery</Text>
            <Text style={styles.cardAddress}>123 MG Road, Bangaluru, KA 560001</Text>
          </View>
          <View style={styles.distBadge}>
            <Text style={styles.distBadgeText}>3.2 Km</Text>
          </View>
          <TouchableOpacity style={styles.navIconBtn}>
            <Ionicons name="navigate" size={18} color="#3A6FF8" />
          </TouchableOpacity>
        </View>

        {/* ── Customer ── */}
        <Text style={styles.sectionLabel}>Customer</Text>
        <View style={styles.card}>
          <View style={styles.avatarBox}>
            <Ionicons name="person" size={22} color="#3A6FF8" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>Rahul Sharma</Text>
            <Text style={styles.cardAddress}>A-205 MG Road, Bangaluru, KA 560001</Text>
          </View>
        </View>

        {/* ── Actions ── */}
        <TouchableOpacity style={styles.primaryBtn}>
          <Ionicons name="navigate-circle-outline" size={22} color="#fff" />
          <Text style={styles.primaryBtnText}>Navigate to Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Arrived at Store</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  scrollContent: {paddingBottom: 36},

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 10,
    paddingBottom: 12,
    backgroundColor: '#fff',
    gap: 14,
  },
  closeButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center', alignItems: 'center',
  },
  orderTitle: {fontSize: 17, fontWeight: '700', color: '#111'},

  /* ── Map ── */
  mapContainer: {
    height: 240,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.1, shadowRadius: 6},
      android: {elevation: 4},
    }),
  },
  mapBg: {
    flex: 1,
    backgroundColor: '#E8EDF5',
  },
  road: {position: 'absolute', backgroundColor: '#fff'},
  roadH: {left: 0, right: 0, height: 7},
  roadV: {top: 0, bottom: 0, width: 7},

  /* Decorative route */
  routeLine: {
    position: 'absolute',
    bottom: '26%', left: '22%',
    width: 130, height: 3,
    backgroundColor: '#3A6FF8',
    borderRadius: 2,
    transform: [{rotate: '-28deg'}],
  },

  /* You marker */
  youMarkerWrap: {position: 'absolute', alignItems: 'center'},
  youRipple: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(58,111,248,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  youDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#3A6FF8',
    borderWidth: 3, borderColor: '#fff',
    ...Platform.select({
      ios: {shadowColor: '#3A6FF8', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 4},
      android: {elevation: 4},
    }),
  },
  youLabel: {
    backgroundColor: '#fff', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, marginTop: 4,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 2},
      android: {elevation: 2},
    }),
  },
  youLabelText: {fontSize: 10, fontWeight: '700', color: '#333'},

  /* Store marker */
  storeMarkerWrap: {position: 'absolute', alignItems: 'center'},
  storePinBox: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#3A6FF8',
    justifyContent: 'center', alignItems: 'center',
    ...Platform.select({
      ios: {shadowColor: '#3A6FF8', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.4, shadowRadius: 4},
      android: {elevation: 4},
    }),
  },
  storeCallout: {
    backgroundColor: '#fff', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4, marginTop: 4,
    alignItems: 'center',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.12, shadowRadius: 3},
      android: {elevation: 3},
    }),
  },
  storeCalloutName: {fontSize: 10, fontWeight: '700', color: '#111'},
  storeCalloutDist: {fontSize: 9, color: '#888'},

  /* Recenter */
  recenterBtn: {
    position: 'absolute', bottom: 10, right: 10,
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.12, shadowRadius: 3},
      android: {elevation: 3},
    }),
  },

  /* Map footnote */
  mapFootnote: {
    position: 'absolute', bottom: 8, left: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  mapFootnoteText: {fontSize: 9, color: '#888'},

  /* ── Section Label ── */
  sectionLabel: {
    fontSize: 13, fontWeight: '700', color: '#3A6FF8',
    marginHorizontal: 16, marginBottom: 8,
  },

  /* ── Card ── */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1, borderColor: '#EEEEEE',
    gap: 10,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 5},
      android: {elevation: 3},
    }),
  },
  storeLogoBox: {
    width: 48, height: 48, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  storeLogo: {width: 40, height: 40},
  avatarBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
  },
  cardInfo: {flex: 1},
  cardName:    {fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 3},
  cardAddress: {fontSize: 11, color: '#888', lineHeight: 16},
  distBadge: {
    backgroundColor: '#EEF2FF', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  distBadgeText: {fontSize: 11, fontWeight: '700', color: '#3A6FF8'},
  navIconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
  },

  /* ── Buttons ── */
  primaryBtn: {
    marginHorizontal: 16,
    backgroundColor: '#3A6FF8',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    marginBottom: 12,
    ...Platform.select({
      ios: {shadowColor: '#3A6FF8', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.35, shadowRadius: 6},
      android: {elevation: 5},
    }),
  },
  primaryBtnText: {color: '#fff', fontSize: 15, fontWeight: '700'},

  secondaryBtn: {
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryBtnText: {
    fontSize: 14, fontWeight: '700', color: '#3A6FF8',
  },
});