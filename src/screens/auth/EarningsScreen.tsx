import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LineChart} from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const EarningsScreen = () => {
  const chartData = {
    labels: ['14 May', '15 May', '16 May', '17 May', '18 May', '19 May', '20 May'],
    datasets: [
      {
        data: [20, 180, 390, 400, 250, 380, 412.5],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#2D5BFF" />
          </TouchableOpacity>

          <View>
            <Text style={styles.heading}>Earnings</Text>
            <Text style={styles.online}>Online</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Daily</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Weekly</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Monthly</Text>
          </TouchableOpacity>
        </View>

        {/* Date */}
        <TouchableOpacity style={styles.datePicker}>
          <Ionicons name="calendar-outline" size={18} color="#2D5BFF" />
          <Text style={styles.dateText}>Today, 20 May</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        {/* Earnings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.totalLabel}>Total Earnings</Text>
              <Text style={styles.totalAmount}>412.50 Rs.</Text>
              <Text style={styles.orderCount}>From 8 orders</Text>
            </View>

            <MaterialCommunityIcons
              name="wallet-outline"
              size={60}
              color="#7AB7FF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Order Earnings</Text>
              <Text style={styles.statValue}>382.50 Rs.</Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Incentives</Text>
              <Text style={styles.statValue}>30.00 Rs.</Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Tips</Text>
              <Text style={styles.statValue}>00.00 Rs.</Text>
            </View>
          </View>
        </View>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Earnings Overview</Text>

        <LineChart
          data={chartData}
          width={screenWidth - 24}
          height={200}
          withInnerLines={false}
          withOuterLines={false}
          bezier
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#2D5BFF',
            labelColor: () => '#888',
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#2D5BFF',
            },
          }}
          style={styles.chart}
        />

        {/* Breakdown */}
        <Text style={styles.sectionTitle}>Breakdown</Text>

        <TouchableOpacity style={styles.breakdownCard}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={28}
            color="#2D7CFF"
          />

          <View style={styles.breakdownText}>
            <Text style={styles.breakdownTitle}>Order Earnings</Text>
            <Text style={styles.breakdownSub}>8 Orders</Text>
          </View>

          <Text style={styles.breakdownAmount}>382.50 Rs.</Text>

          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.breakdownCard}>
          <MaterialCommunityIcons
            name="gift-outline"
            size={28}
            color="#2D7CFF"
          />

          <View style={styles.breakdownText}>
            <Text style={styles.breakdownTitle}>Incentives</Text>
            <Text style={styles.breakdownSub}>3 Incentives</Text>
          </View>

          <Text style={styles.breakdownAmount}>30.00 Rs.</Text>

          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.breakdownCard}>
          <MaterialCommunityIcons
            name="cash-plus"
            size={28}
            color="#2D7CFF"
          />

          <View style={styles.breakdownText}>
            <Text style={styles.breakdownTitle}>Tips</Text>
            <Text style={styles.breakdownSub}>0 Tips</Text>
          </View>

          <Text style={styles.breakdownAmount}>00.00 Rs.</Text>

          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  logo: {
    width: 70,
    height: 70,
    marginLeft: 16,
    marginTop: 10,
    marginBottom:10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
  },

  backBtn: {
    height: 38,
    width: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 4,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  online: {
    color: '#1EBE5D',
    fontWeight: '600',
  },

  tabs: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#355CFF',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

  tabText: {
    color: '#000',
    fontWeight: '600',
  },

  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 125,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 12,
    marginTop: 15,
    justifyContent: 'space-between',
    elevation: 2,
  },

  dateText: {
    fontSize: 11,
    color: '#666',
  },

  card: {
    backgroundColor: '#355CFF',
    margin: 12,
    borderRadius: 14,
    paddingTop: 15,
    overflow: 'hidden',
    elevation: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 12,
  },

  totalLabel: {
    color: '#DDE6FF',
    fontSize: 16,
  },

  totalAmount: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '700',
  },

  orderCount: {
    color: '#E9EFFF',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  statsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },

  statBox: {
    flex: 1,
    paddingHorizontal: 10,
  },

  statTitle: {
    color: '#DCE5FF',
    fontSize: 12,
  },

  statValue: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 4,
  },

  verticalDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  sectionTitle: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  chart: {
    borderRadius: 12,
    alignSelf: 'center',
  },

  breakdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  breakdownText: {
    flex: 1,
    marginLeft: 10,
  },

  breakdownTitle: {
    fontWeight: '700',
    color: '#111',
  },

  breakdownSub: {
    color: '#777',
    marginTop: 2,
  },

  breakdownAmount: {
    fontWeight: '700',
    color: '#111',
    marginRight: 8,
  },

});