import { Box } from '@chakra-ui/react'
import React from 'react'
import MotionBox from '../../common/MotionBox'

const VerseSearch = ({
  onSelect,
  onClose,
}: {
  onSelect: ({ title, codeStrong, book }: any) => void
  onClose: () => void
}) => {
  return (
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
        top={0}
        display="flex"
        flexDir="column"
        bg="white"
        borderRadius="xl"
      >
        Hello
      </Box>
    </MotionBox>
  )
}

export default VerseSearch
