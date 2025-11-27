import React, { useState } from 'react';
import Partylepraalablayout from '../partylepraalabcmpnts/Partylepraalablayout';
import WebView from 'react-native-webview';
import { partylepraalabloaderhtml } from '../partylepraalabcnsts/partylepraalabloaderhtml';
import { useNavigation } from '@react-navigation/native';
import Partylepraalabbutton from '../partylepraalabcmpnts/Partylepraalablbutton';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import { useStore } from '../partylepraalabstr/partylepraalabmuscntx';
import {
  movementTasks,
  creativeTasks,
  oralTasks,
} from '../partylepraalabcnsts/partylepraalabtsks';

const { height } = Dimensions.get('window');

const partyLepraaLabMaxPlayers = 3;

const partyLepraaLabFont =
  Platform.OS === 'ios' ? 'LilitaOne' : 'LilitaOne-Regular';

const Partylepraalabgmpl = () => {
  const [partyLepraaLabStage, setPartyLepraaLabStage] = useState('add');
  const [partyLepraaLabRounds, setPartyLepraaLabRounds] = useState(null);
  const [partyLepraaLabPlayers, setPartyLepraaLabPlayers] = useState(['']);
  const [partyLepraaLabGamePlayers, setPartyLepraaLabGamePlayers] = useState(
    [],
  );
  const [partyLepraaLabCurrentRound, setPartyLepraaLabCurrentRound] =
    useState(1);
  const [
    partyLepraaLabCurrentPlayerIndex,
    setPartyLepraaLabCurrentPlayerIndex,
  ] = useState(0);
  const [partyLepraaLabElement, setPartyLepraaLabElement] = useState(null);
  const [partyLepraaLabTask, setPartyLepraaLabTask] = useState('');
  const [partyLepraaLabScores, setPartyLepraaLabScores] = useState({});
  const partyLepraaLabNavigation = useNavigation();
  const { isEnabledLepraaLabSound, LepraaLabButtonClickSound } = useStore();

  const partyLepraaLabGenerateRandom = () => {
    const list = ['green', 'gold', 'red'];
    const el = list[Math.floor(Math.random() * list.length)];
    setPartyLepraaLabElement(el);

    if (el === 'green') {
      setPartyLepraaLabTask(
        movementTasks[Math.floor(Math.random() * movementTasks.length)],
      );
    } else if (el === 'gold') {
      setPartyLepraaLabTask(
        creativeTasks[Math.floor(Math.random() * creativeTasks.length)],
      );
    } else {
      setPartyLepraaLabTask(
        oralTasks[Math.floor(Math.random() * oralTasks.length)],
      );
    }
  };

  const partyLepraaLabStartGame = () => {
    const validPlayers = partyLepraaLabPlayers
      .map(p => p.trim())
      .filter(Boolean);
    if (validPlayers.length < 2 || !partyLepraaLabRounds) return;

    const initialScores = {};
    validPlayers.forEach(p => {
      initialScores[p] = { green: 0, gold: 0, red: 0 };
    });

    setPartyLepraaLabGamePlayers(validPlayers);
    setPartyLepraaLabScores(initialScores);
    setPartyLepraaLabCurrentRound(1);
    setPartyLepraaLabCurrentPlayerIndex(0);

    setPartyLepraaLabStage('loader');
    setTimeout(() => {
      partyLepraaLabGenerateRandom();
      setPartyLepraaLabStage('game');
    }, 4000);
  };

  const partyLepraaLabSuccess = () => {
    const player = partyLepraaLabGamePlayers[partyLepraaLabCurrentPlayerIndex];
    setPartyLepraaLabScores(prev => ({
      ...prev,
      [player]: {
        ...prev[player],
        [partyLepraaLabElement]: prev[player][partyLepraaLabElement] + 1,
      },
    }));

    partyLepraaLabNextStep();
  };

  const partyLepraaLabFail = () => {
    partyLepraaLabNextStep();
  };

  const partyLepraaLabNextStep = () => {
    const lastPlayer =
      partyLepraaLabCurrentPlayerIndex === partyLepraaLabGamePlayers.length - 1;

    if (lastPlayer) {
      if (partyLepraaLabCurrentRound === partyLepraaLabRounds) {
        setPartyLepraaLabStage('result');
      } else {
        setPartyLepraaLabCurrentRound(r => r + 1);
        setPartyLepraaLabCurrentPlayerIndex(0);
        partyLepraaLabGenerateRandom();
      }
    } else {
      setPartyLepraaLabCurrentPlayerIndex(i => i + 1);
      partyLepraaLabGenerateRandom();
    }
  };

  const partyLepraaLabGetWinner = () => {
    let best = '';
    let bestScore = -1;

    Object.keys(partyLepraaLabScores).forEach(p => {
      const total =
        partyLepraaLabScores[p].green +
        partyLepraaLabScores[p].gold +
        partyLepraaLabScores[p].red;

      if (total > bestScore) {
        bestScore = total;
        best = p;
      }
    });

    return best;
  };

  if (partyLepraaLabStage === 'add') {
    return (
      <Partylepraalablayout>
        <View style={styles.partyLepraaLabScreen}>
          <View style={styles.partyLepraaLabHeader}>
            <TouchableOpacity
              onPress={() => {
                partyLepraaLabNavigation.goBack('');
                if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
              }}
              activeOpacity={0.7}
              style={styles.partyLepraaLabBackBtnWrapp}
            >
              <Image source={require('../../assets/images/lepralabback.png')} />
              <Text style={styles.partyLepraaLabText}>Add players</Text>
            </TouchableOpacity>

            <Image
              source={require('../../assets/images/lepralabheadim.png')}
              style={{ borderRadius: 22 }}
            />
          </View>

          <View style={styles.partyLepraaLabChooseCnt}>
            <Text style={styles.partyLepraaLabSubtitle}>Choose a round:</Text>

            <View style={styles.partyLepraaLabRoundRow}>
              {[10, 15, 25, 30].map(r => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.partyLepraaLabRoundBtn,
                    partyLepraaLabRounds === r &&
                      styles.partyLepraaLabRoundBtnActive,
                  ]}
                  onPress={() => {
                    setPartyLepraaLabRounds(r);
                    if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
                  }}
                >
                  <Text style={styles.partyLepraaLabRoundText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.partyLepraaLabInputCont}>
            {partyLepraaLabPlayers.map((name, index) => {
              const isLast = index === partyLepraaLabPlayers.length - 1;
              const label = `Player ${index + 1}`;
              const canAddMore =
                partyLepraaLabPlayers.length < partyLepraaLabMaxPlayers;

              return (
                <View key={index} style={{ marginTop: 16 }}>
                  <Text style={styles.partyLepraaLabSubtitle}>{label}</Text>

                  <View style={styles.partyLepraaLabInputRow}>
                    <TextInput
                      placeholder="Enter name"
                      placeholderTextColor="#aaa"
                      style={styles.partyLepraaLabInput}
                      value={name}
                      onChangeText={text => {
                        setPartyLepraaLabPlayers(prev =>
                          prev.map((p, i) => (i === index ? text : p)),
                        );
                      }}
                    />

                    {isLast && canAddMore ? (
                      <TouchableOpacity
                        style={styles.partyLepraaLabAddBtn}
                        onPress={() => {
                          if (isEnabledLepraaLabSound)
                            LepraaLabButtonClickSound();
                          if (!name.trim()) return;
                          setPartyLepraaLabPlayers(prev => [...prev, '']);
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.partyLepraaLabRemoveBtn}
                        onPress={() => {
                          setPartyLepraaLabPlayers(prev => {
                            const updated = prev.filter((_, i) => i !== index);
                            return updated.length === 0 ? [''] : updated;
                          });
                          if (isEnabledLepraaLabSound)
                            LepraaLabButtonClickSound();
                        }}
                      >
                        <Image
                          source={require('../../assets/images/lepralabremove.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <Partylepraalabbutton
            onPress={partyLepraaLabStartGame}
            btnTitle={'START'}
            isDisabled={partyLepraaLabPlayers.some(name => !name.trim())}
          />
        </View>
      </Partylepraalablayout>
    );
  }

  if (partyLepraaLabStage === 'loader') {
    return (
      <Partylepraalablayout>
        <View style={styles.partyLepraaLabLoaderScreen}>
          <WebView
            originWhitelist={['*']}
            source={{ html: partylepraalabloaderhtml }}
            style={{
              width: 220,
              height: 150,
              backgroundColor: 'transparent',
            }}
            scrollEnabled={false}
          />
        </View>
      </Partylepraalablayout>
    );
  }

  if (partyLepraaLabStage === 'game') {
    if (!partyLepraaLabGamePlayers.length) return null;

    const player = partyLepraaLabGamePlayers[partyLepraaLabCurrentPlayerIndex];

    const icon =
      partyLepraaLabElement === 'green'
        ? require('../../assets/images/lepralabrules1.png')
        : partyLepraaLabElement === 'gold'
        ? require('../../assets/images/lepralabrules2.png')
        : require('../../assets/images/lepralabrules3.png');

    return (
      <Partylepraalablayout>
        <View style={styles.partyLepraaLabGameScreen}>
          <View style={styles.partyLepraaLabRoundCont}>
            <TouchableOpacity
              onPress={() => {
                partyLepraaLabNavigation.goBack('');
                if (isEnabledLepraaLabSound) LepraaLabButtonClickSound();
              }}
              activeOpacity={0.7}
            >
              <Image source={require('../../assets/images/lepralabhome.png')} />
            </TouchableOpacity>

            <Text style={styles.partyLepraaLabRoundHeaderText}>
              Round {partyLepraaLabCurrentRound}/{partyLepraaLabRounds}
            </Text>
          </View>

          <View
            style={[
              styles.partyLepraaLabCard,
              partyLepraaLabElement === 'green'
                ? { backgroundColor: '#16C60C' }
                : partyLepraaLabElement === 'gold'
                ? { backgroundColor: '#C6C00C' }
                : { backgroundColor: '#C60C0C' },
            ]}
          >
            <Text style={styles.partyLepraaLabCardTitle}>
              TASK FOR: {player.toUpperCase()}
            </Text>

            <Text style={styles.partyLepraaLabCardTask}>
              {partyLepraaLabTask}
            </Text>

            <View
              style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            >
              <Image
                source={require('../../assets/images/lepralabheadim.png')}
              />
              <Image source={icon} />
            </View>
          </View>

          <Partylepraalabbutton
            onPress={partyLepraaLabSuccess}
            btnTitle={'Nice, next player'}
            btnWidth={305}
          />

          <View style={{ height: 16 }} />

          <Partylepraalabbutton
            onPress={partyLepraaLabFail}
            btnTitle={'Not good'}
            btnColor={['#4E1212', '#B42A2A']}
          />
        </View>
      </Partylepraalablayout>
    );
  }

  if (partyLepraaLabStage === 'result') {
    const winner = partyLepraaLabGetWinner();

    return (
      <Partylepraalablayout>
        <View style={styles.partyLepraaLabResultScreen}>
          <View style={styles.partyLepraaLabResCont}>
            <Text style={styles.partyLepraaLabResultTitle}>RESULT OF GAME</Text>
          </View>

          <Text style={styles.partyLepraaLabResultWinner}>
            Champion of the Party!
          </Text>

          <Text style={styles.partyLepraaLabResultPlayer}>{winner}</Text>

          <View style={styles.partyLepraaLabScoreCont}>
            <View style={styles.partyLepraaLabScoreRow}>
              <View style={styles.partyLepraaLabScoreBox}>
                <Image
                  source={require('../../assets/images/lepralabrules1.png')}
                  style={styles.partyLepraaLabScoreIcon}
                />
                <View style={styles.partyLepraaLabScoreNumWrapper}>
                  <Text style={styles.partyLepraaLabScoreNum}>
                    {partyLepraaLabScores[winner].gold}
                  </Text>
                </View>
              </View>

              <View style={styles.partyLepraaLabScoreBox}>
                <Image
                  source={require('../../assets/images/lepralabrules2.png')}
                  style={styles.partyLepraaLabScoreIcon}
                />
                <View style={styles.partyLepraaLabScoreNumWrapper}>
                  <Text style={styles.partyLepraaLabScoreNum}>
                    {partyLepraaLabScores[winner].red}
                  </Text>
                </View>
              </View>

              <View style={styles.partyLepraaLabScoreBox}>
                <Image
                  source={require('../../assets/images/lepralabrules3.png')}
                  style={styles.partyLepraaLabScoreIcon}
                />
                <View style={styles.partyLepraaLabScoreNumWrapper}>
                  <Text style={styles.partyLepraaLabScoreNum}>
                    {partyLepraaLabScores[winner].green}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ gap: 16 }}>
            <Partylepraalabbutton
              onPress={() =>
                Share.share({
                  message: `Champion: ${winner}!\nGreen clover: ${partyLepraaLabScores[winner].green}\nGold clover: ${partyLepraaLabScores[winner].gold}\nLadybug: ${partyLepraaLabScores[winner].red}`,
                })
              }
              btnTitle={'SHARE'}
            />

            <Partylepraalabbutton
              onPress={() => {
                setPartyLepraaLabStage('add');
                setPartyLepraaLabCurrentRound(1);
                setPartyLepraaLabCurrentPlayerIndex(0);
                setPartyLepraaLabScores({});
                setPartyLepraaLabGamePlayers([]);
                setPartyLepraaLabPlayers(['']);
                setPartyLepraaLabRounds(null);
              }}
              btnTitle={'RESTART GAME'}
            />

            <Partylepraalabbutton
              onPress={() => partyLepraaLabNavigation.goBack('')}
              btnTitle={'EXIT TO HOME'}
            />
          </View>
        </View>
      </Partylepraalablayout>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  partyLepraaLabScreen: {
    flex: 1,
    padding: 22,
    paddingTop: height * 0.06,
  },
  partyLepraaLabHeader: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingLeft: 20,
  },
  partyLepraaLabBackBtnWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  partyLepraaLabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabChooseCnt: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 40,
    paddingTop: 20,
  },
  partyLepraaLabSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabRoundRow: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  partyLepraaLabRoundBtn: {
    height: 53,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    width: 53,
    alignItems: 'center',
  },
  partyLepraaLabRoundBtnActive: {
    backgroundColor: '#2EB42A',
    borderColor: '#FFFE53',
  },
  partyLepraaLabRoundText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabInputCont: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    marginBottom: 24,
    padding: 25,
    paddingTop: 10,
    paddingBottom: 34,
    gap: 10,
  },
  partyLepraaLabInputRow: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  partyLepraaLabInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 14,
    color: '#fff',
    paddingVertical: 26,
  },
  partyLepraaLabAddBtn: {
    width: 53,
    height: 53,
    backgroundColor: '#2EB42A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFE53',
  },
  partyLepraaLabRemoveBtn: {
    width: 53,
    height: 53,
    backgroundColor: '#2EB42A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFE53',
  },
  partyLepraaLabLoaderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partyLepraaLabGameScreen: {
    flex: 1,
    padding: 22,
    paddingTop: 50,
    alignItems: 'center',
  },
  partyLepraaLabRoundCont: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    marginBottom: 14,
    padding: 29,
    paddingVertical: 47,
  },
  partyLepraaLabRoundHeaderText: {
    color: '#fff',
    fontSize: 28,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabCard: {
    width: '100%',
    padding: 22,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 70,
    paddingBottom: 0,
  },
  partyLepraaLabCardTitle: {
    color: '#001205',
    fontSize: 24,
    fontFamily: partyLepraaLabFont,
    marginBottom: 20,
  },
  partyLepraaLabCardTask: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: partyLepraaLabFont,
    paddingHorizontal: 30,
  },
  partyLepraaLabResultScreen: {
    flex: 1,
    padding: 22,
    paddingTop: 60,
    alignItems: 'center',
  },
  partyLepraaLabResCont: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
    marginBottom: 34,
    padding: 25,
  },
  partyLepraaLabResultTitle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabResultWinner: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 20,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabResultPlayer: {
    color: '#FFFE53',
    fontSize: 38,
    marginBottom: 35,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabScoreCont: {
    backgroundColor: '#001205',
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 25,
  },
  partyLepraaLabScoreRow: {
    flexDirection: 'row',
    gap: 30,
  },
  partyLepraaLabScoreBox: {
    backgroundColor: '#001205',
    borderRadius: 16,
    alignItems: 'center',
  },
  partyLepraaLabScoreIcon: {
    width: 45,
    height: 52,
    marginBottom: 10,
  },
  partyLepraaLabScoreNum: {
    color: '#fff',
    fontSize: 24,
    fontFamily: partyLepraaLabFont,
  },
  partyLepraaLabScoreNumWrapper: {
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFE53',
    borderRadius: 10,
  },
});

export default Partylepraalabgmpl;
