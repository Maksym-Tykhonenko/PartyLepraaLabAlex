import { ImageBackground, ScrollView } from 'react-native';

const Partylepraalablayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/lepralabbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Partylepraalablayout;
