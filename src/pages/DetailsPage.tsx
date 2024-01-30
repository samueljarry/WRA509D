import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Stand } from "../hooks/useApi";
import { ScreensId } from "../constants/ScreensId";
import { Box, Image, VStack, Heading, Text, Center } from '@gluestack-ui/themed';
import { useMemo } from 'react';

type RootStackParamsList = {
  params: Stand & { uri: string };
}

type Props = NativeStackScreenProps<RootStackParamsList, ScreensId.DETAILS>
export const DetailsPage = ({ route }: Props) => {
  const stand = useMemo<Stand & { uri: string }>(() => (route.params as Stand & { uri: string }), [])

  return (
    <Center>
      <Box
        width="$96"
        borderColor="$borderLight200"
        borderRadius="$lg"
        borderWidth="$1"
        my="$4"
        overflow="hidden"
        $base-mx="$5"
        $dark-bg="$backgroundDark900"
        $dark-borderColor="$borderDark800"
      >
        <Box>
          <Image
            alt={stand.name}
            style={{
              objectFit: 'contain'
            }}
            height="$96"
            width="100%"
            source={{
              uri: stand.uri,
            }}
          />
        </Box>
        <VStack px="$6" pt="$4" pb="$6">
          <Heading $dark-color="$textLight200" size="sm">
            {stand.name}
          </Heading>
          <Text my="$1.5" $dark-color="$textLight200" fontSize="$xs">
            Abilities: {stand.abilities}
          </Text>
          <Text my="$1.5" $dark-color="$textLight200" fontSize="$xs">
            Chapter: {stand.chapter}
          </Text>
          {stand.battlecry !== 'none' && (
            <Text
              $dark-color="$textLight200"
              my="$1.5"
              fontSize="$xs"
              isTruncated="true"
            >
              {stand.battlecry}
            </Text>
          )}
        </VStack>
      </Box>
    </Center>
  )
}