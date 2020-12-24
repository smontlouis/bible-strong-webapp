import {
  Center,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { FiTag } from 'react-icons/fi'
import { useAuth } from '../auth/AuthProvider'
import { ActionMeta, ValueType } from 'react-select'
import Creatable from 'react-select/creatable'
import { Study, Tag } from '../../common/types'
import produce, { current } from 'immer'
import { firestore } from '../../lib/firebase-app'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  id: string
  selectedTags: Study['tags']
}

interface Option {
  value: string
  label: string
}

const EditTagsForStudy = ({ selectedTags, id }: Props) => {
  const { user, setUser } = useAuth()
  const tags = Object.values(user?.bible.tags || {})
  const [activeTags, setActiveTags] = useState<Tag[]>(
    Object.values(selectedTags || {})
  )

  const onSelectChange: (
    value: ValueType<Option>,
    actionMeta: ActionMeta<Option>
  ) => void = async (obj, actionMeta) => {
    if (actionMeta.action === 'remove-value') {
      const tag = actionMeta.removedValue

      if (tag) {
        setActiveTags((s) => s.filter((v) => v.id !== tag.value))
        // Remove from tags
        const user_ = await produce(user, async (draft) => {
          delete draft?.bible.tags?.[tag.value]?.studies?.[id]
          const bibleTags = current(draft?.bible.tags)
          firestore
            .collection('users')
            .doc(user?.id)
            .update({ 'bible.tags': bibleTags })
        })

        setUser(user_)

        // Remove from study
        const studyTags = obj
          ? Object.fromEntries(
              // @ts-ignore
              obj.map((o) => [o.value, { id: o.value, name: o.label }])
            )
          : null
        firestore.collection('studies').doc(id).update({
          tags: studyTags,
        })
        return
      }
    }

    if (actionMeta.action === 'select-option') {
      const tag = actionMeta.option

      if (tag) {
        setActiveTags((s) => [...s, { id: tag.value, name: tag.label }])

        // Add to bible tags
        const user_ = produce(user, (draft) => {
          // @ts-ignore
          draft.bible.tags[tag.value].studies = {
            ...draft?.bible.tags?.[tag.value].studies,
            [id]: true,
          }

          const bibleTags = current(draft?.bible.tags)
          firestore
            .collection('users')
            .doc(user?.id)
            .update({ 'bible.tags': bibleTags })
        })

        setUser(user_)

        // Add from study
        const studyTags = obj
          ? Object.fromEntries(
              // @ts-ignore
              obj.map((o) => [o.value, { id: o.value, name: o.label }])
            )
          : null
        firestore.collection('studies').doc(id).update({
          tags: studyTags,
        })
        return
      }
      return
    }
  }

  const onCreate = async (value: string) => {
    const tag = {
      id: uuidv4(),
      date: Date.now(),
      name: value,
    }

    // Add new tag
    const user_ = await produce(user, async (draft) => {
      // @ts-ignore
      draft.bible.tags[tag.id] = {
        ...tag,
        studies: {
          [id]: true,
        },
      }

      const bibleTags = current(draft?.bible.tags)
      firestore
        .collection('users')
        .doc(user?.id)
        .update({ 'bible.tags': bibleTags })
    })

    setUser(user_)
    setActiveTags((s) => [...s, { id: tag.id, name: tag.name }])

    const studyTags = activeTags
      ? Object.fromEntries(
          activeTags.map((o) => [o.id, { id: o.id, name: o.name }])
        )
      : null

    firestore
      .collection('studies')
      .doc(id)
      .update({
        tags: {
          ...(studyTags || {}),
          [tag.id]: tag,
        },
      })
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Center
            role="button"
            bg="white"
            w="38px"
            h="38px"
            ml="m"
            mb="m"
            borderRadius="full"
            pos="relative"
            zIndex={2}
          >
            <Icon color="primary" as={FiTag} fontSize={18} />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Modifier les tags</PopoverHeader>
          <PopoverBody>
            <Creatable
              formatCreateLabel={() => 'Créer un nouveau tag'}
              onCreateOption={onCreate}
              isClearable={false}
              value={activeTags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              isMulti
              name="tags"
              options={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              onChange={onSelectChange}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default EditTagsForStudy
