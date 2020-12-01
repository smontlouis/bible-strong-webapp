import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from '../../../common/AppLayout'

import MotionBox from '../../../common/MotionBox'
import waitForAuth from '../../../features/auth/waitForAuth'
import withAuth from '../../../features/auth/withAuth'
import compose from '../../../helpers/compose'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(
  () => import('../../../features/studies/QuillEditor'),
  { ssr: false, loading: () => <p>Loading...</p> }
)

const EditStudy = () => {
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
