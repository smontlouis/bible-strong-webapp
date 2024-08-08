import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import timeout from '@/helpers/timeout';
import { GenericVerse } from '@/common/types';

export interface BasicTab {
    id: string
    name: string
}

export interface EmptyTab extends BasicTab {
    type:
    | 'empty'
    | 'bible'
    | 'lexique'
    | 'dictionnary'
    | 'nave'
    | 'home'
    | 'studies'
    | 'edit-study'
    data: {}
}

export interface BibleTab extends BasicTab {
    type: 'bible'
    data: GenericVerse
}

export interface StudiesTab extends BasicTab {
    type: 'studies'
    data: {}
}

export interface EditStudyTab extends BasicTab {
    type: 'edit-study'
    data: {
        studyId: string
    }
}

export interface LexiqueTab extends BasicTab {
    type: 'lexique'
    data: {}
}

export interface DictionnaryTab extends BasicTab {
    type: 'dictionnary'
    data: {}
}

export interface NaveTab extends BasicTab {
    type: 'nave'
    data: {}
}

export type TabItem =
    | EmptyTab
    | BibleTab
    | LexiqueTab
    | DictionnaryTab
    | NaveTab
    | StudiesTab
    | EditStudyTab

type State = {
    onIdChange: (index: string, layoutIndex: number) => void
    addTab: (tabItem?: TabItem, layoutIndex?: number) => void
    removeTab: (tab: string, layoutIndex: number) => void
    updateEntity: (id: string, tabItem: TabItem, layoutIndex: number) => void
    reorderTabs: (
        sourceIndex: number,
        destinationIndex: number,
        layoutIndex: number
    ) => void
    moveTabs: (
        sourceDroppableId: number,
        destinationDroppableId: number,
        sourceIndex: number,
        destinationIndex: number
    ) => void
    layouts: {
        tabId: string
        tabs: TabItem[]
    }[]
}

const defaultTabs: TabItem[] = [
    { id: uuidv4(), name: 'browser.home', type: 'home', data: {} },
    { id: uuidv4(), name: 'browser.new-tab', type: 'empty', data: {} },
]

// const defaultTabs2: TabItem[] = [
//   { id: uuidv4(), name: 'browser.new-tab', type: 'empty', data: {} },
// ]

const dummyStorageApi = {
    getItem: () => null,
    setItem: () => undefined,
}

const useBrowserStore = create<State>()(
    persist(
        immer((set, get) => ({
            tabId: defaultTabs[0].id,
            onIdChange: (id: string, layoutIndex: number) =>
                set((state: State) => {
                    state.layouts[layoutIndex].tabId = id
                }),
            layouts: [
                {
                    tabId: defaultTabs[0].id,
                    tabs: defaultTabs,
                },
            ],
            addTab: (tabItem?: TabItem, layoutIndex = 0) =>
                set((state: State) => {
                    const id = uuidv4()
                    state.layouts[layoutIndex].tabs.push({
                        id,
                        name: tabItem?.name || 'browser.new-tab',
                        type: tabItem?.type || 'empty',
                        data: tabItem?.data || {},
                    })
                    state.layouts[layoutIndex].tabId = id
                }),
            removeTab: async (id: string, layoutIndex: number) => {
                const tabs = get().layouts[layoutIndex].tabs;
                const tabIndex = tabs.findIndex(
                    (t: BasicTab) => t.id === get().layouts[layoutIndex].tabId
                );
                const tabToRemoveIndex = tabs.findIndex((t) => t.id === id)

                set((state: State) => {
                    if (tabToRemoveIndex !== -1) {
                        state.layouts[layoutIndex].tabs.splice(tabToRemoveIndex, 1)
                    }
                })

                await timeout(180)

                set((state: State) => {
                    if (tabToRemoveIndex !== -1) {
                        // Wait for framer-motion to finish animation before switching index
                        if (tabIndex === tabToRemoveIndex && tabToRemoveIndex === 0) {
                            state.layouts[layoutIndex].tabId = tabs[0].id
                        } else if (tabIndex > tabToRemoveIndex) {
                            state.layouts[layoutIndex].tabId = tabs[tabIndex - 1].id
                        } else if (tabIndex === tabToRemoveIndex) {
                            state.layouts[layoutIndex].tabId = tabs[tabIndex - 1].id
                        }
                    }
                })
            },
            updateEntity: (id, tabItem, layoutIndex) =>
                set((state) => {
                    const tabIndex = state.layouts[layoutIndex].tabs.findIndex(
                        (t) => t.id === id
                    )
                    state.layouts[layoutIndex].tabs[tabIndex] = {
                        ...state.layouts[layoutIndex].tabs[tabIndex],
                        ...tabItem,
                    }
                }),
            reorderTabs: (sourceIndex: number, destinationIndex: number, layoutIndex: number) =>
                set((state: State) => {
                    const [removed] = state.layouts[layoutIndex].tabs.splice(
                        sourceIndex,
                        1
                    )
                    state.layouts[layoutIndex].tabs.splice(destinationIndex, 0, removed)
                }),
            moveTabs: (
                sourceDroppableId: number,
                destinationDroppableId: number,
                sourceIndex: number,
                destinationIndex: number
            ) =>
                set((state: State) => {
                    const [removed] = state.layouts[sourceDroppableId].tabs.splice(
                        sourceIndex,
                        1
                    )
                    state.layouts[destinationDroppableId].tabs.splice(
                        destinationIndex,
                        0,
                        removed
                    )
                }),
        })),
        {
            name: 'browser-storage'
        }
    )
);

export default useBrowserStore;
