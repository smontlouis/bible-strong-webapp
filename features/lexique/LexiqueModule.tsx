import { Center, Text } from '@chakra-ui/react'

const LexiqueModule = ({ tabId }: { tabId: string }) => {
  return (
    <Center flex={1}>
      <Text variant="bold" fontSize={40}>
        Lexique
      </Text>
    </Center>
  )
}
export default LexiqueModule
