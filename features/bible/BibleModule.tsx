import BibleHeader from './BibleHeader'
import React, { useRef, useState } from 'react'
import BibleViewer from './BibleViewer'
import MotionBox from '../../common/MotionBox'
import SearchBox from './SearchBox'
import useBibleStore from './bible.store'
import { GenericVerse } from '../../common/types'
import { getReferenceByObject, getReferenceChapter } from './bible.utils'
import { Box } from '@chakra-ui/react'

const BibleModule = () => {
  const { book, chapter, verse, setReference } = useBibleStore()
  const reference = { book, chapter, verse }
  const divRef = useRef<HTMLDivElement>(null)

  const [currentReference, setCurrentReference] = useState<{
    book: number
    chapter: number
    verse?: number
  }>(reference)

  const onChangeReference = (reference: GenericVerse) => {
    setReference(reference)
    setCurrentReference(reference)
  }

  const isHome =
    reference.book === currentReference.book &&
    reference.chapter === currentReference.chapter

  console.log(reference)

  return (
    <MotionBox flex={1} d="flex" flexDir="column">
      <BibleHeader>
        <SearchBox
          onChange={onChangeReference}
          defaultValue={
            isHome
              ? getReferenceByObject([reference])
              : getReferenceChapter(currentReference)
          }
        />
      </BibleHeader>
      <BibleViewer
        divRef={divRef}
        key={`${book}-${chapter}-${verse}`}
        scrollMode="horizontal"
        defaultReference={reference}
        onReferenceChange={(ref) => setCurrentReference(ref)}
      />
      <Box height="100px" />
    </MotionBox>
  )
}

export default BibleModule
