import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import React, { PropsWithChildren, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import useGlobalStore from '../global.store'
import { Nav } from './Nav'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const { fullscreen } = useGlobalStore((state) => ({
    fullscreen: state.fullscreen,
    setFullscreen: state.setFullscreen,
  }))

  useFullscreen(fullscreen)

  return (
    <>
      <Box height="56px" bg="greys.0">
        <Box
          role="button"
          onClick={onOpen}
          as={FiMenu}
          fontSize="25px"
          zIndex={10}
        />
      </Box>
      <Flex bg="white" h="100vh">
        <Box
          flex={1}
          bg={fullscreen ? 'white' : 'lightGrey'}
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
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Box mt="xl">
                <Nav />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default AppLayout
