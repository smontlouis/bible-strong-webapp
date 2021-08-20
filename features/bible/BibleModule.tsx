import BibleHeader from './BibleHeader'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BibleViewer from './BibleViewer'
import MotionBox from '../../common/MotionBox'
import SearchBox from './SearchBox'
import { BrowserModuleProps, VerseBase } from '../../common/types'
import { getReferenceByObject, getReferenceChapter } from './bible.utils'
import useBrowserStore from '../browser/browser.store'
import { getReferenceState, getVersionState } from './bible.state'
import VersionSelector from './VersionSelector'

const BibleModule = ({ tabId, layoutIndex }: BrowserModuleProps) => {
  const { reference, updateReference } = useBrowserStore(
    useCallback(getReferenceState(tabId, layoutIndex), [tabId, layoutIndex])
  )
  const { versionId, updateVersion } = useBrowserStore(
    useCallback(getVersionState(tabId, layoutIndex), [tabId, layoutIndex])
  )

  useEffect(() => {
    updateReference(reference)
  }, [])

  const divRef = useRef<HTMLDivElement>(null)

  const [currentReference, setCurrentReference] = useState<{
    book: number
    chapter: number
    verse?: number
  }>(reference)

  const onUpdateReference = (reference: VerseBase) => {
    updateReference(reference)
    setCurrentReference(reference)
  }

  const isHome =
    reference.book === currentReference.book &&
    reference.chapter === currentReference.chapter

  console.log(
    `${reference.book}-${reference.chapter}-${reference.verse}-${versionId}`
  )

  return (
    <MotionBox flex={1} d="flex" flexDir="column">
      <BibleHeader>
        <SearchBox
          onChange={onUpdateReference}
          defaultValue={
            isHome
              ? getReferenceByObject([reference])
              : getReferenceChapter(currentReference)
          }
        />
        <VersionSelector onChange={updateVersion} versionId={versionId} />
      </BibleHeader>
      <BibleViewer
        divRef={divRef}
        key={`${reference.book}-${reference.chapter}-${reference.verse}-${versionId}`}
        scrollMode="vertical"
        defaultReference={reference}
        versionId={versionId}
        onReferenceChange={(ref) => setCurrentReference(ref)}
      />
    </MotionBox>
  )
}

export default React.memo(BibleModule)
