import React, { createContext, useContext } from 'react'

type Key = string

type SetKey = (index: Key) => void

const TabsContext = createContext(
  {} as {
    key: Key
    setKey: SetKey
  }
)

export function Tabs({
  children,
  id: key,
  setKey,
}: {
  children: React.ReactNode
  id: Key
  setKey: SetKey
}) {
  return (
    <TabsContext.Provider value={{ key, setKey }}>
      {children}
    </TabsContext.Provider>
  )
}

export const useTab = (tabKey: Key) => {
  const { key, setKey } = useContext(TabsContext)

  return {
    isActive: key === tabKey,
    onClick: () => setKey(tabKey),
    setKey,
  }
}

export const useTabPanel = (tabKey: Key) => {
  const { key } = useContext(TabsContext)

  return {
    isActive: key === tabKey,
  }
}
