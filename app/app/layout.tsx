import { PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Box
            height="100%"
            //d="flex"
            flexDir="column"
            flex={1}
            minH="0"
            px="m"
            pb="m"
        >
            <Box /*d="flex"*/ flexDir="column" height="100%" borderRadius="m" bg="white">
                {children}
            </Box>
        </Box>
    )
}

export default Layout;
