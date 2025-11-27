import { createStackNavigator } from '@react-navigation/stack';
import Partylepraalabhome from '../partylepraalabscrns/Partylepraalabhome';
import Partylepraalabwlcm from '../partylepraalabscrns/Partylepraalabwlcm';
import Partylepraalabgmrls from '../partylepraalabscrns/Partylepraalabgmrls';
import Partylepraalabsttgs from '../partylepraalabscrns/Partylepraalabsttgs';
import Partylepraalabgmpl from '../partylepraalabscrns/Partylepraalabgmpl';

const Stack = createStackNavigator();

const Partylepraalabstck = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Partylepraalabwlcm" component={Partylepraalabwlcm} />
      <Stack.Screen name="Partylepraalabhome" component={Partylepraalabhome} />
      <Stack.Screen
        name="Partylepraalabgmrls"
        component={Partylepraalabgmrls}
      />
      <Stack.Screen
        name="Partylepraalabsttgs"
        component={Partylepraalabsttgs}
      />
      <Stack.Screen name="Partylepraalabgmpl" component={Partylepraalabgmpl} />
    </Stack.Navigator>
  );
};

export default Partylepraalabstck;
