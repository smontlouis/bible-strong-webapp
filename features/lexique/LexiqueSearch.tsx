import { Box } from '@chakra-ui/react'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import MotionBox from '../../common/MotionBox'
import SearchBox from '../../common/SearchBox'
import { algoliaClient } from '../../helpers/algoliaClient'
import SearchResults from './SearchResults'

const LexiqueSearch = ({
  onSelect,
  onClose,
}: {
  onSelect: ({ title, codeStrong, book }: any) => void
  onClose: () => void
}) => {
  return (
    <InstantSearch indexName="lexique-fr" searchClient={algoliaClient}>
      <MotionBox
        initial="exit"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeOut' }}
        variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
        ml="xl"
        flex={1}
        maxW={450}
        minW={350}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onClose()
          }
        }}
        tabIndex={0}
        _focus={{
          outline: 0,
        }}
      >
        <Box
          position="sticky"
          top={100}
          display="flex"
          flexDir="column"
          bg="white"
          borderRadius="xl"
        >
          <>
            <Box p="l">
              <SearchBox
                // @ts-ignore
                autoFocus
              />
            </Box>

            <SearchResults
              //@ts-ignore
              onSelect={onSelect}
            />
          </>
        </Box>
      </MotionBox>
    </InstantSearch>
  )
}

export default LexiqueSearch
