import { Center, Text } from '@chakra-ui/react'
import { BrowserModuleProps } from '../../common/types'

const NaveModule = ({ tabId }: BrowserModuleProps) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Nave
      </Text>
    </Center>
  )
}
export default NaveModule
