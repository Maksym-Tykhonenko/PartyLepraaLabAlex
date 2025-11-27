import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import Partylepraalablayout from './Partylepraalablayout';
import { partylepraalabloaderhtml } from '../partylepraalabcnsts/partylepraalabloaderhtml';

const Partylepraalabldr = () => {
  return (
    <Partylepraalablayout>
      <View style={styles.winnetagolfcont}>
        <Image
          source={require('../../assets/images/lepralabldr.png')}
          style={{ bottom: 45 }}
        />
      </View>

      <View style={styles.winnetagolfwrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: partylepraalabloaderhtml }}
          style={{ width: 220, height: 150, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </Partylepraalablayout>
  );
};

const styles = StyleSheet.create({
  winnetagolfwrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  winnetagolfcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 570,
  },
});

export default Partylepraalabldr;
