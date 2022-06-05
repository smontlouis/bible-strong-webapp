import create, { StateCreator } from 'zustand'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'
import timeout from '../../helpers/timeout'
import { VerseBase, VersionId } from '../../common/types'
import { persist } from 'zustand/middleware'

const immer =
  <T extends BrowserState>(
    config: StateCreator<T, (fn: (draft: T) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as (state: T) => T), get, api)

export interface TabBase {
  id: string
  name: string
}

export interface EmptyTab extends TabBase {
  type: 'empty'
  data: {}
}

export interface HomeTab extends TabBase {
  type: 'home'
  data: {}
}

export interface BibleTab extends TabBase {
  type: 'bible'
  data: {
    reference: VerseBase
    versionId: VersionId
  }
}

export interface StudiesTab extends TabBase {
  type: 'studies'
  data: {}
}

export interface EditStudyTab extends TabBase {
  type: 'edit-study'
  data: {
    studyId: string
  }
}

export interface LexiqueTab extends TabBase {
  type: 'lexique'
  data: {}
}

export interface DictionnaryTab extends TabBase {
  type: 'dictionnary'
  data: {}
}

export interface NaveTab extends TabBase {
  type: 'nave'
  data: {}
}

// type TabKind = TabItem['type']

export type TabItem =
  | HomeTab
  | EmptyTab
  | BibleTab
  | LexiqueTab
  | DictionnaryTab
  | NaveTab
  | StudiesTab
  | EditStudyTab

export type BrowserState = {
  onIdChange: (index: string, layoutIndex: number) => void
  addTab: ({
    tabItem,
    layoutIndex,
  }: {
    tabItem?: TabItem
    layoutIndex?: number
  }) => void
  removeTab: (tab: string, layoutIndex: number) => void
  updateTab: (id: string, tabItem: TabItem, layoutIndex: number) => void
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

const useBrowserStore = create<BrowserState>(
  persist(
    immer((set, get) => ({
      tabId: defaultTabs[0].id,
      onIdChange: (id, layoutIndex) =>
        set((state) => {
          state.layouts[layoutIndex].tabId = id
        }),
      layouts: [
        {
          tabId: defaultTabs[0].id,
          tabs: defaultTabs,
        },
        // {
        //   tabId: defaultTabs2[0].id,
        //   tabs: defaultTabs2,
        // },
      ],
      addTab: ({ tabItem, layoutIndex = 0 }) =>
        set((state) => {
          const tabIndex = state.layouts[layoutIndex].tabs.findIndex(
            (t) => t.id === tabItem?.id
          )
          const id = tabItem?.id || uuidv4()

          if (tabIndex === -1) {
            if (tabItem) {
              state.layouts[layoutIndex].tabs.push({
                id,
                name: tabItem?.name,
                type: tabItem?.type,
                data: tabItem?.data,
              } as TabItem)
            } else {
              state.layouts[layoutIndex].tabs.push({
                id,
                name: 'browser.new-tab',
                type: 'empty',
                data: {},
              })
            }
          }
          state.layouts[layoutIndex].tabId = id
        }),
      removeTab: async (id, layoutIndex) => {
        const tabs = get().layouts[layoutIndex].tabs
        const tabIndex = tabs.findIndex(
          (t) => t.id === get().layouts[layoutIndex].tabId
        )
        const tabToRemoveIndex = tabs.findIndex((t) => t.id === id)

        set((state) => {
          if (tabToRemoveIndex !== -1) {
            state.layouts[layoutIndex].tabs.splice(tabToRemoveIndex, 1)
          }
        })

        await timeout(180)

        set((state) => {
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
      updateTab: (id, tabItem, layoutIndex) =>
        set((state) => {
          const tabIndex = state.layouts[layoutIndex].tabs.findIndex(
            (t) => t.id === id
          )
          state.layouts[layoutIndex].tabs[tabIndex] = {
            ...state.layouts[layoutIndex].tabs[tabIndex],
            ...tabItem,
          }
        }),
      reorderTabs: (sourceIndex, destinationIndex, layoutIndex) =>
        set((state) => {
          const [removed] = state.layouts[layoutIndex].tabs.splice(
            sourceIndex,
            1
          )
          state.layouts[layoutIndex].tabs.splice(destinationIndex, 0, removed)
        }),
      moveTabs: (
        sourceDroppableId,
        destinationDroppableId,
        sourceIndex,
        destinationIndex
      ) =>
        set((state) => {
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
      name: 'browser-storage',
      storage:
        typeof window !== 'undefined' ? window.localStorage : dummyStorageApi,
    }
  )
)

export default useBrowserStore
