import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LexiqueHit } from '../../common/types'
import { Hit } from 'react-instantsearch-core'
import Highlight from '../../common/Highlight'
import Snippet from '../../common/Snippet'

const SearchLexiqueItem = ({
  hit,
  onSelect,
}: {
  hit: Hit<LexiqueHit>
} & { onSelect: (...params: any) => void }) => {
  return (
    <Box
      p="l"
      cursor="pointer"
      borderRadius="l"
      bg="white"
      borderWidth={1}
      borderColor="lightGrey"
      mt="s"
      transition="0.5s ease"
      _hover={{
        transform: 'scale(1.02)',
        boxShadow: ' #5983f033 1px 15px 13px -6px',
      }}
      onClick={() =>
        onSelect({
          title: hit.Mot,
          codeStrong: hit.Code,
          book: hit.Grec ? 40 : 1,
          phonetique: hit.Phonetique,
          original: hit.Hebreu || hit.Grec,
        })
      }
    >
      <Flex alignItems="center">
        <Box flex={1}>
          <Text size="xs" fontWeight={500}>
            {hit.Hebreu || hit.Grec}
          </Text>
          <Highlight
            attribute="Mot"
            hit={hit}
            // @ts-ignore
            fontSize={17}
          />
        </Box>
        <Box borderRadius="s" bg="primary" px="6px" py="5px">
          <Text color="white" size="xs" variant="bold">
            {hit.Code}
          </Text>
        </Box>
      </Flex>
      <Snippet
        attribute="Definition"
        hit={hit}
        //@ts-ignore
        size="s"
        lineHeight={1.1}
        mt="s"
      />
    </Box>
  )
}

export default SearchLexiqueItem
