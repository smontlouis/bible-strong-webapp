import React, { useEffect, useMemo, useState } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { Box, Flex, useToast } from '@chakra-ui/react'
import books from './books'
import { useTranslation } from 'react-i18next'
import { findReference } from './bible.utils'
import { GenericVerse } from '../../common/types'
import { BiSearch } from 'react-icons/bi'

interface Props {
  defaultValue: string
  onChange: (reference: GenericVerse) => void
}
const SearchBox = ({ onChange, defaultValue }: Props) => {
  const { t } = useTranslation()
  const options = useMemo(() => books.map((book) => t(book.Nom)), [])
  const toast = useToast()
  const [text, setText] = useState(defaultValue)

  useEffect(() => {
    setText(defaultValue)
  }, [defaultValue])

  return (
    <Flex alignItems="center" pos="relative" borderBottomWidth="3px">
      <Box
        zIndex={1}
        pos="absolute"
        left="16px"
        top="16px"
        w="23px"
        h="23px"
        as={BiSearch}
        color="grey"
        sx={{
          pointerEvents: 'none',
        }}
      />
      <Hint options={options} allowTabFill>
        <Box
          flex={1}
          fontSize={22}
          bg="transparent"
          fontFamily="normal"
          pr="m"
          pl="50px"
          py="10px"
          as="input"
          outline="none"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          transition=".5s ease"
          _focus={{
            zIndex: '1',
            boxShadow: ' rgb(89,131,240) 0px 0px 0px 2px',
          }}
          onBlur={() => setText(defaultValue)}
          onKeyUp={async (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
              const reference = await findReference(text)

              if (!reference) {
                toast({
                  title: t('bible.reference-not-found'),
                  status: 'error',
                  position: 'top',
                  duration: 2000,
                })
                return
              }

              onChange(reference)
            }
          }}
        />
      </Hint>
    </Flex>
  )
}

export default SearchBox
