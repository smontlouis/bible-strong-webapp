import useBrowserStore, { TabItem } from './browser.store'
import React, { useCallback } from 'react'
import { Box, BoxProps, Flex, HStack, IconButton } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import Tab from './Tab'
import Empty from './Empty'
import { AnimatePresence } from 'framer-motion'
import BibleModule from '../bible/BibleModule'
import DictionnaryModule from '../dictionnary/DictionnaryModule'
import LexiqueModule from '../lexique/LexiqueModule'
import NaveModule from '../nave/NaveModule'
import HomeModule from '../home/HomeModule'
import StudiesModule from '../studies/StudiesModule'
import EditStudyModule from '../studies/EditStudyModule'
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Tabs, useTabPanel } from '../../helpers/tabs'
import Layout from './Layout'
import useGlobalStore from '../../global.store'

const SwitchModule = ({
  tab,
  layoutIndex,
}: {
  tab: TabItem
  layoutIndex: number
}) => {
  switch (tab.type) {
    case 'bible':
      return <BibleModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'dictionnary':
      return <DictionnaryModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'lexique':
      return <LexiqueModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'nave':
      return <NaveModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'home':
      return <HomeModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'studies':
      return <StudiesModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'edit-study':
      return <EditStudyModule tabId={tab.id} layoutIndex={layoutIndex} />
    case 'empty':
      return <Empty tabId={tab.id} layoutIndex={layoutIndex} />
    default:
      return <div>None</div>
  }
}

const Browser = () => {
  const { t } = useTranslation()
  const { fullscreen } = useGlobalStore((state) => ({
    fullscreen: state.fullscreen,
  }))
  const {
    layouts,
    addTab,
    removeTab,
    onIdChange,
    reorderTabs,
    moveTabs,
  } = useBrowserStore()

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return
    }

    if (result.source.droppableId === result.destination.droppableId) {
      reorderTabs(
        result.source.index,
        result.destination.index,
        Number(result.source.droppableId)
      )
    } else {
      moveTabs(
        Number(result.source.droppableId),
        Number(result.destination.droppableId),
        result.source.index,
        result.destination.index
      )
    }
  }, [])

  const onDragStart = useCallback((u: DragStart) => {
    console.log(u)
  }, [])

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Flex height="100%">
        {layouts.map(({ tabId, tabs }, layoutIndex) => (
          <Tabs
            key={layoutIndex}
            id={tabId}
            setKey={(key) => onIdChange(key, layoutIndex)}
          >
            <Layout>
              <Droppable
                droppableId={layoutIndex.toString()}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <Flex
                    sx={{
                      borderTopLeftRadius: 's',
                      borderTopRightRadius: 's',
                      p: 'm',
                      bg: 'greys.0',
                      alignItems: 'center',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    <HStack
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      border="0"
                      as="nav"
                      alignItems="center"
                    >
                      <AnimatePresence>
                        {tabs.map((tab, index) => (
                          <Tab
                            key={tab.id}
                            id={tab.id}
                            tabKey={tab.id}
                            index={index}
                            onClose={() => removeTab(tab.id, layoutIndex)}
                            tabType={tab.type}
                          >
                            {t(tab.name)}
                          </Tab>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </HStack>
                    <IconButton
                      isRound
                      ml="m"
                      size="xxs"
                      variant="icon"
                      aria-label={t('browser.new-tab')}
                      icon={<FiPlus />}
                      onClick={() => {
                        addTab(undefined, layoutIndex)
                      }}
                    />
                  </Flex>
                )}
              </Droppable>

              <Box
                flex={1}
                overflowY="auto"
                bg="white"
                {...(fullscreen && {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                })}
              >
                {tabs.map((tab) => (
                  <TabPanel
                    key={tab.id}
                    tabKey={tab.id}
                    p={0}
                    height="100%"
                    d="flex"
                    flexDir="column"
                  >
                    <SwitchModule tab={tab} layoutIndex={layoutIndex} />
                  </TabPanel>
                ))}
              </Box>
            </Layout>
          </Tabs>
        ))}
      </Flex>
    </DragDropContext>
  )
}

export default Browser

export const TabPanel = ({
  children,
  tabKey,
  ...props
}: BoxProps & {
  children: React.ReactNode
  tabKey: string
}) => {
  const { isActive } = useTabPanel(tabKey)

  return (
    <Box {...props} display={isActive ? 'flex' : 'none'}>
      {children}
    </Box>
  )
}
