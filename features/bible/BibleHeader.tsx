import { Flex } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

const BibleHeader = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex p="l" alignItems="center" mb="m">
      {children}
    </Flex>
  )
}

export default BibleHeader
