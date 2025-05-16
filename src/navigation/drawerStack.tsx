import { createDrawerNavigator } from '@react-navigation/drawer';
import CounterRedux from '../screens/ConterRedux';
import Sample from '../screens/Sample';
import Flags from '../screens/Flags';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator defaultStatus="open">
      <Drawer.Screen name="Home" component={CounterRedux} />
      <Drawer.Screen name="Profile" component={Sample} />
      <Drawer.Screen name="Flags" component={Flags} />
    </Drawer.Navigator>
  );
}

export default MyDrawer