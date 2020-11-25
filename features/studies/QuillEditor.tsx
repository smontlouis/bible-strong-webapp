import ReactQuill from 'react-quill'
import { DeltaStatic } from 'quill'
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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toolbar from '../../lib/quill/Toolbar'
import LexiqueSearch from '../lexique/LexiqueSearch'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import MotionBox from '../../common/MotionBox'
import VerseSearch from '../bible/VerseSearch'

interface Props {
  id: string
}

const QuillEditor = ({ id }: Props) => {
  const [value, setValue] = useState<Delta>()
  const [isSelectStrongOpen, setIsSelectStrongOpen] = useState<
    'inline' | 'block'
  >()
  const [isSelectVerseOpen, setIsSelectVerseOpen] = useState<
    'inline' | 'block'
  >()
  const editor = useRef<ReactQuill>(null)

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false)
    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  const receiveMessage = useCallback(({ data }) => {
    if (data.type === 'SELECT_STRONG_WORD') {
      setIsSelectStrongOpen('inline')
    }
  }, [])

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

  const insertBlockVerse = useCallback(() => {
    editor.current
      ?.getEditor()
      .getModule('block-verse')
      .receiveVerseBlock({
        title: 'test',
        content: 'test',
        version: 'LSG',
        verses: ['2-25-8'],
      })
  }, [])

  const insertInlineVerse = useCallback(() => {
    editor.current
      ?.getEditor()
      .getModule('inline-verse')
      .receiveVerseLink({
        title: 'Test',
        verses: ['2-25-8'],
      })
  }, [])

  const insertBlockDivider = useCallback(() => {
    const range = editor.current!.getEditor().getSelection(true)
    editor.current
      ?.getEditor()
      .insertEmbed(range.index || 0, 'divider', true, 'user')
    editor.current?.getEditor().setSelection(range.index + 3, 0, 'user')
  }, [])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {
          bibleVerse: () => setIsSelectVerseOpen('block'),
          bibleStrong: () => setIsSelectStrongOpen('block'),
          inlineVerse: () => setIsSelectVerseOpen('inline'),
          inlineStrong: () => setIsSelectStrongOpen('inline'),
          divider: insertBlockDivider,
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
    <AnimateSharedLayout>
      <Flex>
        <MotionBox layout>
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
            defaultValue={value as DeltaStatic}
            onChange={() => {}}
            scrollingContainer=".right-container"
            modules={modules}
          />
        </MotionBox>
        <AnimatePresence exitBeforeEnter>
          {!!isSelectStrongOpen && (
            <LexiqueSearch
              onClose={() => setIsSelectStrongOpen(undefined)}
              onSelect={
                isSelectStrongOpen === 'inline'
                  ? insertInlineStrong
                  : insertBlockStrong
              }
            />
          )}
          {!!isSelectVerseOpen && (
            <VerseSearch
              onClose={() => setIsSelectVerseOpen(undefined)}
              onSelect={
                isSelectVerseOpen === 'inline'
                  ? insertInlineVerse
                  : insertBlockVerse
              }
            />
          )}
        </AnimatePresence>
      </Flex>
    </AnimateSharedLayout>
  )
}

export default QuillEditor
