import { VerseBase, VersionId } from '../../common/types'
import { BibleTab, BrowserState } from '../browser/browser.store'
import { getReferenceByObject } from './bible.utils'

export const getReferenceState = (tabId: string, layoutIndex: number) => (
  state: BrowserState
) => {
  const tabItem = state.layouts[layoutIndex].tabs.find(
    (t) => t.id === tabId
  ) as BibleTab
  return {
    reference: tabItem.data.reference,
    updateReference: (reference: VerseBase) =>
      state.updateEntity(
        tabId,
        {
          ...tabItem,
          data: {
            ...tabItem.data,
            reference,
          },
          name: getReferenceByObject([reference]),
        },
        layoutIndex
      ),
  }
}

export const getVersionState = (tabId: string, layoutIndex: number) => (
  state: BrowserState
) => {
  const tabItem = state.layouts[layoutIndex].tabs.find(
    (t) => t.id === tabId
  ) as BibleTab
  return {
    versionId: tabItem.data.versionId,
    updateVersion: (versionId: VersionId) =>
      state.updateEntity(
        tabId,
        {
          ...tabItem,
          data: {
            ...tabItem.data,
            versionId,
          },
        },
        layoutIndex
      ),
  }
}
