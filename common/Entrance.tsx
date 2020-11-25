import React, { PropsWithChildren } from 'react'
import MotionBox from '../common/MotionBox'

const Entrance = (props: PropsWithChildren<{}>) => {
  return (
    <MotionBox
      initial="exit"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
      {...props}
    />
  )
}

export default Entrance
