import ReactQuill from 'react-quill'
import { DeltaStatic } from 'quill'
import { Box, Flex, useToast } from '@chakra-ui/react'
import { useDocument } from '@nandorojo/swr-firestore'
import { v4 as uuidv4 } from 'uuid'

import '../../lib/quill/InlineVerse'
import '../../lib/quill/InlineStrong'
import '../../lib/quill/VerseBlock'
import '../../lib/quill/StrongBlock'

import '../../lib/quill/ModuleInlineVerse'
import '../../lib/quill/ModuleBlockVerse'
import '../../lib/quill/DividerBlock'

import Loading from '../../common/Loading'
import Error from '../../common/Error'
import {
  Delta,
  HistoryItem,
  QuillVerseBlockProps,
  Study,
} from '../../common/types'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toolbar from '../../lib/quill/Toolbar'
import LexiqueSearch from '../lexique/LexiqueSearch'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import MotionBox from '../../common/MotionBox'
import VerseSearch from '../bible/VerseSearch'
import debounce from '../../helpers/debounce'
import useGlobalStore from '../../lib/store/global'
import EditableHeader from './EditableHeader'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthProvider'

interface Props {
  id: string
}

const QuillEditor = ({ id }: Props) => {
  const [value, setValue] = useState<Delta>()
  const { fullscreen, setFullscreen } = useGlobalStore((state) => ({
    fullscreen: state.fullscreen,
    setFullscreen: state.setFullscreen,
  }))
  const router = useRouter()
  const { user } = useAuth()
  const toast = useToast()

  const [isModalOpen, setIsModalOpen] = useState<
    'inline-verse' | 'block-verse' | 'inline-strong' | 'block-strong'
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
      setIsModalOpen('inline-strong')
    }
  }, [])

  const insertInlineStrong = useCallback(({ title, codeStrong, book }) => {
    editor.current?.getEditor().getModule('inline-verse').receiveStrongLink({
      title,
      codeStrong,
      book,
    })
    setIsModalOpen(undefined)
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
      setIsModalOpen(undefined)
    },
    []
  )

  const insertBlockVerse = useCallback(
    ({ title, verses, version, content }: QuillVerseBlockProps) => {
      editor.current?.getEditor().getModule('block-verse').receiveVerseBlock({
        title,
        content,
        version,
        verses,
      })
    },
    []
  )

  const insertInlineVerse = useCallback(
    ({ title, verses }: QuillVerseBlockProps) => {
      editor.current?.getEditor().getModule('inline-verse').receiveVerseLink({
        title,
        verses,
      })
    },
    []
  )

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
          bibleVerse: () => setIsModalOpen('block-verse'),
          bibleStrong: () => setIsModalOpen('block-strong'),
          inlineVerse: () => setIsModalOpen('inline-verse'),
          inlineStrong: () => setIsModalOpen('inline-strong'),
          divider: insertBlockDivider,
        },
      },
      'inline-verse': true,
      'block-verse': true,
    }),
    []
  )

  const { data, error, loading, update } = useDocument<Study>(`studies/${id}`, {
    listen: true,
    onSuccess: (data) => {
      setValue(data?.content || { ops: [] })
    },
  })

  const onChange = debounce(() => {
    const content = editor.current?.getEditor().getContents() as Delta
    if (content?.ops.length) {
      const has5minutes =
        Date.now() > (data?.history?.[0]?.modified_at! + 5 * 60000 || 0)

      const history = JSON.parse(
        JSON.stringify(
          [
            ...(has5minutes
              ? [{ id: uuidv4(), modified_at: Date.now(), content }]
              : []),
            ...(data?.history || []),
          ].slice(0, 10)
        )
      )

      update({
        content: {
          ops: content.ops,
        },
        history,
        modified_at: Date.now(),
      })
    }
  }, 500)

  const onChangeTitle = debounce((e: any) => {
    update({
      title: e.target.value,
      modified_at: Date.now(),
    })
  }, 500)

  const gradientColor = fullscreen ? 'white' : '#F4F7FF'

  const onRestoreVersion = (item: HistoryItem) => {
    editor.current?.getEditor().setContents(item.content as DeltaStatic)
    toast({
      title: 'Version restaurée',
      status: 'success',
    })
  }

  useEffect(() => {
    if (data?.exists && data?.user.id !== user?.id) {
      router.replace('/studies')
    }
  }, [data?.user?.id])

  if (error || (data?.exists && data?.user.id !== user?.id)) {
    return <Error />
  }

  if (loading || !value) {
    return <Loading />
  }

  // CHECK IF USER CAN EDIT STUDY
  if (!data?.exists) {
    return <div>404</div>
  }

  return (
    <AnimateSharedLayout>
      <Box position="sticky" top={0} zIndex={10}>
        <EditableHeader
          fullscreen={fullscreen}
          id={id}
          title={data.title}
          onChangeTitle={onChangeTitle}
          tags={data.tags}
          history={data.history}
          setFullscreen={setFullscreen}
          onRestoreVersion={onRestoreVersion}
        />
      </Box>
      <Flex margin={fullscreen ? '0 auto' : 0} flex={1}>
        <MotionBox layout>
          <Box position="sticky" top="110px" zIndex={9} maxW={700}>
            <Toolbar />
            <Box
              pos="absolute"
              top={-170}
              right={-5}
              left={-10}
              height={225}
              bg={`linear-gradient(${gradientColor} 84%, #f4f7ff00 100%)`}
              zIndex={0}
            />
          </Box>
          <ReactQuill
            ref={editor}
            theme="snow"
            defaultValue={value as DeltaStatic}
            onChange={onChange}
            scrollingContainer=".right-container"
            placeholder="Prenez une grande respiration, et commencez votre étude ici..."
            modules={modules}
          />
        </MotionBox>
        <AnimatePresence exitBeforeEnter>
          {isModalOpen?.endsWith('strong') && (
            <LexiqueSearch
              onClose={() => setIsModalOpen(undefined)}
              onSelect={
                isModalOpen === 'inline-strong'
                  ? insertInlineStrong
                  : insertBlockStrong
              }
            />
          )}
          {isModalOpen?.endsWith('verse') && (
            <VerseSearch
              onClose={() => setIsModalOpen(undefined)}
              onSelect={
                isModalOpen === 'inline-verse'
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
