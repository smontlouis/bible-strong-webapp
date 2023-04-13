import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import BibleAudioReader from './BibleAudioReader'

export interface AudioPageProps {
  version: string
  person: string
}

const AudioPage = ({ version, person }: AudioPageProps) => {
  return (
    <Box margin="0 auto" maxW="650px" paddingX="5" paddingY="20">
      <VStack mb="10" spacing="6">
        <Box>
          <Heading size="2xl" textAlign="center">
            {version === 'esv' ? 'Genesis' : 'Genèse'} 1
          </Heading>
          <Heading size="md" textAlign="center">
            {version === 'esv' ? `narrated by ${person}` : `lue par ${person}`}
          </Heading>
        </Box>
        <Text fontSize="sm" textAlign="center" color="gray.600" maxW="300px">
          {version === 'esv'
            ? 'This is a proof of concept for a text to speech bible powered by AI.'
            : "Il s'agit d'une preuve de concept pour une bible vocale propulsée par Intelligence artificielle."}
        </Text>
      </VStack>
      <BibleAudioReader version={version} person={person} />
    </Box>
  )
}

export default AudioPage
