import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, HStack, Link, Text, Image } from '@chakra-ui/react';
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <Image src='/images/logo-full.svg' width="240px" pos="absolute" top={0} left="20px" />
            <Box>
                <Text fontSize={60} variant="bold">
                    {'all'}
                    <br />
                    {'in-one'}
                </Text>
                <Text mt="l" maxW="400px">
                    BibleStrong met à disposition des outils efficaces d'étude de la Bible
                    pour tous ceux qui souhaitent développer et affermir une foi réfléchie
                    en Dieu.
                </Text>
                <Flex alignItems="center" mt="l">
                    <Box
                        as="a"
                        width={153}
                        height="45px"
                        href="https://apps.apple.com/fr/app/bible-strong/id1454738221?mt=8"
                        style={{
                            display: 'inline-block',
                            overflow: 'hidden',
                            background:
                                'url(https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/fr-fr?size=800x100&amp;releaseDate=1562112000) no-repeat',
                            backgroundSize: 'contain',
                        }}
                    />
                    <Box
                        width={165}
                        height="60px"
                        as="a"
                        href="https://play.google.com/store/apps/details?id=com.smontlouis.biblestrong&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                    >
                        <img
                            alt="Disponible sur Google Play"
                            src="https://play.google.com/intl/en_us/badges/images/generic/fr_badge_web_generic.png"
                            width={165}
                            style={{ marginBottom: 0 }}
                        />
                    </Box>
                </Flex>
                <NextLink passHref href="/app">
                    <Button w="305px" mt="m">
                        Version web (bêta)
                    </Button>
                </NextLink>
            </Box>
            <HStack
                spacing="m"
                pos="absolute"
                bottom={0}
                left="50%"
                transform="translate(-50%)"
                p="m"
            >
                <Link href="https://fr.tipeee.com/smontlouis" color="grey">
                    Soutenir sur Tipeee
                </Link>
                <Link href="https://www.paypal.me/smontlouis" color="grey">
                    Soutenir sur Paypal
                </Link>
            </HStack>
        </main>
    );
}
