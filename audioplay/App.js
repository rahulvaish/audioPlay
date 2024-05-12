import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import Audio from './component/audio/Audio';
import AudioTrackPlay from './component/audio/AudioTrackPlay';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{ 
          headerStyle: { backgroundColor: '#ecf0fe' }, 
          headerTintColor: '#6D2AAB' }}// This is the color of Play Button
        >
        <stack.Screen 
          name='Back' 
          component={Bottom}
          options={{
            headerShown: false,
          }} />
        <stack.Screen name='Audio' component={Audio} />
        <stack.Screen name="Player" component={AudioTrackPlay}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

export const Bottom = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={
        { tabBarStyle: { backgroundColor: 'white' } }
      }>
      <Tab.Screen
        name="Audio"
        component={Audio}
        listeners={{
          tabPress: () => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        }}
        options={{
          headerStyle:{backgroundColor:'white'},
          headerTintColor:'black',
          headerShown: false,
          tabBarActiveBackgroundColor: 'white',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" color={color} size={size} />
          ),
        }}
      />

       
    
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  podcastIcon: {
    height: 35,
    width: 35,
  }
});
