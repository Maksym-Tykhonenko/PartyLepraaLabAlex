import { createContext, useContext, useState } from 'react';
import Sound from 'react-native-sound';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [isEnabledLepraaLabMusic, setIsEnabledLepraaLabMusic] = useState(false);
  const [isEnabledLepraaLabSound, setIsEnabledLepraaLabSound] = useState(false);

  const LepraaLabButtonClickSound = () => {
    const clickSound = new Sound(
      'ui-pop-sound-316482.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('error', error);
          return;
        }
        clickSound.play(success => {
          if (!success) {
            console.log('error');
          }
          clickSound.release();
        });
      },
    );
  };

  const lepraaLabValues = {
    isEnabledLepraaLabMusic,
    setIsEnabledLepraaLabMusic,
    isEnabledLepraaLabSound,
    setIsEnabledLepraaLabSound,
    LepraaLabButtonClickSound,
  };

  return (
    <StoreContext.Provider value={lepraaLabValues}>
      {children}
    </StoreContext.Provider>
  );
};
