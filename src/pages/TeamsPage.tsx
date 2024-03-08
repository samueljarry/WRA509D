import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  FlatList,
  Text,
  View,
} from '@gluestack-ui/themed';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AddTeamModal } from '../components/AddTeamModal';
import { Team as TeamType, TeamsManager } from '../managers/TeamsManager';
import { Team } from '../components/Team';

export const TeamsPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState<Array<TeamType>>();
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
      console.log(TeamsManager.Teams, 'teamsmanager')
    }

    TeamsManager.OnTeamsUpdate.add(onTeamsChange);

    return (): void => {
      TeamsManager.OnTeamsUpdate.remove(onTeamsChange);
    }
  }, [])

  useEffect(() => {
    console.log('teams')
  }, [teams])

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
      <View>
        <FlatList
          numColumns={1}
          // contentContainerStyle={styles.container}
          gap="$4"
          data={teams}
          renderItem={(team: Array<Character>) => <Team team={team} />}
        // onEndReached={() => {
        //   setPage((prevState) => prevState + 1);
        // }}
        // onEndReachedThreshold={0.5}
        />
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