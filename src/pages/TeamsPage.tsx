import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  View,
} from '@gluestack-ui/themed';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AddTeamModal } from '../components/AddTeamModal';
import { Team, TeamsManager } from '../managers/TeamsManager';
import { TeamsAction } from '../utils/TeamsAction';

export const TeamsPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState<Set<Team>>();
  const ref = useRef();

  const createTeam = (): void => {
    setShowModal(true);
    TeamsManager.CreateTeam();
  }

  useEffect(() => {
    TeamsManager.LoadTeams().then(() => {
      setTeams(TeamsManager.Teams);
    });

    const onTeamsChange = (): void => {
      setTeams(TeamsManager.Teams);
      console.log(TeamsManager.Teams)
    }

    TeamsAction.AddOnTeamsChange(onTeamsChange);

    return (): void => {
      TeamsAction.RemoveOnTeamsChange(onTeamsChange);
    }
  }, [])

  return (
    <View style={styles.pageContainer}>
      <View style={styles.buttonContainer}>
        <Button
          gap="$3"
          bg="$primary500"
          $hover-bg="$primary400"
          width="$1/2"
          borderRadius="$lg"
          onPress={createTeam}
        >
          <ButtonText color="$white">Créer une équipe</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </View>
      <AddTeamModal ref={ref} onClose={() => { setShowModal(false) }} showModal={showModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  }
})