import ReactQuill, { Quill } from 'react-quill'
import { Box, Flex } from '@chakra-ui/react'
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

import React, { useCallback, useMemo, useRef, useState } from 'react'
import Toolbar from '../../lib/quill/Toolbar'
import LexiqueSearch from '../lexique/LexiqueSearch'

interface Props {
  id: string
}

function insertBlockVerse() {
  this.blockVerseModule = this.quill.getModule('block-verse')
  this.blockVerseModule.receiveVerseBlock({
    title: 'test',
    content: 'test',
    version: 'LSG',
    verses: ['2-25-8'],
  })
}

function insertInlineVerse() {
  this.inlineVerseModule = this.quill.getModule('inline-verse')
  this.inlineVerseModule.receiveVerseLink({ title: 'Test', verses: ['2-25-8'] })
}

const QuillEditor = ({ id }: Props) => {
  const [value, setValue] = useState<Delta>()
  const [isSelectStrongOpen, setIsSelectStrongOpen] = useState<
    'inline' | 'block'
  >()
  const editor = useRef<ReactQuill>(null)

  const insertInlineStrong = useCallback(({ title, codeStrong, book }) => {
    editor.current?.getEditor().getModule('inline-verse').receiveStrongLink({
      title,
      codeStrong,
      book,
    })
    setIsSelectStrongOpen(undefined)
  }, [])

  const insertBlockStrong = useCallback(
    ({ title, codeStrong, book, phonetique, original }) => {
      editor.current?.getEditor().getModule('block-verse').receiveStrongBlock({
        phonetique,
        book,
        original,
        title,
        codeStrong,
      })
      setIsSelectStrongOpen(undefined)
    },
    []
  )

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {
          bv: insertBlockVerse,
          bs: () => setIsSelectStrongOpen('block'),
          iv: insertInlineVerse,
          is: () => setIsSelectStrongOpen('inline'),
        },
      },
      'inline-verse': true,
      'block-verse': true,
    }),
    []
  )

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
    <Flex>
      <Box>
        <Box position="sticky" top={0} zIndex={10} maxW={700}>
          <Box pos="relative" zIndex={1}>
            <Heading mb="l" size="3xl">
              {data?.title}
            </Heading>
          </Box>
          <Box
            pos="absolute"
            top={-20}
            right={-5}
            left={-10}
            height={220}
            bg="linear-gradient(#F4F7FF 84%, #f4f7ff00 100%)"
            zIndex={0}
          />
          <Toolbar />
        </Box>
        <ReactQuill
          ref={editor}
          theme="snow"
          defaultValue={value}
          onChange={() => {}}
          scrollingContainer=".right-container"
          modules={modules}
        />
      </Box>
      {!!isSelectStrongOpen && (
        <LexiqueSearch
          onSelect={
            isSelectStrongOpen === 'inline'
              ? insertInlineStrong
              : insertBlockStrong
          }
        />
      )}
    </Flex>
  )
}

export default QuillEditor
