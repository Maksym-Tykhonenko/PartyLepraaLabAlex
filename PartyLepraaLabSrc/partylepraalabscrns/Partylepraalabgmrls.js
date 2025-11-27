import Partylepraalablayout from '../partylepraalabcmpnts/Partylepraalablayout';
import { useNavigation } from '@react-navigation/native';
import Partylepraalabbutton from '../partylepraalabcmpnts/Partylepraalablbutton';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../partylepraalabstr/partylepraalabmuscntx';

const lepraaLabFont = Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';

const { height } = Dimensions.get('window');

const Partylepraalabgmrls = () => {
  const navigation = useNavigation();
  const { isEnabledLepraaLabSound, LepraaLabButtonClickSound } = useStore();

  const shareLepraaLabRules = async () => {
    await Share.share({
      message: `Add players - enter the names of all participants.

Choose the number of rounds - from 10 to 30.

In each round, one symbol is randomly drawn:
🟢 Green clover - motor task
🟡 Golden clover - creative task
🔴 Ladybug - oral task

The application selects the player and shows the task that he must complete.

For the completed task, the player receives 1 point.

After all rounds are completed, the program shows the winner of the party.`,
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

            <Text style={styles.lepralaabText}>Game rules</Text>
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/lepralabheadim.png')}
            style={{ borderRadius: 22 }}
          />
        </View>

        <View style={styles.lepralaabBottomSheet}>
          <ScrollView
            contentContainerStyle={{ gap: 24, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.lepralaabImagesWrapp}>
              <Image
                source={require('../../assets/images/lepralabrules1.png')}
              />
              <Image
                source={require('../../assets/images/lepralabrules2.png')}
              />
              <Image
                source={require('../../assets/images/lepralabrules3.png')}
              />
            </View>

            <Text
              style={styles.lepralaabSubtitle}
            >{`Add players - enter the names of all participants.

Choose the number of rounds - from 10 to 30.

In each round, one symbol is randomly drawn:
🟢 Green clover - motor task
🟡 Golden clover - creative task
🔴 Ladybug - oral task

The application selects the player and shows the task that he must complete.

For the completed task, the player receives 1 point.

After all rounds are completed, the program shows the winner of the party.`}</Text>
            <Partylepraalabbutton
              onPress={shareLepraaLabRules}
              btnTitle={'SHARE RULES'}
            />
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
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
  lepralaabBottomSheet: {
    backgroundColor: '#001205',
    borderRadius: 22,
    paddingHorizontal: 33,
    paddingTop: 30,
    width: '100%',
    gap: 24,
    height: '65%',
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
    gap: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
});

export default Partylepraalabgmrls;
