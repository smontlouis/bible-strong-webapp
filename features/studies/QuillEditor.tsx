import ReactQuill from 'react-quill'
import { Box } from '@chakra-ui/react'
import { useDocument } from '@nandorojo/swr-firestore'

import '../../lib/quill/InlineVerse'
import '../../lib/quill/InlineStrong'
import '../../lib/quill/VerseBlock'
import '../../lib/quill/StrongBlock'

import '../../lib/quill/ModuleInlineVerse'
import '../../lib/quill/ModuleBlockVerse'
import '../../lib/quill/DividerBlock'

import Loading from '../../common/Loading'
import Error from '../../common/Error'
import { Delta, Study } from '../../common/types'
import Heading from '../../common/Heading'

import { useState } from 'react'

interface Props {
  id: string
}

const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote'],

  [{ list: 'ordered' }, { list: 'bullet' }],

  [{ header: [0, 1, 2] }],

  [{ color: [] }, { background: [] }],

  ['clean'],
]

const QuillEditor = ({ id }: Props) => {
  const [value, setValue] = useState<Delta>()

  const { data, error, loading } = useDocument<Study>(`studies/${id}`, {
    listen: true,
    onSuccess: (data) => {
      setValue(data?.content)
    },
  })

  if (error) {
    return <Error />
  }

  if (loading || !value) {
    return <Loading />
  }

  return (
    <>
      <Box position="sticky" top={0} zIndex={10} maxW={700}>
        <Box pos="relative" zIndex={1}>
          <Heading mb="l" size="3xl">
            {data?.title}
          </Heading>
        </Box>
        <Box
          pos="absolute"
          top={-20}
          right={0}
          left={0}
          height={220}
          bg="linear-gradient(#F4F7FF 84%, #f4f7ff00 100%)"
          zIndex={0}
        />
      </Box>

      <ReactQuill
        theme="snow"
        defaultValue={value}
        onChange={setValue}
        scrollingContainer=".right-container"
        modules={{
          toolbar: toolbarOptions,
          'inline-verse': true,
          'block-verse': true,
        }}
      />
    </>
  )
}

export default QuillEditor
