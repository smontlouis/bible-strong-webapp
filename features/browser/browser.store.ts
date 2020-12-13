import create, { StateCreator } from 'zustand'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

export interface EmptyTab {
  id: string
  name: string
  type: 'empty' | 'bible' | 'lexique' | 'dictionnary' | 'nave'
}

export interface BibleTab extends EmptyTab {
  type: 'bible'
}

export interface LexiqueTab extends EmptyTab {
  type: 'lexique'
}

export interface DictionnaryTab extends EmptyTab {
  type: 'dictionnary'
}

export interface NaveTab extends EmptyTab {
  type: 'nave'
}

export type TabItem =
  | EmptyTab
  | BibleTab
  | LexiqueTab
  | DictionnaryTab
  | NaveTab

type State = {
  tabIndex: number
  onIndexChange: (index: number) => void
  tabs: TabItem[]
  addTab: () => void
  removeTab: (tab: string) => void
}

const useBrowserStore = create<State>(
  immer((set) => ({
    tabIndex: 0,
    onIndexChange: (index: number) =>
      set((state) => {
        state.tabIndex = index
      }),
    tabs: [
      { id: uuidv4(), name: 'browser.new-tab', type: 'empty' },
      { id: uuidv4(), name: 'browser.new-tab', type: 'bible' },
      { id: uuidv4(), name: 'browser.new-tab', type: 'lexique' },
      { id: uuidv4(), name: 'browser.new-tab', type: 'nave' },
    ],
    addTab: () =>
      set((state) => {
        state.tabs.push({
          id: uuidv4(),
          name: 'browser.new-tab',
          type: 'empty',
        })
        state.tabIndex = state.tabs.length - 1
      }),
    removeTab: (id: string) =>
      set((state) => {
        const tabToRemoveIndex = state.tabs.findIndex((t) => t.id === id)

        if (tabToRemoveIndex !== -1) {
          state.tabs.splice(tabToRemoveIndex, 1)

          if (state.tabIndex === tabToRemoveIndex && tabToRemoveIndex === 0) {
            state.tabIndex = 0
          } else if (state.tabIndex > tabToRemoveIndex) {
            state.tabIndex -= 1
          } else if (state.tabIndex === tabToRemoveIndex) {
            state.tabIndex -= 1
          }
        }
      }),
  }))
)

export default useBrowserStore
