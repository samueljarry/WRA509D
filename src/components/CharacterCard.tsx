import { Box, Heading, Image, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ApiRoutesId } from "../constants/ApiRoutesId";

type Props = {
  character: Character;
  onPress: () => void;
};

export const CharacterCard = ({ character, onPress }: Props): JSX.Element => {
  return (
    <TouchableOpacity
      key={character.name + character.id}
      onPress={onPress}
    >
      <Box
        borderColor='$borderLight200'
        borderRadius='$lg'
        width="$full"
        borderWidth='$1'
        my="$1"
        overflow="hidden"
        $dark-bg="$backgroundDark900"
        $dark-borderColor="$borderDark800"
      >
        <Box>
          <Image
            style={{
              width: 192,
              height: 160,
              objectFit: 'contain'
            }}
            alt="stand"
            source={{
              uri: ApiRoutesId.ASSETS + character.image
            }}
          />
        </Box>
        <VStack px='$6' pt='$4' pb='$6'>
          <Heading $dark-color="$textLight200" size='sm'>
            {character.name}
          </Heading>
          <Text fontSize='$sm' color='$pink600'>
            Ajouter
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}