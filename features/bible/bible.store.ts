import create, { StateCreator } from 'zustand'
import produce from 'immer'
import { GenericVerse } from '../../common/types'

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

type State = {
  book: number
  chapter: number
  verse: number
  setReference: (reference: GenericVerse) => void
}

const useBibleStore = create<State>(
  immer((set) => ({
    book: 1,
    chapter: 1,
    verse: 1,
    setReference: ({ book, chapter, verse }: GenericVerse) =>
      set((state) => {
        state.book = book
        state.chapter = chapter
        state.verse = verse
      }),
    setBook: (val: number) =>
      set((state) => {
        state.book = val
      }),
    setChapter: (val: number) =>
      set((state) => {
        state.chapter = val
      }),
    setVerse: (val: number) =>
      set((state) => {
        state.verse = val
      }),
  }))
)

export default useBibleStore
