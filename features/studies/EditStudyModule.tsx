import React from 'react'

import dynamic from 'next/dynamic'
import Loading from '../../common/Loading'
import useBrowserStore, { EditStudyTab } from '../browser/browser.store'
import { BrowserModuleProps } from '../../common/types'
import { Box } from '@chakra-ui/react'

const QuillEditor = dynamic(() => import('./QuillEditor'), {
  ssr: false,
  loading: () => <Loading />,
})

const EditStudyModule = ({ tabId, layoutIndex }: BrowserModuleProps) => {
  const [studyId, updateTitle] = useBrowserStore((state) => {
    const tabItem = state.layouts[layoutIndex].tabs.find(
      (t) => t.id === tabId
    ) as EditStudyTab
    return [
      tabItem.data.studyId,
      (title: string) => {
        state.updateEntity(
          tabId,
          {
            ...tabItem,
            name: title,
          },
          layoutIndex
        )
      },
    ]
  })

  return (
    <Box
      flex={1}
      d="flex"
      flexDir="column"
      p="2xl"
      className={`edit-study-${studyId}`}
    >
      <QuillEditor id={studyId} onUpdateTitle={updateTitle} />
    </Box>
  )
}

export default EditStudyModule
