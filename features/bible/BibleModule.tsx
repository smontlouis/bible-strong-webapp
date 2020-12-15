import BibleHeader from './BibleHeader'
import React, { useEffect, useRef, useState } from 'react'
import BibleViewer from './BibleViewer'
import MotionBox from '../../common/MotionBox'
import SearchBox from './SearchBox'
import { GenericVerse } from '../../common/types'
import { getReferenceByObject, getReferenceChapter } from './bible.utils'
import { Box } from '@chakra-ui/react'
import useBrowserStore, { BibleTab } from '../browser/browser.store'

const BibleModule = ({ tabId }: { tabId: string }) => {
  const [reference, updateReference] = useBrowserStore((state) => {
    const tabItem = state.tabs.find((t) => t.id === tabId) as BibleTab
    return [
      tabItem.data,
      (reference: GenericVerse) =>
        state.updateEntity(tabId, {
          ...tabItem,
          data: reference,
          name: getReferenceByObject([reference]),
        }),
    ]
  })

  useEffect(() => {
    updateReference(reference)
  }, [])

  const divRef = useRef<HTMLDivElement>(null)

  const [currentReference, setCurrentReference] = useState<{
    book: number
    chapter: number
    verse?: number
  }>(reference)

  const onChangeReference = (reference: GenericVerse) => {
    updateReference(reference)
    setCurrentReference(reference)
  }

  const isHome =
    reference.book === currentReference.book &&
    reference.chapter === currentReference.chapter

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
        key={`${reference.book}-${reference.chapter}-${reference.verse}`}
        scrollMode="horizontal"
        defaultReference={reference}
        onReferenceChange={(ref) => setCurrentReference(ref)}
      />
      <Box height="100px" />
    </MotionBox>
  )
}

export default React.memo(BibleModule)
