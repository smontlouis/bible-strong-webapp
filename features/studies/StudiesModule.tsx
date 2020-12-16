import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Select,
  useToast,
  Text,
} from '@chakra-ui/react'
import { useCollection } from '@nandorojo/swr-firestore'
import React, { useState } from 'react'
import Heading from '../../common/Heading'
import Loading from '../../common/Loading'
import Error from '../../common/Error'
import MotionBox from '../../common/MotionBox'
import { BrowserModuleProps, Study } from '../../common/types'
import { useAuth } from '../../features/auth/AuthProvider'
import StudyItem from '../../features/studies/StudyItem'
import { FiFilePlus } from 'react-icons/fi'
import { firestore } from '../../lib/firebase-app'
import { v4 as uuidv4 } from 'uuid'
import Entrance from '../../common/Entrance'
import { AnimatePresence } from 'framer-motion'
import useBrowserStore, { EditStudyTab } from '../browser/browser.store'

const StudiesModule = ({ tabId, layoutIndex }: BrowserModuleProps) => {
  const { user } = useAuth()
  const toast = useToast()
  const [selectedTag, setSelectedTag] = useState<string>()
  const { loading, data, error, revalidate } = useCollection<Study>('studies', {
    orderBy: ['modified_at', 'desc'],
    where: ['user.id', '==', user?.id],
  })

  const [addTab] = useBrowserStore((state) => [state.addTab])

  const onAddStudy = async () => {
    const uuid = uuidv4()

    await firestore
      .collection('studies')
      .doc(uuid)
      .set({
        id: uuid,
        created_at: Date.now(),
        modified_at: Date.now(),
        title: 'Document sans titre',
        content: null,
        user: {
          id: user?.id,
          displayName: user?.displayName,
          photoUrl: user?.photoURL,
        },
      })

    const tabItem = {
      type: 'edit-study',
      data: {
        studyId: uuid,
      },
    } as EditStudyTab
    addTab(tabItem, layoutIndex)
  }

  const onDeleteStudy = async (id: string) => {
    await firestore.collection('studies').doc(id).delete()

    revalidate()
  }

  const onPublishStudy = async (id: string, value: boolean) => {
    await firestore.collection('studies').doc(id).update({
      published: value,
    })

    revalidate()

    toast({
      title: value ? 'Étude publiée' : 'Étude dépubliée',
      description: value
        ? 'Comptez 2 à 5 minutes pour que le lien soit disponible'
        : 'Comptez 2 à 5 minutes pour que le lien soit supprimé',
      status: 'success',
      duration: 8000,
      isClosable: true,
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <MotionBox flex={1} p="2xl" pt={{ base: '3xl', xl: '2xl' }}>
      <Flex alignItems="center">
        <Box flex={1}>
          <Heading>Études</Heading>
        </Box>
        <Entrance>
          <Select
            value={selectedTag}
            onChange={(v) => setSelectedTag(v.target.value)}
            placeholder="Filter par tag"
          >
            {Object.values(user?.bible.tags || {}).map((tag: any) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Select>
        </Entrance>
        <Entrance>
          <Button ml="l" onClick={onAddStudy} leftIcon={<FiFilePlus />}>
            Nouvelle étude
          </Button>
        </Entrance>
      </Flex>
      <AnimatePresence>
        <Grid
          mt="xl"
          templateColumns="repeat(auto-fit, minmax(200px, 250px))"
          gridGap="l"
        >
          {data?.length ? (
            data
              ?.filter((v) => (selectedTag ? v.tags?.[selectedTag] : true))
              .map((study, i) => (
                <StudyItem
                  key={study.id}
                  study={study}
                  tabId={tabId}
                  layoutIndex={layoutIndex}
                  onDelete={onDeleteStudy}
                  onPublish={onPublishStudy}
                  disabled={user?.subscription !== 'premium'}
                  isFirst={i === 0}
                />
              ))
          ) : (
            <Center p="2xl" gridColumn="-1/1">
              <Text color="grey">Pas encore d'études</Text>
            </Center>
          )}
        </Grid>
      </AnimatePresence>
    </MotionBox>
  )
}

export default StudiesModule
