import { createStackNavigator } from '@react-navigation/stack';
import MyDrawer from './drawerStack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
