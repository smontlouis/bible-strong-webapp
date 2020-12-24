import React from 'react'
import AppLayout from '../common/AppLayout'
import waitForAuth from '../features/auth/waitForAuth'
import withAuth from '../features/auth/withAuth'
import compose from '../helpers/compose'
import BrowserModule from '../features/browser/Browser'

const Browser = () => {
  return <BrowserModule />
}

const BrowserEnhanced = compose(withAuth, waitForAuth)(Browser)
BrowserEnhanced.Layout = AppLayout

export default BrowserEnhanced
