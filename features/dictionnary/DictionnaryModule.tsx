import { Center, Text } from '@chakra-ui/react'

const DictionnaryModule = ({ tabId }: { tabId: string }) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Dictionnary
      </Text>
    </Center>
  )
}
export default DictionnaryModule
