import type { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import './globals.css';

import { theme } from '@/theme';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bible Strong App - Lexique Hébreu et Grec",
    description: "Le projet Bible Strong a pour objectif la mise à disposition d'outils efficaces d'étude de la Bible pour tous ceux qui souhaitent développer et affermir une foi réfléchie en Dieu par sa Parole.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ChakraProvider theme={theme}>
                    {children}
                </ChakraProvider>
            </body>
        </html>
    );
}
