import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  Linking,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

// ─── Rider-specific FAQs ──────────────────────────────────────────────────────
const FAQS = [
  {
    id: '1',
    q: 'How do I go online and start accepting orders?',
    a: 'Open the app and tap the "Go Online" toggle on your Home screen. Once you are online, new orders will appear automatically. Make sure your location permission is enabled for orders to reach you.',
  },
  {
    id: '2',
    q: 'What happens if I miss an incoming order?',
    a: 'Missed orders are automatically reassigned to another available rider. Repeated missed orders may temporarily affect your priority score. Stay attentive when you are online to maintain a high acceptance rate.',
  },
  {
    id: '3',
    q: 'How do I report a wrong pickup address or item issue?',
    a: 'If the store address is incorrect or items are not ready, tap "Report Issue" on the active order screen. You can also contact our support team directly. Do not leave the pickup location without reporting.',
  },
  {
    id: '4',
    q: 'How are my earnings calculated?',
    a: 'Your earnings are calculated per delivery and include a base fare, distance charge, and any applicable incentives or surge bonuses. You can view a detailed breakdown under Earnings → Order History.',
  },
  {
    id: '5',
    q: 'When will my earnings be transferred to my bank?',
    a: 'Earnings are settled every Monday to your registered bank account. Ensure your bank details are up to date under Profile → Payment & Bank Details. Processing may take 1–2 business days.',
  },
  {
    id: '6',
    q: 'What do I do if a customer is unreachable at drop-off?',
    a: 'Try calling the customer via the app. If there is no response after 2 attempts, tap "Customer Unreachable" on the delivery screen and wait for support instructions. Do not leave the order unattended.',
  },
  {
    id: '7',
    q: 'How do I update my vehicle or document details?',
    a: 'Go to Profile → My Documents to upload or update your vehicle RC, driving licence, or insurance. Changes are reviewed within 24 hours. You can continue delivering while verification is in progress.',
  },
  {
    id: '8',
    q: 'What are incentives and how do I qualify?',
    a: 'Incentives are bonus earnings for completing a set number of deliveries in a given time window. Check the Incentives tab daily for active offers in your zone. Complete the target before the timer runs out to earn the bonus.',
  },
];

