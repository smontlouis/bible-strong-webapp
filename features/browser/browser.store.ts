import create, { StateCreator } from 'zustand'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'
import timeout from '../../helpers/timeout'
import { GenericVerse } from '../../common/types'

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

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
  tabIndex: number
  onIndexChange: (index: number) => void
  tabs: TabItem[]
  addTab: (tabItem?: TabItem) => void
  removeTab: (tab: string) => void
  updateEntity: (id: string, tabItem: TabItem) => void
}

const useBrowserStore = create<State>(
  immer((set, get) => ({
    tabIndex: 0,
    onIndexChange: (index) =>
      set((state) => {
        state.tabIndex = index
      }),
    tabs: [
      { id: uuidv4(), name: 'browser.home', type: 'home', data: {} },
      { id: uuidv4(), name: 'browser.new-tab', type: 'empty', data: {} },
    ],
    addTab: (tabItem) =>
      set((state) => {
        state.tabs.push({
          id: uuidv4(),
          name: tabItem?.name || 'browser.new-tab',
          type: tabItem?.type || 'empty',
          data: tabItem?.data || {},
        })
        state.tabIndex = state.tabs.length - 1
      }),
    removeTab: async (id) => {
      const tabToRemoveIndex = get().tabs.findIndex((t) => t.id === id)

      set((state) => {
        if (tabToRemoveIndex !== -1) {
          state.tabs.splice(tabToRemoveIndex, 1)
        }
      })

      await timeout(180)

      set((state) => {
        if (tabToRemoveIndex !== -1) {
          // Wait for framer-motion to finish animation before switching index
          if (state.tabIndex === tabToRemoveIndex && tabToRemoveIndex === 0) {
            state.tabIndex = 0
          } else if (state.tabIndex > tabToRemoveIndex) {
            state.tabIndex -= 1
          } else if (state.tabIndex === tabToRemoveIndex) {
            state.tabIndex -= 1
          }
        }
      })
    },
    updateEntity: (id, tabItem) =>
      set((state) => {
        const tabIndex = state.tabs.findIndex((t) => t.id === id)
        state.tabs[tabIndex] = { ...state.tabs[tabIndex], ...tabItem }
      }),
  }))
)

export default useBrowserStore
