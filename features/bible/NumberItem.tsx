import React from 'react'
import MotionBox from '../../common/MotionBox'
import { absoluteFill } from '../../helpers/box'

interface Props {
  number: number
  color: string
  focused: boolean
  isSelected: boolean
  onPress: (book: number) => void
}

interface VariantProps {
  color: string
  isSelected: boolean
}

const boxVariants = {
  rest: ({ color, isSelected }: VariantProps) => ({
    backgroundColor: isSelected ? color : 'rgba(255, 255, 255)',
  }),
  hover: ({ color }: VariantProps) => ({
    backgroundColor: color,
  }),
  tap: {
    scale: 0.95,
  },
}

const textVariants = {
  rest: ({ color, isSelected }: VariantProps) => ({
    color: isSelected ? 'rgba(255, 255, 255)' : color,
  }),
  hover: {
    color: 'rgba(255, 255, 255)',
  },
}

const NumberItem = ({ number, color, focused, isSelected, onPress }: Props) => {
  return (
    <MotionBox
      key={`${number}${isSelected}`}
      pos="relative"
      _after={{
        content: "''",
        display: 'block',
        paddingBottom: '100%',
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate="rest"
      borderRadius="m"
      _focus={{ outline: 'none' }}
      transition={{
        duration: 0.1,
        type: 'tween',
        ease: 'easeIn',
      }}
      onClick={() => onPress(number)}
      // @ts-ignore
      as="button"
      autoFocus={focused}
    >
      <MotionBox
        custom={{ color, isSelected }}
        variants={boxVariants}
        d="flex"
        alignItems="center"
        justifyContent="center"
        {...(absoluteFill as any)}
        borderRadius="full"
      >
        <MotionBox
          custom={{ color, isSelected }}
          variants={textVariants}
          fontFamily="normal"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {number}
        </MotionBox>
      </MotionBox>
    </MotionBox>
  )
}

export default NumberItem