// ─── Contact options ──────────────────────────────────────────────────────────
const CONTACT_OPTIONS = [
  {
    id: 'chat',
    icon: 'chatbubble-ellipses',
    label: 'Live Chat',
    sub: 'Avg. reply in 2 mins',
    color: '#22C55E',
    bg: '#E8FDF0',
    action: () => Alert.alert('Live Chat', 'Connecting you to a support agent…'),
  },
  {
    id: 'call',
    icon: 'call',
    label: 'Call Us',
    sub: '24 / 7 rider support',
    color: '#3458F6',
    bg: '#EEF2FF',
    action: () => Linking.openURL('tel:+918800000000'),
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email Us',
    sub: 'Reply within 24 hrs',
    color: '#F59E0B',
    bg: '#FFFBEB',
    action: () => Linking.openURL('mailto:rider.support@frookoon.com'),
  },
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    label: 'WhatsApp',
    sub: 'Quick issue resolution',
    color: '#25D366',
    bg: '#E8FDF0',
    action: () => Linking.openURL('https://wa.me/918800000000'),
  },
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FAQItem = ({item}: {item: (typeof FAQS)[0]}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={faqStyles.wrap}>
      <TouchableOpacity
        style={faqStyles.question}
        onPress={() => setOpen(!open)}
        activeOpacity={0.85}>
        <View style={faqStyles.qLeft}>
          <View style={faqStyles.qDot} />
          <Text style={faqStyles.qText}>{item.q}</Text>
        </View>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="rgba(255,255,255,0.7)"
        />
      </TouchableOpacity>
      {open && (
        <View style={faqStyles.answer}>
          <Text style={faqStyles.aText}>{item.a}</Text>
        </View>
      )}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RiderHelpSupportScreen = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const [issueText, setIssueText] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [submitted, setSubmitted] = useState(false);

  const filteredFAQs = FAQS.filter(
    f =>
      f.q.toLowerCase().includes(searchText.toLowerCase()) ||
      f.a.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSubmit = () => {
    if (!issueText.trim()) {
      Alert.alert('Empty', 'Please describe your issue before submitting.');
      return;
    }
    setSubmitted(true);
    setIssueText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{width: 38}} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 48}}>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <MaterialCommunityIcons name="motorbike" size={38} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Rider Support Centre</Text>
          <Text style={styles.heroSub}>
            We're here to help you ride smarter and earn more — 24 / 7
          </Text>

          {/* Search */}
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={18}
              color="#aaa"
              style={{marginRight: 10}}
            />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search rider FAQs…"
              placeholderTextColor="#bbb"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color="#ddd" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Quick action chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}>
          {[
            {icon: 'cash-outline', label: 'Earnings'},
            {icon: 'navigate-outline', label: 'Navigation'},
            {icon: 'document-text-outline', label: 'Documents'},
            {icon: 'gift-outline', label: 'Incentives'},
            {icon: 'person-outline', label: 'Account'},
          ].map(c => (
            <TouchableOpacity
              key={c.label}
              style={styles.chip}
              onPress={() => setSearchText(c.label)}
              activeOpacity={0.8}>
              <Ionicons name={c.icon as any} size={15} color="#3458F6" />
              <Text style={styles.chipText}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Tab switcher ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'faq' && styles.tabActive]}
            onPress={() => setActiveTab('faq')}
            activeOpacity={0.85}>
            <Ionicons
              name="help-circle-outline"
              size={16}
              color={activeTab === 'faq' ? '#fff' : '#3458F6'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'faq' && styles.tabTextActive,
              ]}>
              FAQs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'contact' && styles.tabActive]}
            onPress={() => setActiveTab('contact')}
            activeOpacity={0.85}>
            <Ionicons
              name="headset-outline"
              size={16}
              color={activeTab === 'contact' ? '#fff' : '#3458F6'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'contact' && styles.tabTextActive,
              ]}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── FAQ tab ── */}
        {activeTab === 'faq' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {filteredFAQs.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="search-outline" size={44} color="#ddd" />
                <Text style={styles.emptyText}>
                  No results for "{searchText}"
                </Text>
              </View>
            ) : (
              filteredFAQs.map(item => <FAQItem key={item.id} item={item} />)
            )}
          </View>
        )}

        {/* ── Contact tab ── */}
        {activeTab === 'contact' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reach Us Directly</Text>
            <View style={styles.contactGrid}>
              {CONTACT_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.contactCard,
                    {borderColor: opt.color + '33'},
                  ]}
                  onPress={opt.action}
                  activeOpacity={0.8}>
                  <View
                    style={[
                      styles.contactIconWrap,
                      {backgroundColor: opt.bg},
                    ]}>
                    <Ionicons name={opt.icon as any} size={24} color={opt.color} />
                  </View>
                  <Text style={[styles.contactLabel, {color: opt.color}]}>
                    {opt.label}
                  </Text>
                  <Text style={styles.contactSub}>{opt.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or describe your issue</Text>
              <View style={styles.orLine} />
            </View>

            {/* Ticket */}
            <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <View style={styles.ticketIconBox}>
                  <MaterialCommunityIcons
                    name="ticket-outline"
                    size={20}
                    color="#3458F6"
                  />
                </View>
                <Text style={styles.ticketTitle}>Submit a Support Ticket</Text>
              </View>
              <Text style={styles.ticketSub}>
                Describe your issue and our rider support team will respond within 24 hours.
              </Text>
              <View style={styles.ticketInputWrap}>
                <TextInput
                  style={styles.ticketTextInput}
                  value={issueText}
                  onChangeText={setIssueText}
                  placeholder="E.g. My earnings weren't credited for yesterday's deliveries…"
                  placeholderTextColor="#bbb"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              {submitted && (
                <View style={styles.successBanner}>
                  <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                  <Text style={styles.successText}>
                    Ticket submitted! We'll get back to you within 24 hours.
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  submitted && {backgroundColor: '#22C55E'},
                ]}
                onPress={handleSubmit}
                activeOpacity={0.85}>
                <Ionicons
                  name={submitted ? 'checkmark-circle' : 'send'}
                  size={16}
                  color="#fff"
                  style={{marginRight: 8}}
                />
                <Text style={styles.submitBtnText}>
                  {submitted ? 'Submitted!' : 'Submit Ticket'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Quick Links ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksCard}>
            {[
              {icon: 'document-text-outline', label: 'Rider Terms & Conditions'},
              {icon: 'shield-checkmark-outline', label: 'Privacy Policy'},
              {icon: 'cash-outline', label: 'Payout & Bank Details'},
              {icon: 'star-outline', label: 'Rate the Rider App'},
              {icon: 'share-social-outline', label: 'Refer a Rider'},
            ].map((item, idx, arr) => (
              <View key={item.label}>
                <TouchableOpacity
                  style={styles.quickLinkRow}
                  activeOpacity={0.7}>
                  <View style={styles.quickLinkLeft}>
                    <View style={styles.quickLinkIconBox}>
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color="#3458F6"
                      />
                    </View>
                    <Text style={styles.quickLinkText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#ccc" />
                </TouchableOpacity>
                {idx < arr.length - 1 && (
                  <View style={styles.quickLinkDivider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <MaterialCommunityIcons name="motorbike" size={28} color="#3458F6" />
          <Text style={styles.footerBrand}>FROOKOON RIDER</Text>
          <Text style={styles.footerContact}>
            rider.support@frookoon.com  •  +91 88000 00000
          </Text>
          <Text style={styles.footerVersion}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RiderHelpSupportScreen;

// ─── FAQ Styles ───────────────────────────────────────────────────────────────
const faqStyles = StyleSheet.create({
  wrap: {
    backgroundColor: '#3458F6',
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: {shadowColor: '#3458F6', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2, shadowRadius: 6},
      android: {elevation: 3},
    }),
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  qLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
    marginRight: 10,
  },
  qDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    flexShrink: 0,
  },
  qText: {fontSize: 14, fontWeight: '700', color: '#fff', flex: 1, lineHeight: 20},
  answer: {
    backgroundColor: '#F5F7FF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  aText: {fontSize: 13, color: '#555', lineHeight: 21},
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4F6FF'},

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 48,
    paddingBottom: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F4F6FF',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontWeight: '800', color: '#111'},

  // Hero
  hero: {
    backgroundColor: '#3458F6',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 36,
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 22, fontWeight: '900', color: '#fff',
    marginBottom: 6, textAlign: 'center',
  },
  heroSub: {
    fontSize: 13, color: 'rgba(255,255,255,0.75)',
    textAlign: 'center', marginBottom: 22, lineHeight: 19,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 14,
    paddingHorizontal: 14, height: 48, width: '100%',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.12, shadowRadius: 8},
      android: {elevation: 5},
    }),
  },
  searchInput: {flex: 1, fontSize: 14, color: '#111'},

  // Chips
  chipsRow: {
    paddingHorizontal: 16, paddingVertical: 14, gap: 8,
  },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: '#DDE5FF',
    ...Platform.select({
      ios: {shadowColor: '#3458F6', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.08, shadowRadius: 3},
      android: {elevation: 2},
    }),
  },
  chipText: {fontSize: 13, fontWeight: '600', color: '#3458F6'},

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.06, shadowRadius: 4},
      android: {elevation: 2},
    }),
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: 10,
  },
  tabActive: {backgroundColor: '#3458F6'},
  tabText: {fontSize: 14, fontWeight: '700', color: '#3458F6'},
  tabTextActive: {color: '#fff'},

  // Section
  section: {paddingHorizontal: 16, marginTop: 20},
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#aaa',
    letterSpacing: 1.2, marginBottom: 12, textTransform: 'uppercase',
  },

  // Empty
  emptyWrap: {alignItems: 'center', paddingVertical: 40, gap: 12},
  emptyText: {fontSize: 14, color: '#bbb', fontWeight: '600'},

  // Contact
  contactGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12},
  contactCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 18,
    padding: 16, alignItems: 'center', borderWidth: 1.5, gap: 8,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 6},
      android: {elevation: 3},
    }),
  },
  contactIconWrap: {
    width: 52, height: 52, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  contactLabel: {fontSize: 14, fontWeight: '800'},
  contactSub:   {fontSize: 11, color: '#aaa', textAlign: 'center'},

  // Or
  orRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10},
  orLine: {flex: 1, height: 1, backgroundColor: '#eee'},
  orText: {fontSize: 12, color: '#bbb', fontWeight: '600'},

  // Ticket
  ticketCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 18,
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 8},
      android: {elevation: 3},
    }),
  },
  ticketHeader: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6},
  ticketIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
  },
  ticketTitle: {fontSize: 16, fontWeight: '800', color: '#111'},
  ticketSub:   {fontSize: 12, color: '#aaa', marginBottom: 14, lineHeight: 18},
  ticketInputWrap: {
    backgroundColor: '#FAFBFF', borderRadius: 14,
    borderWidth: 1.5, borderColor: '#E8EDFF',
    padding: 14, marginBottom: 12, minHeight: 110,
  },
  ticketTextInput: {fontSize: 14, color: '#111', minHeight: 90},
  successBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#E8FDF0', borderRadius: 10,
    padding: 10, marginBottom: 12,
  },
  successText: {fontSize: 13, color: '#16A34A', fontWeight: '600', flex: 1},
  submitBtn: {
    height: 50, backgroundColor: '#3458F6', borderRadius: 14,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    ...Platform.select({
      ios: {shadowColor: '#3458F6', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.35, shadowRadius: 8},
      android: {elevation: 5},
    }),
  },
  submitBtnText: {fontSize: 14, fontWeight: '800', color: '#fff', letterSpacing: 0.3},

  // Quick links
  quickLinksCard: {
    backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden',
    ...Platform.select({
      ios: {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 6},
      android: {elevation: 3},
    }),
  },
  quickLinkRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  quickLinkLeft:   {flexDirection: 'row', alignItems: 'center', gap: 12},
  quickLinkIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center',
  },
  quickLinkText:    {fontSize: 14, fontWeight: '600', color: '#111'},
  quickLinkDivider: {height: 1, backgroundColor: '#F5F5F5', marginHorizontal: 16},

  // Footer
  footer: {alignItems: 'center', paddingVertical: 30, gap: 5},
  footerBrand:   {fontSize: 15, fontWeight: '900', color: '#3458F6', letterSpacing: 1},
  footerContact: {fontSize: 12, color: '#aaa'},
  footerVersion: {fontSize: 11, color: '#ddd', marginTop: 4},
});