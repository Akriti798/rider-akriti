import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const orders = [
  {
    id: '#ORD1245789',
    customer: 'Rohit Sharma',
    address: '12, 5th Cross, Kormangala,\nBengaluru 560034',
    amount: '78.00 Rs.',
    items: '4 Items | 1.7 kg',
    status: 'Ongoing',
    statusColor: '#FF9800',
    time: '10:24 AM',
    action: 'navigate',
    showPickedUp: true,
  },
  {
    id: '#ORD1245789',
    customer: 'Rohit Sharma',
    address: '12, 5th Cross, Kormangala,\nBengaluru 560034',
    amount: '65.00 Rs.',
    items: '4 Items | 1.7 kg',
    status: 'Nearby',
    statusColor: '#4CAF50',
    countdown: '30s left',
    action: 'accept',
    showPickedUp: false,
  },
  {
    id: '#ORD1245789',
    customer: 'Rohit Sharma',
    address: '12, 5th Cross, Kormangala,\nBengaluru 560034',
    amount: '92.00 Rs.',
    items: '4 Items | 1.7 kg',
    status: 'Completed',
    statusColor: '#4CAF50',
    time: '10:02 AM',
    action: 'none',
    showPickedUp: false,
  },
];

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState('All orders');

  return (
    <SafeAreaView style={styles.container}>

            {/* Logo */}
            <Image
              source={require('../../assets/images/partner.png')}
              style={styles.logo}
              resizeMode="contain"
            />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle}>
          <Icon name="chevron-left" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Orders</Text>
          <Text style={styles.headerSub}>Online</Text>
        </View>
      </View>


      {/* Tabs */}
      <View style={styles.tabRow}>
        {['All orders', 'Ongoing', 'Completed'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            {tab === 'Ongoing' && (
              <Icon
                name="clock-outline"
                size={13}
                color={activeTab === tab ? '#fff' : '#555'}
                style={{marginRight: 4}}
              />
            )}
            {tab === 'Completed' && (
              <Icon
                name="check-circle-outline"
                size={13}
                color={activeTab === tab ? '#fff' : '#555'}
                style={{marginRight: 4}}
              />
            )}
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.dateBox}>
          <Icon name="calendar-outline" size={15} color="#555" />
          <Text style={styles.dateText}>Today, 20 May</Text>
          <Icon name="chevron-down" size={15} color="#555" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={15} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Order ID / Customer"
            placeholderTextColor="#BBB"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}>

        {orders.map((order, index) => (
          <View key={index} style={styles.card}>

            {/* Status Badge — top-left pill */}
            <View style={[styles.badge, {backgroundColor: order.statusColor}]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>

            {/* Card Body */}
            <View style={styles.cardBody}>
              {/* Truck Icon Box */}
              <View style={styles.cartBox}>
                <Icon name="truck-delivery-outline" size={30} color="#2F5BFF" />
              </View>

              {/* Right side content */}
              <View style={styles.orderInfo}>
                {/* Top row: Order ID | Amount + chevron */}
                <View style={styles.orderTopRow}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.amount}>{order.amount}</Text>
                    <Icon name="chevron-right" size={16} color="#111" />
                  </View>
                </View>

                {/* Items count aligned under amount */}
                <View style={styles.subRow}>
                  <Text style={styles.customerName}>{order.customer}</Text>
                  <Text style={styles.itemsRight}>{order.items}</Text>
                </View>

                <Text style={styles.address}>{order.address}</Text>

                {/* Navigate button — right-aligned, inline */}
                {order.action === 'navigate' && (
                  <View style={styles.navigateRow}>
                    <TouchableOpacity style={styles.navigateBtn}>
                      <Icon name="navigation" size={13} color="#fff" />
                      <Text style={styles.navigateBtnText}>Navigate</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Accept button — left-aligned with countdown on right */}
                {order.action === 'accept' && (
                  <View style={styles.acceptRow}>
                    <TouchableOpacity style={styles.acceptBtn}>
                      <Text style={styles.acceptBtnText}>ACCEPT</Text>
                    </TouchableOpacity>
                    <Text style={styles.countdown}>{order.countdown}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Card Footer */}
            <View style={styles.cardFooter}>
              {order.showPickedUp ? (
                <View style={styles.footerLeft}>
                  <Icon name="clock-outline" size={13} color="#555" />
                  <Text style={styles.footerText}>Picked Up</Text>
                </View>
              ) : (
                <View />
              )}
              {order.time ? (
                <Text style={styles.footerTime}>{order.time}</Text>
              ) : null}
            </View>
          </View>
        ))}

        {/* Today's Summary */}
        <Text style={styles.summaryTitle}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          {[
            {icon: 'shopping-outline', value: '08', label: 'Total Order'},
            {icon: 'check-circle-outline', value: '08', label: 'Total Order'},
            {icon: 'clock-outline', value: '01', label: 'Ongoing'},
            {icon: 'wallet-outline', value: '412.50 Rs.', label: 'Total Earning'},
          ].map((item, i) => (
            <View key={i} style={styles.summaryCard}>
              <Icon name={item.icon} size={22} color="#2F5BFF" />
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 12,
  },

  logo: {
    width: 70,
    height: 70,
    marginLeft: 16,
    marginTop: 10,
    marginBottom:10,
  },

  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {fontSize: 18, fontWeight: '700', color: '#000'},
  headerSub: {fontSize: 12, color: '#4CAF50', fontWeight: '600'},

  /* ── Tabs ── */
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 40,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTab: {backgroundColor: '#2F5BFF', borderColor: '#2F5BFF'},
  tabText: {fontSize: 13, color: '#555', fontWeight: '600'},
  activeTabText: {color: '#fff'},

  /* ── Filter row ── */
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 5,
    backgroundColor: '#fff',
  },
  dateText: {fontSize: 13, color: '#333'},
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    gap: 5,
  },
  searchInput: {flex: 1, fontSize: 13, color: '#333', paddingVertical: 7},

  /* ── Card ── */
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },

  /* Status badge — top-left pill with rounded bottom-right */
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderBottomRightRadius: 10,
    marginBottom: 6,
  },
  badgeText: {fontSize: 11, color: '#fff', fontWeight: '700'},

  /* Card body */
  cardBody: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
  },

  /* Truck icon box */
  cartBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#DDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#B0BFFF',
    flexShrink: 0,
  },

  /* Order info column */
  orderInfo: {flex: 1},

  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  orderId: {fontSize: 13, fontWeight: '700', color: '#111'},
  amountRow: {flexDirection: 'row', alignItems: 'center', gap: 1},
  amount: {fontSize: 14, fontWeight: '700', color: '#111'},

  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  customerName: {fontSize: 13, fontWeight: '700', color: '#111'},
  itemsRight: {fontSize: 11, color: '#888'},

  address: {fontSize: 12, color: '#666', lineHeight: 17, marginBottom: 8},

  /* Navigate */
  navigateRow: {alignItems: 'flex-end'},
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F5BFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  navigateBtnText: {color: '#fff', fontWeight: '700', fontSize: 13},

  /* Accept */
  acceptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    backgroundColor: '#2F5BFF',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptBtnText: {color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.5},
  countdown: {fontSize: 13, color: '#888', fontWeight: '600'},

  /* Card footer */
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 34,
  },
  footerLeft: {flexDirection: 'row', alignItems: 'center', gap: 5},
  footerText: {fontSize: 12, color: '#555'},
  footerTime: {fontSize: 12, color: '#666'},

  /* Summary */
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 1,
    gap: 4,
  },
  summaryValue: {fontSize: 13, fontWeight: '700', color: '#111'},
  summaryLabel: {fontSize: 9, color: '#777', textAlign: 'center'},
});