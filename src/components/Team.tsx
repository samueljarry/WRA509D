import { Image, View } from "@gluestack-ui/themed"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiRoutesId } from '../constants/ApiRoutesId';

type Props = {
  team: Array<Character>
}

export const Team = ({ team }: Props) => {
  return (
    <View gap="$5" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
      {team.item.map((character: Character | undefined, id: number) => (
        <View
          key={`team${id}`}
          justifyContent="center"
          alignItems="center"
          p="$5"
          bg="$coolGray300"
          borderRadius="$lg"
          $hover-bg="$gray400"
          width="$1/4"
          height="$1/4"
          aspectRatio="1"
        >
          {character &&
            <Image
              style={{ objectFit: 'contain' }}
              alt={character.name}
              source={{ uri: ApiRoutesId.ASSETS + character.image }}
            />
          }
        </View>
      ))}
    </View>
  )
}