import Partylepraalablayout from '../partylepraalabcmpnts/Partylepraalablayout';
import { useNavigation } from '@react-navigation/native';
import Partylepraalabbutton from '../partylepraalabcmpnts/Partylepraalablbutton';
import {
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../partylepraalabstr/partylepraalabmuscntx';

const lepraaLabFont = Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';
const { height } = Dimensions.get('window');

const Partylepraalabsttgs = () => {
  const navigation = useNavigation();
  const {
    isEnabledLepraaLabMusic,
    setIsEnabledLepraaLabMusic,
    isEnabledLepraaLabSound,
    setIsEnabledLepraaLabSound,
    LepraaLabButtonClickSound,
  } = useStore();

  const toggleLepraaLabMusic = async value => {
    if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
    try {
      await AsyncStorage.setItem('lepraalabmusic', JSON.stringify(value));
      setIsEnabledLepraaLabMusic(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleLepraaLabSound = async value => {
    if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
    try {
      await AsyncStorage.setItem('lepraalabsound', JSON.stringify(value));
      setIsEnabledLepraaLabSound(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const shareLepraaLabAboutInfo = async () => {
    await Share.share({
      message: `Party Lepra Lab is a fun game for a company.
Add players, choose rounds and complete random tasks: motor, creative or verbal.
The game counts points and shows who 
won the party.
Works offline, without accounts 
and without ads.`,
    });
  };

  return (
    <Partylepraalablayout>
      <View style={styles.lepralaabContainer}>
        <View style={styles.lepralaabHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('');
              if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
            }}
            activeOpacity={0.7}
            style={styles.lepralaabBackBtnWrapp}
          >
            <Image source={require('../../assets/images/lepralabback.png')} />

            <Text style={styles.lepralaabText}>Settings</Text>
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/lepralabheadim.png')}
            style={{ borderRadius: 22 }}
          />
        </View>

        <View style={styles.lepralaabMusicCont}>
          <View style={styles.lepralaabImagesWrapp}>
            <Text style={styles.lepralaabSubtitle}>Background music:</Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.lepralaabToggleBtnWrapper,
                  isEnabledLepraaLabMusic
                    ? { borderColor: '#fff' }
                    : { borderColor: '#FFFE53' },
                ]}
                onPress={() => toggleLepraaLabMusic(!isEnabledLepraaLabMusic)}
              >
                <LinearGradient
                  colors={
                    isEnabledLepraaLabMusic
                      ? ['#001205', '#001205']
                      : ['#144E12', '#2EB42A']
                  }
                  style={styles.lepralaabToggleBtn}
                >
                  <Text style={styles.lepralaabToggleBtnText}>OFF</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.lepralaabToggleBtnWrapper,
                  isEnabledLepraaLabMusic
                    ? { borderColor: '#FFFE53' }
                    : { borderColor: '#fff' },
                ]}
                onPress={() => toggleLepraaLabMusic(!isEnabledLepraaLabMusic)}
              >
                <LinearGradient
                  colors={
                    isEnabledLepraaLabMusic
                      ? ['#144E12', '#2EB42A']
                      : ['#001205', '#001205']
                  }
                  style={styles.lepralaabToggleBtn}
                >
                  <Text style={styles.lepralaabToggleBtnText}>ON</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.lepralaabMusicCont}>
          <View style={styles.lepralaabImagesWrapp}>
            <Text style={styles.lepralaabSubtitle}>Interface sound:</Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.lepralaabToggleBtnWrapper,
                  isEnabledLepraaLabSound
                    ? { borderColor: '#fff' }
                    : { borderColor: '#FFFE53' },
                ]}
                onPress={() => toggleLepraaLabSound(!isEnabledLepraaLabSound)}
              >
                <LinearGradient
                  colors={
                    isEnabledLepraaLabSound
                      ? ['#001205', '#001205']
                      : ['#144E12', '#2EB42A']
                  }
                  style={[styles.lepralaabToggleBtn]}
                >
                  <Text style={styles.lepralaabToggleBtnText}>OFF</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.lepralaabToggleBtnWrapper,
                  isEnabledLepraaLabSound
                    ? { borderColor: '#FFFE53' }
                    : { borderColor: '#fff' },
                ]}
                onPress={() => toggleLepraaLabSound(!isEnabledLepraaLabSound)}
              >
                <LinearGradient
                  colors={
                    isEnabledLepraaLabSound
                      ? ['#144E12', '#2EB42A']
                      : ['#001205', '#001205']
                  }
                  style={styles.lepralaabToggleBtn}
                >
                  <Text style={styles.lepralaabToggleBtnText}>ON</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.lepralaabTitleAbout}>ABOUT THE APP</Text>
        <Text style={styles.lepralaabSubtitleAbout}>
          Party Lepra Lab is a fun game for a company. Add players, choose
          rounds and complete random tasks: motor, creative or verbal. The game
          counts points and shows who won the party. Works offline, without
          accounts and without ads.
        </Text>
        <Partylepraalabbutton
          onPress={shareLepraaLabAboutInfo}
          btnTitle={'SHARE'}
        />
      </View>
    </Partylepraalablayout>
  );
};

const styles = StyleSheet.create({
  lepralaabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.055,
    padding: 22,
  },
  lepralaabMusicCont: {
    backgroundColor: '#001205',
    borderRadius: 22,
    padding: 20,
    width: '100%',
    gap: 24,
    paddingRight: 16,
    marginBottom: 16,
  },
  lepralaabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: lepraaLabFont,
  },
  lepralaabSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  lepralaabBtnText: {
    fontSize: 32,
    color: '#FFFE53',
    fontFamily: lepraaLabFont,
  },
  lepralaabHeader: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 31,
    paddingLeft: 20,
  },
  lepralaabBackBtnWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lepralaabImagesWrapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lepralaabToggleBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
  },
  lepralaabToggleBtn: {
    borderRadius: 15,
    width: 53,
    alignItems: 'center',
    height: 53,
    justifyContent: 'center',
  },
  lepralaabToggleBtnWrapper: {
    borderWidth: 1,
    borderColor: '#FFFE53',
    borderRadius: 15,
  },
  lepralaabTitleAbout: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: lepraaLabFont,
    marginBottom: 24,
    marginTop: 20,
  },
  lepralaabSubtitleAbout: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Partylepraalabsttgs;
