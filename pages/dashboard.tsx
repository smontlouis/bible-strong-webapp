import { Text } from '@chakra-ui/react'
import React from 'react'
import AppLayout from '../common/AppLayout'
import MotionBox from '../common/MotionBox'
import waitForAuth from '../features/auth/WaitForAuth'
import withAuth from '../features/auth/WithAuth'
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
      <Text fontWeight="200">Dashboard</Text>
      <Text fontWeight="300">Bonjour</Text>
      <Text>Bonjour</Text>
      <Text fontWeight="500">Bonjour</Text>
      <Text fontWeight="600">Bonjour</Text>
      <Text fontWeight="700">Bonjour</Text>
      <Text fontWeight="800">Bonjour</Text>
      <br />
      <Text variant="text">Bonjour</Text>
    </MotionBox>
  )
}

const DashboardEnhanced = compose(withAuth, waitForAuth)(Dashboard)
DashboardEnhanced.Layout = AppLayout

export default DashboardEnhanced
