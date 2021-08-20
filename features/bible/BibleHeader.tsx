import { Flex } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

const BibleHeader = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex
      py="s"
      alignItems="center"
      borderBottom="1px solid"
      borderTop="1px solid"
      borderColor="greys.2"
      justifyContent="center"
    >
      {children}
    </Flex>
  )
}

export default BibleHeader
