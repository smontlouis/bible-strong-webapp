import { Center, Text } from '@chakra-ui/react'
import { BrowserModuleProps } from '../../common/types'

const DictionnaryModule = ({ tabId }: BrowserModuleProps) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Dictionnary
      </Text>
    </Center>
  )
}
export default DictionnaryModule
