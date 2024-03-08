import {
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Image,
  ModalHeader,
  Pressable,
  View,
  ModalFooter,
  CheckIcon
} from '@gluestack-ui/themed';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import { TeamsManager } from '../managers/TeamsManager';
import { SearchCharacterModal } from './SearchCharacterModal';
import { Button, ButtonText, ButtonIcon } from '@gluestack-ui/themed';

type Props = {
  onClose: () => void;
  showModal: boolean;
}

export const AddTeamModal = forwardRef(({ onClose, showModal }: Props, ref: ForwardedRef<unknown>): JSX.Element => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<Character | undefined>>(Array.from({ length: 6 }));
  const [characterEmplacementId, setCharacterEmplacementId] = useState<number>();
  const searchModalRef = useRef(null);

  const showSearchModal = (emplacementId: number): void => {
    setCharacterEmplacementId(emplacementId);
    setSearchModalVisible(true);
  }

  const saveTeam = async (): Promise<void> => {
    await TeamsManager.SaveNewTeam();
    onClose();
    setTeamMembers(Array.from({ length: 6 }));
  }

  useEffect(() => {
    const onTeamChange = (): void => {
      const updatedTeamMembers: Array<Character | undefined> = Array.from({ length: 6 }).map((_, id: number) => TeamsManager.GetCharacter(id));
      setTeamMembers(updatedTeamMembers);
    }

    TeamsManager.OnAddTeammate.add(onTeamChange);

    return (): void => {
      TeamsManager.OnAddTeammate.remove(onTeamChange);
    }
  }, [])

  return (
    <>
      <Modal
        size="lg"
        isOpen={showModal}
        onClose={onClose}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Créer une équipe</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View gap="$5" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
              {teamMembers.map((character, id) => (
                <Pressable
                  onPress={() => showSearchModal(id)}
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
                  {!character
                    ? <Ionicons size={30} name="person" />
                    : <Image
                      style={{ objectFit: 'contain' }}
                      alt={character.name}
                      source={{ uri: ApiRoutesId.ASSETS + character.image }}
                    />
                  }
                </Pressable>
              ))}
            </View>
          </ModalBody>
          <ModalFooter>
            <Button
              gap="$3"
              bg="$primary500"
              $hover-bg="$primary400"
              width="$1/2"
              borderRadius="$lg"
              onPress={saveTeam}
            >
              <ButtonText color="$white">Sauvegarder</ButtonText>
              <ButtonIcon as={CheckIcon} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SearchCharacterModal
        ref={searchModalRef}
        visible={searchModalVisible}
        setVisible={setSearchModalVisible}
        emplacementId={characterEmplacementId as number}
        onClose={() => setSearchModalVisible(false)}
      />
    </>
  )
})