import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  Text,
  DrawerOverlay,
  Flex,
  Icon,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { DeltaStatic } from 'quill'
import { fr } from 'date-fns/locale'
import React, { useState } from 'react'
import { HistoryItem, Study } from '../../common/types'
import format from 'date-fns/format'
import { MdHistory } from 'react-icons/md'
import ReactQuill from 'react-quill'

interface Props {
  history: Study['history']
  onRestore: (item: HistoryItem) => void
}

const modules = {
  toolbar: false,
}

const History = ({ history, onRestore }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setItem] = useState(history?.[0])

  return (
    <>
      <Center
        role="button"
        bg="white"
        w="38px"
        h="38px"
        ml="s"
        mb="m"
        borderRadius="full"
        pos="relative"
        zIndex={2}
        onClick={onOpen}
      >
        <Icon color="primary" as={MdHistory} fontSize={22} />
      </Center>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0}>
              <Flex h="100%">
                <Box flex={1} height="100%" overflow="auto" p="xl">
                  <ReactQuill
                    key={selectedItem?.id}
                    theme="snow"
                    value={selectedItem?.content as DeltaStatic}
                    scrollingContainer=".right-container"
                    placeholder="Prenez une grande respiration, et commencez votre étude ici..."
                    readOnly
                    modules={modules}
                  />
                </Box>
                <Box w={250} borderColor="lightGrey" borderLeftWidth={1}>
                  <Box p="m">
                    <Text size="l">Historique</Text>
                    <Text size="s" color="grey" mt="s">
                      Les sauvegardes sont effectuées toutes les 5 minutes.
                    </Text>
                  </Box>
                  {history?.map((item) => (
                    <Box
                      role="button"
                      onClick={() => setItem(item)}
                      key={item.id}
                      borderColor="lightGrey"
                      borderBottomWidth={1}
                      p="m"
                      bg={selectedItem?.id === item.id ? 'lightGrey' : 'white'}
                    >
                      <Text
                        size="m"
                        color={
                          selectedItem?.id === item.id ? 'primary' : 'grey'
                        }
                      >
                        {format(item.modified_at, 'dd MMM yyyy à hh:mm', {
                          locale: fr,
                        })}
                      </Text>
                    </Box>
                  ))}
                  <Center p="m">
                    <Button
                      size="s"
                      disabled={!selectedItem}
                      onClick={() => {
                        if (!!selectedItem) {
                          onRestore(selectedItem)
                          onClose()
                        }
                      }}
                    >
                      Restaurer
                    </Button>
                  </Center>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default History
