import { Box } from '@chakra-ui/react'
import BibleAudioReader from './BibleAudioReader'
import Header from './Header'

export interface AudioPageProps {
  version: string
  person: string
}

const AudioPage = ({ version, person }: AudioPageProps) => {
  return (
    <Box margin="0 auto" maxW="650px" paddingX="5" paddingY="20">
      <Header person={person} version={version} />
      <BibleAudioReader version={version} person={person} />
    </Box>
  )
}

export default AudioPage
