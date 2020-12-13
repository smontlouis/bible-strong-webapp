import create from 'zustand'

type State = {
  fullscreen: boolean
  setFullscreen: (value: boolean) => void
}

const useGlobalStore = create<State>((set) => ({
  fullscreen: false,
  setFullscreen: (value) => set((state) => ({ fullscreen: value })),
}))

export default useGlobalStore
