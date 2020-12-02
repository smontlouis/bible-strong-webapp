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
  SystemStyleObject,
  HStack,
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
import { FiTag } from 'react-icons/fi'
import { useRouter } from 'next/router'
import getPDFStudy from '../../helpers/getPDFStudy'

interface Props {
  study: Study
  onDelete: (id: string) => void
  onPublish: (id: string, value: boolean) => void
  disabled: boolean
  isFirst: boolean
}

const variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  enter: ({ disabled, isFirst }: { disabled: boolean; isFirst: boolean }) => ({
    scale: 1,
    opacity: disabled && !isFirst ? 0.6 : 1,
    transition: { duration: 0.8, ease: [0.48, 0.15, 0.25, 0.96] },
  }),
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const StudyItem = ({
  study: { id, modified_at, title, content, tags, published },
  onDelete,
  onPublish,
  disabled,
  isFirst,
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
      custom={{ disabled, isFirst }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      borderColor="lightGrey"
      borderWidth={1}
      boxShadow="rgba(89, 131, 240, 0) 1px 0px 36px -27px"
      minH="250px"
      {...((!disabled || isFirst) && {
        whileHover: {
          scale: 1.05,
          boxShadow: 'rgba(89, 131, 240, 0.3) 1px 47px 36px -27px',
        },
      })}
      d="flex"
      flexDir="column"
      pos="relative"
    >
      {!disabled || isFirst ? (
        <NextLink href={`/studies/${id}/edit`} passHref>
          <Box as="a" {...absoluteFill} zIndex={1} borderRadius="l" />
        </NextLink>
      ) : (
        <Tooltip label="Limité à une étude pour les non-sponsors">
          <Box as="a" {...absoluteFill} zIndex={1} borderRadius="l" />
        </Tooltip>
      )}
      <Box p="l" d="flex" flex={1} flexDir="column">
        <Flex alignItems="center">
          <Text color="grey" size="s" flex={1}>
            Il y a{' '}
            {formatDistance(new Date(modified_at), new Date(), { locale: fr })}
          </Text>
          {(!disabled || isFirst) && (
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
                          <Box
                            as={FiExternalLink}
                            color="grey"
                            fontSize="16px"
                          />
                        </Center>
                        Ouvrir le lien
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
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
                        isDisabled={isPDFLoading || disabled}
                      >
                        <Center
                          bg="lightGrey"
                          borderRadius="full"
                          w={33}
                          h={33}
                          mr="s"
                        >
                          <Box
                            as={MdPictureAsPdf}
                            color="grey"
                            fontSize="16px"
                          />
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
          )}
        </Flex>
        <Text variant="medium" size="l" color="primary" mt="s">
          {title}
        </Text>
        <Text
          mt="s"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '3' as SystemStyleObject,
            WebkitBoxOrient: 'vertical' as SystemStyleObject,
            overflow: 'hidden',
          }}
        >
          {truncate(deltaToPlainText(content?.ops) || '', 80)}
        </Text>
      </Box>
      <HStack mt="auto" justifyContent="flex-end" pb="m" px="m">
        {Object.values(tags || {}).length && (
          <Tooltip
            maxW={200}
            borderRadius="m"
            bg="white"
            placement="right"
            label={<TagList limit={3} tags={tags} />}
            aria-label="Étude publiée"
          >
            <Center
              bg="lightGrey"
              w={35}
              h={35}
              borderRadius="full"
              pos="relative"
              zIndex={2}
            >
              <Icon color="primary" as={FiTag} fontSize={18} />
            </Center>
          </Tooltip>
        )}
        {published && (
          <Tooltip
            placement="right"
            label="Étude publiée"
            aria-label="Étude publiée"
          >
            <Center
              bg="primary"
              w={35}
              h={35}
              borderRadius="full"
              pos="relative"
              zIndex={2}
              as="a"
              href={`/studies/${id}`}
              target="_blank"
            >
              <Icon color="white" as={AiOutlineLink} fontSize={18} />
            </Center>
          </Tooltip>
        )}
      </HStack>
    </MotionBox>
  )
}
export default StudyItem
