import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreensId } from '../constants/ScreensId';
import { DetailsPage } from '../pages/DetailsPage';
import HomePage from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainView = () => (
  <Stack.Navigator>
    <Stack.Screen name={ScreensId.HOME} component={HomePage} />
    <Stack.Screen name={ScreensId.DETAILS} component={DetailsPage} />
  </Stack.Navigator>
)

export const BottomTabs = () => {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ScreensId.MAIN} component={MainView}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name={ScreensId.SEARCH} component={SearchPage}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name={ScreensId.TEAMS} component={MainView}
        options={{
          tabBarLabel: 'Équipes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}