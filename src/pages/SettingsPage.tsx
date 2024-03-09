import { StyleSheet } from 'react-native';
import { View, Text } from '@gluestack-ui/themed';

export const SettingsPage = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Paramètres</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
})