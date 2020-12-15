import React from 'react'

import MotionBox from '../../common/MotionBox'
import dynamic from 'next/dynamic'
import Loading from '../../common/Loading'
import useBrowserStore, { EditStudyTab } from '../browser/browser.store'

const QuillEditor = dynamic(() => import('./QuillEditor'), {
  ssr: false,
  loading: () => <Loading />,
})

const EditStudyModule = ({ tabId }: { tabId: string }) => {
  const [studyId, updateTitle] = useBrowserStore((state) => {
    const tabItem = state.tabs.find((t) => t.id === tabId) as EditStudyTab
    return [
      tabItem.data.studyId,
      (title: string) => {
        state.updateEntity(tabId, {
          ...tabItem,
          name: title,
        })
      },
    ]
  })

  return (
    <MotionBox
      flex={1}
      d="flex"
      flexDir="column"
      initial="exit"
      animate="enter"
      exit="exit"
      p="2xl"
      pt={{ base: '3xl', xl: '2xl' }}
    >
      <QuillEditor id={studyId} onUpdateTitle={updateTitle} />
    </MotionBox>
  )
}

export default EditStudyModule
