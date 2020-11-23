import { Box, Flex } from '@chakra-ui/react'
import Logo from '../public/images/svg/logo.svg'
import { ElementType, ReactNode } from 'react'

export default function Home() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box>
        <Box
          as={Logo as ElementType<ReactNode>}
          width={['280px', 'auto']}
          m="0 auto"
        />
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={4}
          flexDir={['column', 'row']}
        >
          <Box
            as="a"
            mt={[2, '20px']}
            ml={['none', '100px']}
            width={153}
            height={60}
            href="https://apps.apple.com/fr/app/bible-strong/id1454738221?mt=8"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              background:
                'url(https://linkmaker.itunes.apple.com/fr-fr/badge-lrg.svg?releaseDate=2019-07-03&kind=iossoftware&bubble=ios_apps) no-repeat',
              backgroundSize: 'contain',
            }}
          />
          <Box
            width={165}
            height={60}
            as="a"
            href="https://play.google.com/store/apps/details?id=com.smontlouis.biblestrong&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <img
              alt="Disponible sur Google Play"
              src="https://play.google.com/intl/en_us/badges/images/generic/fr_badge_web_generic.png"
              width={165}
              style={{ marginBottom: 0 }}
            />
          </Box>
        </Flex>
      </Box>
      <a
        style={{ color: '#0984e3', fontSize: 16, marginTop: 20 }}
        href="https://fr.tipeee.com/smontlouis"
      >
        🤓 Soutenir le développeur
      </a>
    </Flex>
  )
}
