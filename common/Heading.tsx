import { Text, TextProps } from '@chakra-ui/react'
import MotionBox from './MotionBox'

const variants = {
  initial: {
    opacity: 0,
    x: -5,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    x: -5,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

const Heading = (props: TextProps) => {
  return (
    <MotionBox variants={variants}>
      <Text variant="medium" size="3xl" {...props} />
    </MotionBox>
  )
}

export default Heading
