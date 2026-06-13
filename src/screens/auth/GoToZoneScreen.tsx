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
  navigation: NativeStackNavigationProp<any, 'GoToZone'>;
};

const otherZones = [
  {id: 1, name: 'Napier Town', distance: '3.1 km away'},
  {id: 2, name: 'Wright Town', distance: '4.2 km away'},
];

const zoneMarkers = [
  {label: 'Medium', distance: '3.5 km', color: '#FFC107', top: '18%', left: '18%'},
  {label: 'High',   distance: '2.1 km', color: '#4CAF50', top: '22%', right: '14%'},
  {label: 'Low',    distance: '4.2 km', color: '#9E9E9E', bottom: '18%', left: '10%'},
];

export default function GoToZoneScreen({navigation}: Props) {
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
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#2D5BFF" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Go to Zone</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* ── Map Placeholder ── */}
        <View style={styles.mapContainer}>
          {/* Light map-like background */}
          <View style={styles.mapBg}>

            {/* Fake road lines */}
            <View style={[styles.road, styles.roadH, {top: '48%'}]} />
            <View style={[styles.road, styles.roadH, {top: '65%'}]} />
            <View style={[styles.road, styles.roadV, {left: '35%'}]} />
            <View style={[styles.road, styles.roadV, {left: '62%'}]} />

            {/* Zone bubble markers */}
            {zoneMarkers.map((z, i) => (
              <View key={i} style={[styles.zoneBubble, {borderColor: z.color}, z as any]}>
                <Text style={[styles.zoneBubbleLabel, {color: z.color}]}>{z.label}</Text>
                <Text style={styles.zoneBubbleSub}>{z.distance}</Text>
              </View>
            ))}

            {/* Rider dot — centre */}
            <View style={styles.riderRipple}>
              <View style={styles.riderDot} />
            </View>

            {/* "Map provided by backend" label */}
            <View style={styles.mapFootnote}>
              <Text style={styles.mapFootnoteText}>Live map • Coming soon</Text>
            </View>
          </View>
        </View>

        {/* ── Best Zone Nearby ── */}
        <Text style={styles.sectionTitle}>Best Zone Nearby</Text>
        <View style={styles.bestZoneCard}>
          <View style={styles.bestZoneTop}>
            <View style={styles.bestZoneIconBox}>
              <MaterialCommunityIcons name="navigation" size={26} color="#4CAF50" />
            </View>
            <View style={styles.bestZoneInfo}>
              <Text style={styles.bestZoneName}>Vijay Nagar Zone</Text>
              <Text style={styles.bestZoneBadge}>High Demand</Text>
              <View style={styles.bestZoneMeta}>
                <Ionicons name="location-outline" size={12} color="#888" />
                <Text style={styles.bestZoneMetaText}>2.1 km away  •  4–6 orders</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.navigateButton}>
            <Ionicons name="navigate" size={16} color="#fff" />
            <Text style={styles.navigateButtonText}>Navigate to Zone</Text>
          </TouchableOpacity>
        </View>

        {/* ── Other Zones ── */}
        <Text style={styles.sectionTitle}>Other Zone</Text>
        <View style={styles.otherZonesCard}>
          {otherZones.map((zone, index) => (
            <View key={zone.id}>
              <TouchableOpacity style={styles.otherZoneRow}>
                <View style={styles.otherZoneIconBox}>
                  <MaterialCommunityIcons name="navigation" size={20} color="#3A6FF8" />
                </View>
                <View style={styles.otherZoneInfo}>
                  <Text style={styles.otherZoneName}>{zone.name}</Text>
                  <Text style={styles.otherZoneDist}>{zone.distance}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
              </TouchableOpacity>
              {index < otherZones.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F5F5F5'},

  /* ── Top Bar ── */
  topBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 12,
  },
  logo: {width: 52, height: 52, marginBottom: 12},
  navRow: {flexDirection: 'row', alignItems: 'center', gap: 12},
  circularButton: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 3},
      android: {elevation: 3},
    }),
  },
  screenTitle: {fontSize: 17, fontWeight: '700', color: '#000'},

  /* ── Scroll ── */
  scrollContent: {paddingBottom: 30},

  /* ── Map Placeholder ── */
  mapContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.1, shadowRadius: 6},
      android: {elevation: 4},
    }),
  },
  mapBg: {
    flex: 1,
    backgroundColor: '#E8EDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Fake roads */
  road: {position: 'absolute', backgroundColor: '#fff'},
  roadH: {left: 0, right: 0, height: 6},
  roadV: {top: 0, bottom: 0, width: 6},

  /* Zone bubbles */
  zoneBubble: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.15, shadowRadius: 3},
      android: {elevation: 3},
    }),
  },
  zoneBubbleLabel: {fontSize: 11, fontWeight: '700'},
  zoneBubbleSub:   {fontSize: 9, color: '#888'},

  /* Rider dot */
  riderRipple: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(58,111,248,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  riderDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#3A6FF8',
    borderWidth: 3, borderColor: '#fff',
    ...Platform.select({
      ios: {shadowColor: '#3A6FF8', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 4},
      android: {elevation: 4},
    }),
  },

  /* Map footnote */
  mapFootnote: {
    position: 'absolute', bottom: 8, right: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  mapFootnoteText: {fontSize: 9, color: '#888'},

  /* ── Section Title ── */
  sectionTitle: {
    fontSize: 14, fontWeight: '700', color: '#333',
    marginBottom: 10, marginHorizontal: 16,
  },

  /* ── Best Zone Card ── */
  bestZoneCard: {
    backgroundColor: '#fff', borderRadius: 16,
    marginHorizontal: 16, marginBottom: 20,
    padding: 16, borderWidth: 1, borderColor: '#EEEEEE',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 5},
      android: {elevation: 4},
    }),
  },
  bestZoneTop: {flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14},
  bestZoneIconBox: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  bestZoneInfo:     {flex: 1},
  bestZoneName:     {fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 3},
  bestZoneBadge:    {fontSize: 12, fontWeight: '700', color: '#4CAF50', marginBottom: 5},
  bestZoneMeta:     {flexDirection: 'row', alignItems: 'center', gap: 4},
  bestZoneMetaText: {fontSize: 11, color: '#888'},

  navigateButton: {
    backgroundColor: '#4CAF50', borderRadius: 30,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    paddingVertical: 12,
    ...Platform.select({
      ios: {shadowColor: '#4CAF50', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.35, shadowRadius: 6},
      android: {elevation: 5},
    }),
  },
  navigateButtonText: {color: '#fff', fontSize: 14, fontWeight: '700'},

  /* ── Other Zones ── */
  otherZonesCard: {
    backgroundColor: '#fff', borderRadius: 16,
    marginHorizontal: 16, marginBottom: 20,
    paddingHorizontal: 16, borderWidth: 1, borderColor: '#EEEEEE',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 5},
      android: {elevation: 3},
    }),
  },
  otherZoneRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 14},
  otherZoneIconBox: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  otherZoneInfo: {flex: 1},
  otherZoneName: {fontSize: 14, fontWeight: '700', color: '#222'},
  otherZoneDist: {fontSize: 11, color: '#999', marginTop: 2},
  divider:       {height: 1, backgroundColor: '#F2F2F2'},
});