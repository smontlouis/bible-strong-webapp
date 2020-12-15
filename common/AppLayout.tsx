import { Box, Flex } from '@chakra-ui/react'
import React, { PropsWithChildren, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import useGlobalStore from '../global.store'
import Header from './Header'

const useFullscreen = (fullscreen: boolean) => {
  useEffect(() => {
    const elem = document.documentElement
    if (fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
        // @ts-ignore
      } else if (elem.webkitRequestFullscreen) {
        // @ts-ignore
        elem.webkitRequestFullscreen()
        // @ts-ignore
      } else if (elem.msRequestFullscreen) {
        //@ts-ignore
        elem.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        try {
          document.exitFullscreen()
        } catch (e) {}
      }
    }
  }, [fullscreen])
}

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()
  const { fullscreen } = useGlobalStore((state) => ({
    fullscreen: state.fullscreen,
  }))

  useFullscreen(fullscreen)

  return (
    <Box height="100vh" d="flex" flexDir="column">
      <Header />
      <Flex bg="white" flex={1}>
        <Box
          flex={1}
          bg={'lightGrey'}
          d="flex"
          flexDir="column"
          overflow="auto"
          pos="relative"
          className="right-container"
        >
          <AnimatePresence exitBeforeEnter>
            <Box key={router.pathname} flex={1} d="flex" flexDir="column">
              {children}
            </Box>
          </AnimatePresence>
        </Box>
      </Flex>
    </Box>
  )
}

export default AppLayout
