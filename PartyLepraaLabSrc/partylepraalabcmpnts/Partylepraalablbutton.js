import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../partylepraalabstr/partylepraalabmuscntx';

const lepraaLabFont = Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';

const Partylepraalabbutton = ({
  btnTitle,
  btnWidth = 260,
  isDisabled = false,
  btnColor = ['#144E12', '#2EB42A'],
  onPress = () => {},
}) => {
  const { LepraaLabButtonClickSound, isEnabledLepraaLabSound } = useStore();

  const handlePressLepraaLabBtn = () => {
    if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();

    onPress();
  };
  return (
    <TouchableOpacity
      onPress={handlePressLepraaLabBtn}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={btnColor}
        style={{
          borderRadius: 22,
          width: btnWidth,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            height: 90,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: '#FFFE53',
            borderRadius: 22,
          }}
        >
          <Text style={styles.lepralaabBtnText}>{btnTitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lepralaabBtnText: {
    fontSize: 32,
    color: '#FFFE53',
    fontFamily: lepraaLabFont,
  },
});

export default Partylepraalabbutton;
