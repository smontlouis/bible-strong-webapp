import {
  Menu,
  MenuButton,
  Portal,
  Text,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  Box,
  Center,
  Tooltip,
} from '@chakra-ui/react'
import formatDistance from 'date-fns/formatDistance'
import { Study } from '../../common/types'
import deltaToPlainText from '../../helpers/deltaToPlainText'
import { absoluteFill } from '../../helpers/box'
import truncate from '../../helpers/truncate'
import { fr } from 'date-fns/locale'
import TagList from '../../common/TagList'
import MotionBox from '../../common/MotionBox'
import { FiMoreVertical } from 'react-icons/fi'
import { AiOutlineLink } from 'react-icons/ai'
import React from 'react'
import NextLink from 'next/link'

interface Props {
  study: Study
}

const variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const StudyItem = ({
  study: { id, created_at, title, content, tags, published },
}: Props) => {
  return (
    <MotionBox
      borderRadius="l"
      bg="white"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      boxShadow="rgba(89, 131, 240, 0) 1px 0px 36px -27px"
      whileHover={{
        scale: 1.05,
        boxShadow: 'rgba(89, 131, 240, 0.3) 1px 47px 36px -27px',
      }}
      d="flex"
      flexDir="column"
      pos="relative"
    >
      <NextLink href={`/studies/${id}/edit`} passHref>
        <Box as="a" {...absoluteFill} zIndex={1} borderRadius="l" />
      </NextLink>
      <Box p="l">
        <Flex alignItems="center">
          <Text color="grey" size="s" flex={1}>
            Il y a{' '}
            {formatDistance(new Date(created_at), new Date(), { locale: fr })}
          </Text>
          <Menu isLazy>
            <MenuButton pos="relative" zIndex={2}>
              <Icon as={FiMoreVertical} fontSize={24} />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem>Publier l'étude</MenuItem>
                <MenuItem>Ouvrir le lien</MenuItem>
                <MenuItem>Copier le lien</MenuItem>
                <MenuItem>Partager</MenuItem>
                <MenuItem>Exporter en pdf</MenuItem>
                <MenuItem>Supprimer</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
        <Text variant="medium" size="xl" color="primary" mt="s">
          {title}
        </Text>
        <Text mt="m">{truncate(deltaToPlainText(content.ops), 80)}</Text>
        <TagList limit={2} tags={tags} />
      </Box>
      {published ? (
        <Flex mt="auto" justifyContent="flex-end" pb="m" px="m">
          <Tooltip
            placement="right"
            label="Étude publiée"
            aria-label="Étude publiée"
          >
            <Center
              bg="primary"
              p="s"
              borderRadius="full"
              pos="relative"
              zIndex={2}
              as="a"
              href={`/studies/${id}`}
              target="_blank"
            >
              <Icon color="white" as={AiOutlineLink} fontSize={22} />
            </Center>
          </Tooltip>
        </Flex>
      ) : (
        <></>
      )}
    </MotionBox>
  )
}
export default StudyItem
