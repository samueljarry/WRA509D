import { StyleSheet } from "react-native";
import { FlatList } from '@gluestack-ui/themed';
import StandCard from "../components/StandCard";
import { ApiRoutesId } from "../constants/ApiRoutesId";
import useApi, { Stand } from "../hooks/useApi";
import { useState } from "react";

function HomePage() {
  const [page, setPage] = useState(1);
  const datas = useApi<Stand>(ApiRoutesId.STANDS, { page });

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.container}
      gap="$4"
      data={datas}
      renderItem={({ item }: { item: Stand }) => <StandCard stand={item} />}
      onEndReached={() => {
        setPage((prevState) => prevState + 1);
      }}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
});

export default HomePage;