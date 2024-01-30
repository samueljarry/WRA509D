import { Box, Heading, Image, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ApiRoutesId } from "../constants/ApiRoutesId";
import { ScreensId } from '../constants/ScreensId';
import { Stand } from "../hooks/useApi";

type Props = {
  stand: Stand;
};
function StandCard({ stand }: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={stand.name + stand.id}
      onPress={() => navigation.navigate(ScreensId.DETAILS as never, { ...stand, uri: ApiRoutesId.ASSETS + stand.image })}
    >
      <Box
        borderColor='$borderLight200'
        borderRadius='$lg'
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
              uri: ApiRoutesId.ASSETS + stand.image
            }}
          />
        </Box>
        <VStack px='$6' pt='$4' pb='$6'>
          <Heading $dark-color="$textLight200" size='sm'>
            {stand.name}
          </Heading>
          <Text fontSize='$sm' color='$pink600'>
            Voir plus
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}

export default StandCard;