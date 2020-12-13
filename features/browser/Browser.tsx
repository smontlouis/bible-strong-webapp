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

const renderModule = (tab: TabItem) => {
  switch (tab.type) {
    case 'bible':
      return <div>coucou</div>
    case 'dictionnary':
      return <div>dic</div>
    case 'lexique':
      return <div>lexique</div>
    case 'nave':
      return <div>nave</div>
    case 'empty':
      return <Empty tab={tab} />
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
      <TabList
        border="0"
        d="flex"
        pt="m"
        bg="greys.0"
        as="nav"
        alignItems="center"
        height={54}
      >
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
      </TabList>
      <TabPanels flex={1} overflowY="auto" bg="white">
        {tabs.map((tab) => (
          <TabPanel key={tab.id} id={tab.id}>
            {renderModule(tab)}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default Browser
