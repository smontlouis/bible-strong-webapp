import { Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import MotionBox from '../../common/MotionBox'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import { BrowserModuleProps } from '../../common/types'

const HomeModule = ({ tabId }: BrowserModuleProps) => {
  const { t } = useTranslation()
  return (
    <MotionBox
      initial="exit"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
      p="2xl"
      pt={{ base: '3xl', xl: '2xl' }}
    >
      <VStack spacing="l" align="flex-start" maxWidth={600}>
        <Text size="xl">{t('home.hello')}</Text>
        <NextLink href="/browser" locale="en">
          <a>change to en</a>
        </NextLink>
        <NextLink href="/browser" locale="fr">
          <a>change to fr /</a>
        </NextLink>
        <Text>{t('home.welcome_1')}</Text>

        <Text>
          {t('home.welcome_2')}{' '}
          <Link
            color="primary"
            href="https://en.tipeee.com/smontlouis"
            target="_blank"
          >
            tipeee
          </Link>{' '}
          ou{' '}
          <Link
            color="primary"
            href="https://paypal.me/smontlouis"
            target="_blank"
          >
            paypal
          </Link>
          .
        </Text>
        <Text>
          {t('home.welcome_3')} <br />
          Stéphane
        </Text>
      </VStack>
    </MotionBox>
  )
}
export default HomeModule
