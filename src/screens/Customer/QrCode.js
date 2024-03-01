import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

const QrCode = () => {
  const route = useRoute();
  const aaa = route.params?.aaa;
  const qrCodeData = JSON.stringify(aaa);

  return (
    <ImageBackground
      source={require('../../../assets/jobMarket/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        
        <View style={styles.qrCodeContainer}>
        <Text style={styles.title}>Your QR Code</Text>
          <QRCode value={qrCodeData} size={200} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
      marginLeft:23
    },
    qrCodeContainer: {
      backgroundColor: 'rgba(169, 169, 169, 0.7)', // Grey color with 70% transparency
      padding: 20,
      borderRadius: 10,
    },
  });
  
export default QrCode;
