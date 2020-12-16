import { Center, Text } from '@chakra-ui/react'
import { BrowserModuleProps } from '../../common/types'

const LexiqueModule = ({ tabId }: BrowserModuleProps) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Lexique
      </Text>
    </Center>
  )
}
export default LexiqueModule
