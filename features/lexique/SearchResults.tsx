import { Box, Spinner } from '@chakra-ui/react'
import {
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch-dom'
import {
  InfiniteHitsProvided,
  StateResultsProvided,
  BasicDoc,
  Hit,
} from 'react-instantsearch-core'
import React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import compose from '../../helpers/compose'
import SearchLexiqueItem from './SearchLexiqueItem'
import { LexiqueHit } from '../../common/types'

const InfiniteHits = ({
  hits,
  hasMore,
  refineNext,
  searching,
  searchState,
  searchResults,
  error,
  onSelect,
}: InfiniteHitsProvided<Hit<LexiqueHit>> &
  StateResultsProvided<BasicDoc> & {
    onSelect: ({ title, codeStrong, book }: any) => void
  }) => {
  const infiniteRef = useInfiniteScroll({
    loading: searching,
    hasNextPage: hasMore,
    onLoadMore: refineNext,
  })

  if (searchResults?.query && !searchResults?.nbHits) {
    return <div>Rien trouvé</div>
  }

  if (error) {
    return <div>Une erreur</div>
  }

  return (
    <Box height="70vh" overflow="auto" mt="m" borderRadius="l">
      <Box
        // @ts-ignore
        ref={infiniteRef}
      >
        {hits.map((hit) => (
          <SearchLexiqueItem hit={hit} key={hit.objectID} onSelect={onSelect} />
        ))}
        {hasMore && <Spinner />}
      </Box>
    </Box>
  )
}

const MemoizedInfiniteHits = React.memo(InfiniteHits)

export default compose(
  connectInfiniteHits,
  connectStateResults
  // @ts-ignore
)(MemoizedInfiniteHits)
