import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from '../../../common/AppLayout'

import MotionBox from '../../../common/MotionBox'
import { useAuth } from '../../../features/auth/AuthProvider'
import waitForAuth from '../../../features/auth/WaitForAuth'
import withAuth from '../../../features/auth/WithAuth'
import compose from '../../../helpers/compose'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(
  () => import('../../../features/studies/QuillEditor'),
  { ssr: false }
)

const EditStudy = () => {
  const { user } = useAuth()
  console.log(user)
  const router = useRouter()
  const { id } = router.query as { id: string }

  return (
    <MotionBox
      flex={1}
      d="flex"
      flexDir="column"
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <QuillEditor id={id} />
    </MotionBox>
  )
}

const EditStudyEnhanced = compose(withAuth, waitForAuth)(EditStudy)
EditStudyEnhanced.Layout = AppLayout

export default EditStudyEnhanced
