import { Box } from '@chakra-ui/react'
import React from 'react'
import { Book } from '../../common/types'
import { absoluteFill } from '../../helpers/box'

interface Props {
  book: Book
  color: string
  focused: boolean
  onPress: (book: number) => void
  isSelected: boolean
}

const BookItem = ({ book, color, focused, onPress, isSelected }: Props) => {
  const bookName = book.Nom.replace(/\s/g, '').substr(0, 3)

  return (
    <Box
      pos="relative"
      _after={{
        content: "''",
        display: 'block',
        paddingBottom: '100%',
      }}
      borderRadius="m"
      _focus={{ outline: 'none' }}
      transition="0.2s ease"
      onClick={() => onPress(book.Numero)}
      // @ts-ignore
      as="button"
      autoFocus={focused}
      bg={isSelected ? color : 'rgba(255, 255, 255)'}
      _hover={{
        backgroundColor: color,
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      role="group"
    >
      <Box
        d="flex"
        alignItems="center"
        justifyContent="center"
        {...(absoluteFill as any)}
        borderRadius="l"
      >
        <Box
          fontFamily="normal"
          fontWeight="bold"
          textTransform="uppercase"
          color={isSelected ? 'rgba(255, 255, 255)' : color}
          transition="0.2s ease"
          _groupHover={{
            color: 'rgba(255, 255, 255)',
          }}
        >
          {bookName}
        </Box>
      </Box>
    </Box>
  )
}

export default BookItem
