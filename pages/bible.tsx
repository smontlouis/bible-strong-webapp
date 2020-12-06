import React, { useMemo } from 'react'
import AppLayout from '../common/AppLayout'
import waitForAuth from '../features/auth/waitForAuth'
import withAuth from '../features/auth/withAuth'
import compose from '../helpers/compose'
import { Box } from '@chakra-ui/react'
import BibleViewer from '../features/bible/BibleViewer'
import MotionBox from '../common/MotionBox'

const Bible = () => {
  const defaultReference = useMemo(
    () => ({ book: 64, chapter: 1, verse: 1 }),
    []
  )

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
      <Box height="100px" m="l" bg="grey" />
      <BibleViewer defaultReference={defaultReference} />
    </MotionBox>
  )
}

const BibleEnhanced = compose(withAuth, waitForAuth)(Bible)
BibleEnhanced.Layout = AppLayout

export default BibleEnhanced
