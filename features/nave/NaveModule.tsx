import { Center, Text } from '@chakra-ui/react'

const NaveModule = ({ tabId }: { tabId: string }) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Nave
      </Text>
    </Center>
  )
}
export default NaveModule
