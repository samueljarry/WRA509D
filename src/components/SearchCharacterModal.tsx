import { forwardRef, ForwardedRef, useState, useEffect, SetStateAction } from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  Input,
  InputField,
  ModalHeader,
  ModalBody,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Center,
} from '@gluestack-ui/themed';
import useApi from '../hooks/useApi';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import { StyleSheet } from 'react-native';
import { CharacterCard } from './CharacterCard';
import { TeamsManager } from '../managers/TeamsManager';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  emplacementId: number;
  onClose: () => void;
}

export const SearchCharacterModal = forwardRef(({ visible, setVisible, onClose, emplacementId }: Props, ref: ForwardedRef<unknown>): JSX.Element => {
  const standUsers = useApi<Character>(ApiRoutesId.CHARACTERS);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(standUsers);

  const searchStandUsers = async (query: string): Promise<void> => {
    const filteredStandUsers = await fetch(ApiRoutesId.CHARACTERS_QUERY + `name=${query}`).then((res: Response): Promise<Character[]> => res.json());
    setFilteredCharacters(filteredStandUsers);
  }

  const addCharacter = (character: Character): void => {
    TeamsManager.SetCharacter(emplacementId, character);
    setVisible(false);
  }

  return (
    <Modal
      style={styles.wrapper}
      size="lg"
      isOpen={visible}
      onClose={onClose}
      finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Personnages</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Center>
            <Input variant="rounded" size="md">
              <InputField onChangeText={searchStandUsers} placeholder="Recherche" />
            </Input>
          </Center>
          <Center>
            {standUsers.map((character: Character) => (
              <CharacterCard key={`character${character.id}`} onPress={() => addCharacter(character)} character={character} />
            ))}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: '80%',
    margin: 'auto',
    top: '10%'
  },
  flatList: {
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
})