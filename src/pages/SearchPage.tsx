import { View } from "react-native"
import { Input, InputField, FlatList } from '@gluestack-ui/themed';
import { useState } from 'react';
import { ApiRoutesId } from "../constants/ApiRoutesId";
import { Stand } from '../hooks/useApi';
import { StyleSheet } from "react-native";
import StandCard from '../components/StandCard';

export const SearchPage = (): JSX.Element => {
  const [displayedStands, setDisplayedStands] = useState<Stand[]>();

  const searchStands = async (query: string): Promise<void> => {
    const filteredStands = await fetch(ApiRoutesId.STANDS_QUERY + `name=${query}`).then((res: Response): Promise<Stand[]> => res.json());
    setDisplayedStands(filteredStands);
  }

  return (
    <View>
      <View style={styles.container}>
        <Input variant="rounded" size="md">
          <InputField onChangeText={searchStands} placeholder="Recherche" />
        </Input>
      </View>
      <FlatList
        numColumns={2}
        gap="$4"
        data={displayedStands}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }: { item: Stand }) => <StandCard stand={item} />}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  flatList: {
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
})