import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import NextLink from 'next/link'
import MotionBox from './MotionBox'
import { useRouter } from 'next/router'

const NavLink = ({
  icon,
  children,
  href,
}: PropsWithChildren<{
  icon: IconType
  href?: string
}>) => {
  const router = useRouter()
  const active = href && router.asPath.startsWith(href)

  const component = (
    <Flex
      alignItems="center"
      mb="l"
      as={'a'}
      cursor={href ? 'pointer' : 'not-allowed'}
    >
      <Center p="s" pos="relative">
        {active && (
          <MotionBox
            layoutId="nav-highlight"
            pos="absolute"
            top={0}
            right={0}
            left={0}
            bottom={0}
            boxShadow="1px 15px 13px -6px rgba(89,131,240, 0.6)"
            borderRadius="m"
            bg="primary"
            zIndex={0}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
        <Box
          color={active ? 'white' : 'grey'}
          transition="0.5s ease"
          as={icon}
          fontSize="24px"
          pos="relative"
          zIndex={1}
        />
      </Center>
      <Text
        ml="m"
        transition="0.5s ease"
        color={active ? 'primary' : 'grey'}
        size="l"
        variant="medium"
      >
        {children}
      </Text>
    </Flex>
  )

  if (href) {
    return (
      <NextLink href={href} passHref>
        {component}
      </NextLink>
    )
  }

  return component
}

export default NavLink
