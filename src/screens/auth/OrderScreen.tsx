import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        contentContainerStyle={{paddingBottom: 20, paddingTop: 8}}>

        {orders.map((order, index) => (
          <View key={index} style={styles.card}>

            {/* Status Badge */}
            <View style={[styles.badge, {backgroundColor: order.statusColor}]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>

            {/* Card Body */}
            <View style={styles.cardBody}>

              {/* Cart Illustration Box */}
              <View style={styles.cartBox}>
                <Icon name="truck-delivery-outline" size={32} color="#2F5BFF" />
              </View>

              {/* Order Details */}
              <View style={styles.orderInfo}>

                {/* Top row: ID + amount+items */}
                <View style={styles.orderTopRow}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={styles.rightCol}>
                    <View style={styles.amountRow}>
                      <Text style={styles.amount}>{order.amount}</Text>
                      <Icon name="chevron-right" size={15} color="#000" />
                    </View>
                    <Text style={styles.itemsRight}>{order.items}</Text>
                  </View>
                </View>

                <Text style={styles.customerName}>{order.customer}</Text>
                <Text style={styles.address}>{order.address}</Text>

                {/* Navigate button inline */}
                {order.action === 'navigate' && (
                  <View style={styles.navigateRow}>
                    <TouchableOpacity style={styles.navigateBtn}>
                      <Icon name="navigation" size={13} color="#fff" />
                      <Text style={styles.navigateBtnText}>Navigate</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Accept button */}
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
              {order.showPickedUp && (
                <View style={styles.footerLeft}>
                  <Icon name="clock-outline" size={13} color="#555" />
                  <Text style={styles.footerText}>Picked Up</Text>
                </View>
              )}
              {order.time && (
                <Text style={[
                  styles.footerTime,
                  !order.showPickedUp && {marginLeft: 'auto'},
                ]}>
                  {order.time}
                </Text>
              )}
            </View>
          </View>
        ))}

        {/* Today's Summary */}
        <Text style={styles.summaryTitle}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          {[
            {icon: 'shopping-outline', value: '08', label: "Total Order"},
            {icon: 'check-circle-outline', value: '08', label: "Total Order"},
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
  container: {flex: 1, backgroundColor: '#F0F2FF'},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 12,
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

  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
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

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderBottomRightRadius: 10,
    marginBottom: 4,
  },
  badgeText: {fontSize: 11, color: '#fff', fontWeight: '700'},

  cardBody: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
  },
  cartBox: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: '#DDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#B0BFFF',
  },

  orderInfo: {flex: 1},
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  orderId: {fontSize: 14, fontWeight: '700', color: '#111'},
  rightCol: {alignItems: 'flex-end'},
  amountRow: {flexDirection: 'row', alignItems: 'center'},
  amount: {fontSize: 14, fontWeight: '700', color: '#111'},
  itemsRight: {fontSize: 11, color: '#888', marginTop: 1},

  customerName: {fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 2},
  address: {fontSize: 12, color: '#555', lineHeight: 17, marginBottom: 8},

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

  acceptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    backgroundColor: '#2F5BFF',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptBtnText: {color: '#fff', fontWeight: '700', fontSize: 14},
  countdown: {fontSize: 13, color: '#888', fontWeight: '600'},

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
  footerTime: {fontSize: 12, color: '#555'},

  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 6,
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