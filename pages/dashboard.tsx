import { Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AppLayout from '../common/AppLayout'
import MotionBox from '../common/MotionBox'
import waitForAuth from '../features/auth/waitForAuth'
import withAuth from '../features/auth/withAuth'
import compose from '../helpers/compose'

const Dashboard = () => {
  return (
    <MotionBox
      initial="exit"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
    >
      <VStack spacing="l" align="flex-start" maxWidth={600}>
        <Text size="xl">Bonjour,</Text>
        <Text>
          Bienvenue sur la version bêta de Bible Strong Web. Pour l'instant,
          seule la fonctionnalité études est disponible. Elle est totalement
          accessible pour les utilisateurs sponsors et restreinte à une seule
          étude pour les autres utilisateurs.
        </Text>

        <Text>
          Comme à chaque fois, la fonctionnalité sera disponible au grand public
          dans les mois à venir. Si vous souhaitez soutenir mon travail,
          n'hésitez pas à devenir sponsor ;) sur mobile, par{' '}
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
          Bonne étude, <br />
          Stéphane
        </Text>
      </VStack>
    </MotionBox>
  )
}

const DashboardEnhanced = compose(withAuth, waitForAuth)(Dashboard)
DashboardEnhanced.Layout = AppLayout

export default DashboardEnhanced
