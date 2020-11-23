import { useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from '../../../common/AppLayout'
import Heading from '../../../common/Heading'
import Loading from '../../../common/Loading'
import Error from '../../../common/Error'
import MotionBox from '../../../common/MotionBox'
import { useAuth } from '../../../features/auth/AuthProvider'
import waitForAuth from '../../../features/auth/WaitForAuth'
import withAuth from '../../../features/auth/WithAuth'
import compose from '../../../helpers/compose'

const EditStudy = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { data, error, loading } = useDocument(`studies/${id}`, {
    listen: true,
  })

  console.log(data)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <MotionBox initial="exit" animate="enter" exit="exit">
      <Heading>Études</Heading>
    </MotionBox>
  )
}

const EditStudyEnhanced = compose(withAuth, waitForAuth)(EditStudy)
EditStudyEnhanced.Layout = AppLayout

export default EditStudyEnhanced
