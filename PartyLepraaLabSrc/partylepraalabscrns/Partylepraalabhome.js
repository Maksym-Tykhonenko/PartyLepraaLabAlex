import Partylepraalablayout from '../partylepraalabcmpnts/Partylepraalablayout';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Partylepraalabbutton from '../partylepraalabcmpnts/Partylepraalablbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../partylepraalabstr/partylepraalabmuscntx';
import Sound from 'react-native-sound';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const lepraaLabFont = Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';

const { height } = Dimensions.get('window');

const Partylepraalabhome = () => {
  const navigation = useNavigation();

  const {
    isEnabledLepraaLabMusic,
    setIsEnabledLepraaLabMusic,
    setIsEnabledLepraaLabSound,
  } = useStore();
  const [lepraaLabTrackIndex, setLepraaLabTrackIndex] = useState(0);
  const [lepraaLabSound, setLepraaLabSound] = useState(null);
  const lepraaLabTracks = [
    'children-games-239828.mp3',
    'children-games-239828.mp3',
  ];

  useFocusEffect(
    useCallback(() => {
      loadLepraaLabBgMusic();
      loadLepraaLabSound();
    }, []),
  );

  useEffect(() => {
    playLepraaLabTrack(lepraaLabTrackIndex);

    return () => {
      if (lepraaLabSound) {
        lepraaLabSound.stop(() => {
          lepraaLabSound.release();
        });
      }
    };
  }, [lepraaLabTrackIndex]);

  const playLepraaLabTrack = index => {
    if (lepraaLabSound) {
      lepraaLabSound.stop(() => {
        lepraaLabSound.release();
      });
    }

    const trackPath = lepraaLabTracks[index];

    const newLepraaLabSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error', error);
        return;
      }

      newLepraaLabSound.play(success => {
        if (success) {
          setLepraaLabTrackIndex(
            prevIndex => (prevIndex + 1) % lepraaLabTracks.length,
          );
        } else {
          console.log('Error');
        }
      });
      setLepraaLabSound(newLepraaLabSound);
    });
  };

  useEffect(() => {
    const setVolumeMusic = async () => {
      try {
        const lepraaLabMusicValue = await AsyncStorage.getItem(
          'lepraalabmusic',
        );

        const isLepraaLabMusicOn = JSON.parse(lepraaLabMusicValue);
        setIsEnabledLepraaLabMusic(isLepraaLabMusicOn);
        if (lepraaLabSound) {
          lepraaLabSound.setVolume(isLepraaLabMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeMusic();
  }, [lepraaLabSound]);

  useEffect(() => {
    if (lepraaLabSound) {
      lepraaLabSound.setVolume(isEnabledLepraaLabMusic ? 1 : 0);
    }
  }, [isEnabledLepraaLabMusic]);

  const loadLepraaLabBgMusic = async () => {
    try {
      const lepraaLabMusicValue = await AsyncStorage.getItem('lepraalabmusic');
      const isLepraaLabMusicOn = JSON.parse(lepraaLabMusicValue);
      setIsEnabledLepraaLabMusic(isLepraaLabMusicOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadLepraaLabSound = async () => {
    try {
      const lepraaLabSoundValue = await AsyncStorage.getItem('lepraalabsound');
      if (lepraaLabSoundValue !== null) {
        const isLepraaLabSoundOn = JSON.parse(lepraaLabSoundValue);

        setIsEnabledLepraaLabSound(isLepraaLabSoundOn);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Partylepraalablayout>
      <View style={styles.lepralaabContainer}>
        <View style={styles.lepralaabHeader}>
          <View style={{ paddingLeft: 20, width: '60%', gap: 9 }}>
            <Text style={styles.lepralaabText}>Cheers, team!</Text>
            <Text style={styles.lepralaabSubtitle}>
              Ready for some party mayhem?
            </Text>
          </View>
          <Image
            source={require('../../assets/images/lepralabheadim.png')}
            style={{ borderRadius: 22 }}
          />
        </View>

        <Image
          source={require('../../assets/images/lepralabhomeicon.png')}
          style={{ marginBottom: 50 }}
        />

        <View style={styles.lepralaabBottomSheet}>
          <Partylepraalabbutton
            onPress={() => navigation.navigate('Partylepraalabgmpl')}
            btnTitle={'START GAME'}
          />
          <Partylepraalabbutton
            onPress={() => navigation.navigate('Partylepraalabsttgs')}
            btnTitle={'SETTINGS'}
          />
          <Partylepraalabbutton
            onPress={() => navigation.navigate('Partylepraalabgmrls')}
            btnTitle={'GAME RULES'}
          />
        </View>
      </View>
    </Partylepraalablayout>
  );
};

const styles = StyleSheet.create({
  lepralaabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  lepralaabBottomSheet: {
    backgroundColor: '#001205',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 60,
    paddingTop: 40,
    width: '100%',
    flex: 1,
    gap: 24,
  },
  lepralaabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: lepraaLabFont,
  },
  lepralaabSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
  lepralaabBtnText: {
    fontSize: 32,
    color: '#FFFE53',
    fontFamily: lepraaLabFont,
  },
  lepralaabHeader: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 31,
  },
});

export default Partylepraalabhome;
