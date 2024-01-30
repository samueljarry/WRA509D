import { Dimensions, StyleSheet, } from 'react-native';
import { BottomTabs } from "./src/components/BottomTabs";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" 

export default function App() {
  return (
    <GluestackUIProvider config={ config }>
      <BottomTabs />
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
