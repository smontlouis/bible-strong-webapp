import { Box } from '@chakra-ui/react'
import BibleAudioReader from './BibleAudioReader'

export interface AudioPageProps {}

const AudioPage = ({}: AudioPageProps) => {
  return (
    <Box margin="0 auto" maxW="650px">
      <BibleAudioReader />
    </Box>
  )
}

export default AudioPage
