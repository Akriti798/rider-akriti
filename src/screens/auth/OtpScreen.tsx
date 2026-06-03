import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const OtpScreen = () => {
  const route = useRoute();

const {mobile} =
  (route.params as {mobile?: string}) || {};

 const [timer, setTimer] = useState(30);

 const [otp, setOtp] = useState([
   '',
   '',
   '',
   '',
   '',
   '',
 ]);

 const inputRefs = useRef<Array<TextInput | null>>([]);

 const handleOtpChange = (
   text: string,
   index: number,
 ) => {
   const newOtp = [...otp];
   newOtp[index] = text;
   setOtp(newOtp);

   if (text && index < otp.length - 1) {
     inputRefs.current[index + 1]?.focus();
   }
 };

 const handleKeyPress = (
   e: any,
   index: number,
 ) => {
   if (
     e.nativeEvent.key === 'Backspace' &&
     !otp[index] &&
     index > 0
   ) {
     inputRefs.current[index - 1]?.focus();
   }
 };

 useEffect(() => {
   if (timer <= 0) {
     return;
   }

   const interval = setInterval(() => {
     setTimer(prev => prev - 1);
   }, 1000);

   return () => clearInterval(interval);
 }, [timer]);


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/partner.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Enter OTP</Text>

<Text style={styles.subtitle}>
  OTP sent to {mobile}
</Text>


<View style={styles.otpContainer}>
  {otp.map((digit, index) => (
    <TextInput
      key={index}
      ref={ref => {
        inputRefs.current[index] = ref;
      }}
      style={styles.otpBox}
      keyboardType="number-pad"
      maxLength={1}
      value={digit}
      onChangeText={text =>
        handleOtpChange(text, index)
      }
      onKeyPress={e =>
        handleKeyPress(e, index)
      }
      textAlign="center"
    />
  ))}
</View>

{timer > 0 ? (
  <Text style={styles.resendText}>
    Didn't get the OTP? Resend SMS in {timer}s
  </Text>
) : (
  <TouchableOpacity
    onPress={() => {
      setTimer(30);

      // Call resend OTP API here
    }}>
    <Text
      style={[
        styles.resendText,
        {
          color: '#2F5BFF',
          fontWeight: '700',
        },
      ]}>
      Resend OTP
    </Text>
  </TouchableOpacity>
)}
      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyText}>
          Verify
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 30,
  },

  logo: {
    width: 130,
    height: 130,
  },

  partner: {
    color: '#2F5BFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -10,
  },

  title: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },

  otpContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },

  otpBox: {
    width: 55,
    height: 50,
    borderWidth: 1,
    borderColor: '#2F5BFF',
    borderRadius: 10,
    backgroundColor: '#CFD9FF',
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },

  resendText: {
    marginTop: 25,
    color: '#000',
    fontSize: 17,
  },

  verifyButton: {
    marginTop: 55,
    width: 180,
    height: 55,
    backgroundColor: '#2F5BFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  verifyText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
});