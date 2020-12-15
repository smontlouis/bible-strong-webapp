import useBrowserStore, { TabItem } from './browser.store'
import React from 'react'
import {
  IconButton,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
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

const renderModule = (tab: TabItem) => {
  switch (tab.type) {
    case 'bible':
      return <BibleModule tabId={tab.id} />
    case 'dictionnary':
      return <DictionnaryModule tabId={tab.id} />
    case 'lexique':
      return <LexiqueModule tabId={tab.id} />
    case 'nave':
      return <NaveModule tabId={tab.id} />
    case 'home':
      return <HomeModule tabId={tab.id} />
    case 'studies':
      return <StudiesModule tabId={tab.id} />
    case 'edit-study':
      return <EditStudyModule tabId={tab.id} />
    case 'empty':
      return <Empty tabId={tab.id} />
    default:
      return <div>None</div>
  }
}

const Browser = () => {
  const { t } = useTranslation()
  const { tabs, addTab, removeTab, tabIndex, onIndexChange } = useBrowserStore()

  return (
    <Tabs
      index={tabIndex}
      onChange={onIndexChange}
      height="100%"
      d="flex"
      flexDir="column"
    >
      <TabList border="0" d="flex" bg="greys.0" as="nav" alignItems="center">
        <AnimatePresence>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              onClose={() => removeTab(tab.id)}
              tabType={tab.type}
            >
              {t(tab.name)}
            </Tab>
          ))}
          <IconButton
            isRound
            ml="m"
            size="xxs"
            variant="icon"
            aria-label={t('browser.new-tab')}
            icon={<FiPlus />}
            onClick={() => {
              addTab()
            }}
          />
        </AnimatePresence>
      </TabList>

      <TabPanels flex={1} overflowY="auto" bg="white">
        {tabs.map((tab) => (
          <TabPanel
            key={tab.id}
            id={tab.id}
            p={0}
            height="100%"
            d="flex"
            flexDir="column"
          >
            {renderModule(tab)}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default Browser
