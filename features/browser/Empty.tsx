import { TabItem } from './browser.store'
import { Box } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const Empty = ({ tab }: { tab: TabItem }) => {
  const { t } = useTranslation()
  const entities = useMemo(
    () => [
      { name: t('browser.bible'), type: 'bible' },
      { name: t('browser.lexique'), type: 'lexique' },
      { name: t('browser.dictionnary'), type: 'dictionnary' },
      { name: t('browser.nave'), type: 'nave' },
    ],
    []
  )

  return (
    <Box>
      {entities.map((entity) => (
        <Box key={entity.type}>{entity.name}</Box>
      ))}
    </Box>
  )
}

export default Empty
