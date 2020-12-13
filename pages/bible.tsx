import React from 'react'
import AppLayout from '../common/AppLayout'
import waitForAuth from '../features/auth/waitForAuth'
import withAuth from '../features/auth/withAuth'
import compose from '../helpers/compose'
import MotionBox from '../common/MotionBox'
import Browser from '../features/browser/Browser'

const Bible = () => {
  return (
    <MotionBox flex={1}>
      <Browser />
    </MotionBox>
  )
}

const BibleEnhanced = compose(withAuth, waitForAuth)(Bible)
BibleEnhanced.Layout = AppLayout

export default BibleEnhanced
