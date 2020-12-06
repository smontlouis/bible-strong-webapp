import React, { useMemo, useState } from 'react'
import AppLayout from '../common/AppLayout'
import waitForAuth from '../features/auth/waitForAuth'
import withAuth from '../features/auth/withAuth'
import compose from '../helpers/compose'
import { Box } from '@chakra-ui/react'
import BibleViewer from '../features/bible/BibleViewer'
import MotionBox from '../common/MotionBox'

const Bible = () => {
  const defaultReference = useMemo(
    () => ({ book: 1, chapter: 9, verse: 27 }),
    []
  )

  const [currentReference, setCurrentReference] = useState<{
    book: number
    chapter: number
    verse?: number
  }>(defaultReference)

  return (
    <MotionBox
      flex={1}
      d="flex"
      flexDir="column"
      initial="exit"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
    >
      <Box height="100px" m="l" bg="grey">
        {JSON.stringify(currentReference)}
        - 
        {JSON.stringify(defaultReference)}
      </Box>
      <BibleViewer
        scrollMode="horizontal"
        defaultReference={defaultReference}
        onReferenceChange={(ref) => setCurrentReference(ref)}
      />
    </MotionBox>
  )
}

const BibleEnhanced = compose(withAuth, waitForAuth)(Bible)
BibleEnhanced.Layout = AppLayout

export default BibleEnhanced
