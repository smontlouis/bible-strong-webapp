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
  useToast,
} from '@chakra-ui/react'
import copy from 'copy-to-clipboard'
import formatDistance from 'date-fns/formatDistance'
import { Study } from '../../common/types'
import deltaToPlainText from '../../helpers/deltaToPlainText'
import { absoluteFill } from '../../helpers/box'
import truncate from '../../helpers/truncate'
import { fr } from 'date-fns/locale'
import TagList from '../../common/TagList'
import MotionBox from '../../common/MotionBox'
import { FiCopy, FiExternalLink, FiLink2, FiMoreVertical } from 'react-icons/fi'
import { MdPictureAsPdf } from 'react-icons/md'
import { AiOutlineLink } from 'react-icons/ai'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import getPDFStudy from '../../helpers/getPDFStudy'

interface Props {
  study: Study
  onDelete: (id: string) => void
  onPublish: (id: string, value: boolean) => void
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
  onDelete,
  onPublish,
}: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const [isPDFLoading, setPDFLoading] = useState(false)
  return (
    <MotionBox
      layout
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
          <Menu isLazy closeOnSelect={false}>
            <MenuButton pos="relative" zIndex={2}>
              <Icon as={FiMoreVertical} fontSize={24} />
            </MenuButton>
            <Portal>
              <MenuList>
                {published ? (
                  <>
                    <MenuItem onClick={() => onPublish(id, false)}>
                      <Center
                        bg="lightGrey"
                        borderRadius="full"
                        w={33}
                        h={33}
                        mr="s"
                      >
                        <Box as={FiLink2} color="success" fontSize="16px" />
                      </Center>
                      Dépublier l'étude
                    </MenuItem>
                    <MenuItem as="a" target="_blank" href={`studies/${id}`}>
                      <Center
                        bg="lightGrey"
                        borderRadius="full"
                        w={33}
                        h={33}
                        mr="s"
                      >
                        <Box as={FiExternalLink} color="grey" fontSize="16px" />
                      </Center>
                      Ouvrir le lien
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        console.log(router)
                        copy(
                          `${document.location.host}${router.pathname}/${id}`
                        )
                        toast({
                          title: 'Lien copié',
                        })
                      }}
                    >
                      <Center
                        bg="lightGrey"
                        borderRadius="full"
                        w={33}
                        h={33}
                        mr="s"
                      >
                        <Box as={FiCopy} color="grey" fontSize="16px" />
                      </Center>
                      Copier le lien
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        setPDFLoading(true)
                        await getPDFStudy(id, title)
                        setPDFLoading(false)
                      }}
                      isDisabled={isPDFLoading}
                    >
                      <Center
                        bg="lightGrey"
                        borderRadius="full"
                        w={33}
                        h={33}
                        mr="s"
                      >
                        <Box as={MdPictureAsPdf} color="grey" fontSize="16px" />
                      </Center>
                      {isPDFLoading ? 'Génération...' : 'Exporter en pdf'}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => onPublish(id, true)}>
                    <Center
                      bg="lightGrey"
                      borderRadius="full"
                      w={33}
                      h={33}
                      mr="s"
                    >
                      <Box as={FiLink2} color="grey" fontSize="16px" />
                    </Center>
                    Publier l'étude
                  </MenuItem>
                )}
                <MenuItem
                  color="error"
                  onClick={(e) => {
                    if (confirmDelete) {
                      onDelete(id)
                    } else {
                      setConfirmDelete(true)
                      e.preventDefault()
                    }
                  }}
                >
                  <Center
                    bg="lightGrey"
                    borderRadius="full"
                    w={33}
                    h={33}
                    mr="s"
                  >
                    <Box as={RiDeleteBinLine} color="error" fontSize="16px" />
                  </Center>
                  {confirmDelete ? 'Êtes-vous sur ?' : 'Supprimer'}
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
        <Text variant="medium" size="xl" color="primary" mt="s">
          {title}
        </Text>
        <Text mt="m">{truncate(deltaToPlainText(content?.ops) || '', 80)}</Text>
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
