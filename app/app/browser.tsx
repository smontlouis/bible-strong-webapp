'use client';

import React, { useCallback } from 'react';
import { Box, Flex, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { DragDropContext, DragStart, Droppable, DropResult } from 'react-beautiful-dnd';
import Layout from './layout';
import { AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import useBrowserStore, { TabItem } from './browser.store';
import useGlobalStore from '../../global.store';

const SwitchModule = ({
    tab,
    layoutIndex,
}: {
    tab: TabItem
    layoutIndex: number
}) => {
    switch (tab.type) {
        case 'bible':
        // return <BibleModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'dictionnary':
        // return <DictionnaryModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'lexique':
        // return <LexiqueModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'nave':
        // return <NaveModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'home':
        // return <HomeModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'studies':
        // return <StudiesModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'edit-study':
        // return <EditStudyModule tabId={tab.id} layoutIndex={layoutIndex} />
        case 'empty':
        // return <Empty tabId={tab.id} layoutIndex={layoutIndex} />
        default:
            return <div>None</div>
    }
}

const Browser = () => {
    const { fullscreen } = useGlobalStore((state) => ({
        fullscreen: state.fullscreen,
    }));

    const {
        layouts,
        addTab,
        removeTab,
        onIdChange,
        reorderTabs,
        moveTabs,
    } = useBrowserStore();

    const onDragStart = useCallback((u: DragStart) => {
        console.log(u)
    }, []);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) {
            return
        }

        if (result.source.droppableId === result.destination.droppableId) {
            reorderTabs(
                result.source.index,
                result.destination.index,
                Number(result.source.droppableId)
            )
        } else {
            moveTabs(
                Number(result.source.droppableId),
                Number(result.destination.droppableId),
                result.source.index,
                result.destination.index
            )
        }
    }, []);

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Flex height="100%">
                <Tabs>
                    <TabList>
                        <Tab>Tab 1</Tab>
                        <Tab>Tab 2</Tab>
                        <Tab>Tab 3</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </DragDropContext>
    );
};

export default Browser;
