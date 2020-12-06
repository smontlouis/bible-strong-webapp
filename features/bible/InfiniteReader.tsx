import * as React from 'react'
import { useState } from 'react'
import MotionBox from '../../common/MotionBox'

interface Props {
  scrollMode: 'horizontal' | 'vertical'
  onFetchPrevious: (func?: () => void) => Promise<void>
  onFetchNext: () => Promise<void>
  hasMorePrevious: boolean
  hasMoreNext: boolean
  columnWidth: number
  columnGap: number
}

const InfiniteReader = ({
  scrollMode,
  children,
  onFetchPrevious,
  onFetchNext,
  hasMorePrevious,
  hasMoreNext,
  columnWidth,
  columnGap,
}: React.PropsWithChildren<Props>) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isNextLoading, setIsNextLoading] = useState(false)
  const [isPrevLoading, setIsPrevLoading] = useState(false)

  const loadPrev = async () => {
    const element = document.querySelector('#div')

    if (!element) return

    if (scrollMode === 'horizontal') {
      setIsPrevLoading(true)

      let scrollWidthBefore = 0
      await onFetchPrevious(() => {
        scrollWidthBefore = element.scrollWidth - element.scrollLeft
        console.log({ scrollWidthBefore, scrollLeft: element.scrollLeft })
      })
      const scrollWidthAfter = element.scrollWidth

      const diff = scrollWidthAfter - scrollWidthBefore

      element.scrollTo({ left: diff })
      console.log({ scrollWidthAfter, scrollLeft: element.scrollLeft })

      setIsPrevLoading(false)
    } else {
      setIsPrevLoading(true)
      const scrollHeightBefore = element.scrollHeight - element.scrollTop

      await onFetchPrevious()

      const scrollHeightAfter = element.scrollHeight

      const diff = scrollHeightAfter - scrollHeightBefore
      element.scrollTo({ top: diff })

      setIsPrevLoading(false)
    }
  }

  const loadNext = async () => {
    setIsNextLoading(true)
    await onFetchNext()
    setIsNextLoading(false)
  }

  const wheelHandler = React.useCallback(
    (event: WheelEvent) => {
      const element = document.querySelector('#div')
      if (!element) return

      if (scrollMode === 'horizontal') {
        const toLeft = event.deltaY < 0 && element.scrollLeft > 0
        const toRight =
          event.deltaY > 0 &&
          element.scrollLeft < element.scrollWidth - element.clientWidth

        if (toLeft || toRight) {
          event.preventDefault()
          event.stopPropagation()
          element.scrollBy({ left: event.deltaY })
        }

        if (
          element.scrollWidth - element.scrollLeft <=
            element.clientWidth + columnWidth * 2 &&
          !isNextLoading
        ) {
          if (hasMoreNext) {
            loadNext()
          }
        }

        if (element.scrollLeft <= columnWidth && !isPrevLoading) {
          if (hasMorePrevious) {
            loadPrev()
          }
        }
      } else {
        if (
          element.scrollHeight - element.scrollTop <=
            element.clientHeight + 500 &&
          !isNextLoading
        ) {
          if (hasMoreNext) {
            loadNext()
          }
        }

        if (element.scrollTop <= 500 && !isPrevLoading) {
          if (hasMorePrevious) {
            loadPrev()
          }
        }
      }
    },
    [isNextLoading, isPrevLoading]
  )

  React.useEffect(() => {
    document.addEventListener('wheel', wheelHandler)

    return () => {
      document.removeEventListener('wheel', wheelHandler)
    }
  }, [wheelHandler])

  React.useEffect(() => {
    ;(async () => {
      await loadPrev()
      loadNext()

      if (scrollMode === 'horizontal') {
        document.querySelector('#div')?.scrollBy({ left: -columnGap })
      }
      setIsLoading(false)
    })()
  }, [])

  return (
    <MotionBox
      id="div"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      sx={{
        ...(scrollMode === 'horizontal'
          ? {
              columnWidth,
              columnGap,
              overflowY: 'hidden',
              overflowX: 'auto',
            }
          : {
              overflowY: 'auto',
              overflowX: 'hidden',
            }),
        pos: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
      }}
    >
      {children}
    </MotionBox>
  )
}

export default InfiniteReader