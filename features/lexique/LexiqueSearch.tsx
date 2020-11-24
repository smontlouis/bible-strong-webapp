import { Box } from '@chakra-ui/react'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import SearchBox from '../../common/SearchBox'
import { algoliaClient } from '../../helpers/algoliaClient'
import SearchResults from './SearchResults'

const LexiqueSearch = ({
  onSelect,
}: {
  onSelect: ({ title, codeStrong, book }: any) => void
}) => {
  return (
    <InstantSearch indexName="lexique-fr" searchClient={algoliaClient}>
      <Box ml="xl" flex={1} maxW={450} minW={350}>
        <Box
          position="sticky"
          top={0}
          display="flex"
          flexDir="column"
          p="l"
          bg="white"
          borderRadius="xl"
        >
          <SearchBox
            // @ts-ignore
            autoFocus
          />
          <SearchResults
            //@ts-ignore
            onSelect={onSelect}
          />
        </Box>
      </Box>
    </InstantSearch>
  )
}

export default LexiqueSearch
