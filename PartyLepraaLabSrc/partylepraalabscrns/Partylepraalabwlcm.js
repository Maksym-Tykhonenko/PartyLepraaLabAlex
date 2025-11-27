import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Partylepraalablayout from '../partylepraalabcmpnts/Partylepraalablayout';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Partylepraalabbutton from '../partylepraalabcmpnts/Partylepraalablbutton';

const lepraaLabFont = Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';

const Partylepraalabwlcm = () => {
  const [currLepraaLabSlide, setCurrLepraaLabSlide] = useState(0);
  const navigation = useNavigation();

  return (
    <Partylepraalablayout>
      <View style={styles.lepralaabContainer}>
        {currLepraaLabSlide === 0 ? (
          <Image source={require('../../assets/images/lepralabon1.png')} />
        ) : currLepraaLabSlide === 1 ? (
          <>
            <View style={{ flexDirection: 'row', gap: 40 }}>
              <Image source={require('../../assets/images/lepralabon2.png')} />
              <Image source={require('../../assets/images/lepralabon3.png')} />
            </View>
            <Image
              source={require('../../assets/images/lepralabon4.png')}
              style={{ marginBottom: 20, left: 20 }}
            />
          </>
        ) : (
          <Image
            source={require('../../assets/images/lepralabon5.png')}
            style={{ marginBottom: 50 }}
          />
        )}

        <View style={styles.lepralaabBottomSheet}>
          <Text style={styles.lepralaabText}>
            {currLepraaLabSlide === 0
              ? 'The party begins'
              : currLepraaLabSlide === 1
              ? `Three symbols - 
three types of tasks`
              : 'Play and earn points'}
          </Text>
          <Text style={styles.lepralaabSubtitle}>
            {currLepraaLabSlide === 0
              ? `Party Lepra Lab is a fun game for a company.
Add players and get ready for random tasks.`
              : currLepraaLabSlide === 1
              ? `Green clover - motor
Golden clover - creative
 Ladybug - verbal
What falls out is what the selected 
player does.`
              : 'Choose the number of rounds, complete the tasks and see who will be the winner of the party.'}
          </Text>

          <Partylepraalabbutton
            onPress={() =>
              currLepraaLabSlide === 2
                ? navigation.replace('Partylepraalabhome')
                : setCurrLepraaLabSlide(currLepraaLabSlide + 1)
            }
            btnTitle={
              currLepraaLabSlide === 0
                ? `LET’S GO`
                : currLepraaLabSlide === 1
                ? `GOOD`
                : 'START'
            }
          />
        </View>
      </View>
    </Partylepraalablayout>
  );
};

const styles = StyleSheet.create({
  lepralaabContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lepralaabBottomSheet: {
    backgroundColor: '#001205',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 60,
    paddingTop: 40,
    width: '100%',
    minHeight: 350,
  },
  lepralaabText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    fontFamily: lepraaLabFont,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  lepralaabSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  lepralaabBtnText: {
    fontSize: 32,
    color: '#FFFE53',
    fontFamily: lepraaLabFont,
  },
});

export default Partylepraalabwlcm;
