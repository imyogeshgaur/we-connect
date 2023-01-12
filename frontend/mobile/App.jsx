import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './screens/auth/Auth';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Auth">
        <Stack.Screen 
        name="Login" 
        component={Auth} 
        options={{
          title: "We Connect",
          headerStyle: {
            backgroundColor: "rgb(212, 111, 93)"
          },
          headerTitleAlign: "center"
        }}
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: "We Connect",
          headerStyle: {
            backgroundColor: "rgb(212, 111, 93)"
          },
          headerTitleAlign: "center"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}