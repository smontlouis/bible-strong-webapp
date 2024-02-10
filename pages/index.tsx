import { Link } from '@chakra-ui/next-js'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { FaGithub } from 'react-icons/fa'
import Logo from '../public/images/svg/logo-full.svg'

export default function Home() {
  return (
    <Flex
      p="m"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      backgroundImage={{ base: 'none', md: "url('/images/background.jpg')" }}
      style={{
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box as={Logo} width="240px" pos="absolute" top={0} left="20px" />
      <Box>
        <Text fontSize={60} variant="bold">
          Tout.
          <br />
          en un.
        </Text>
        <Text mt="l" maxW="400px">
          BibleStrong met à disposition des outils efficaces d'étude de la Bible
          pour tous ceux qui souhaitent développer et affermir une foi réfléchie
          en Dieu.
        </Text>
        <Flex alignItems="center" mt="l">
          <Box
            as="a"
            width={160}
            height="50px"
            href="https://apps.apple.com/fr/app/bible-strong/id1454738221?mt=8"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              background:
                'url(https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&amp;releaseDate=1562112000) no-repeat',
              backgroundSize: 'contain',
            }}
          />
          <Box
            width={165}
            height="63px"
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
      <HStack
        spacing="m"
        pos="absolute"
        bottom={0}
        left="50%"
        transform="translate(-50%)"
        p="m"
      >
        <Link as={NextLink} href="/give" color="grey">
          Soutenir
        </Link>
        <Link
          href="https://github.com/smontlouis/bible-strong"
          color="grey"
          isExternal
        >
          <FaGithub style={{ display: 'inline-block' }} /> Github
        </Link>
      </HStack>
    </Flex>
  )
}
