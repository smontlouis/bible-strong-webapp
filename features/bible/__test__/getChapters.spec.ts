import { getNextChapter, getPreviousChapter } from '../bible.utils'

describe('Get Previous Chapter', () => {
  it('default', () => {
    const genericVerse = { book: 2, chapter: 2 }
    expect(getPreviousChapter(genericVerse)).toMatchObject({
      book: 2,
      chapter: 1,
    })
  })

  it('display previous book and last chapter', () => {
    const genericVerse = { book: 2, chapter: 1 }
    expect(getPreviousChapter(genericVerse)).toMatchObject({
      book: 1,
      chapter: 50,
    })
  })

  it('return null when reached end', () => {
    const genericVerse = { book: 2, chapter: 1 }
    expect(getPreviousChapter(genericVerse)).toMatchObject({
      book: 1,
      chapter: 50,
    })
  })
})

describe('Get Next Chapter', () => {
  it('default', () => {
    const genericVerse = { book: 2, chapter: 2 }
    expect(getNextChapter(genericVerse)).toMatchObject({
      book: 2,
      chapter: 3,
    })
  })

  it('display previous book and last chapter', () => {
    const genericVerse = { book: 1, chapter: 50 }
    expect(getNextChapter(genericVerse)).toMatchObject({
      book: 2,
      chapter: 1,
    })
  })

  it('return null when reached end', () => {
    const genericVerse = { book: 66, chapter: 22 }
    expect(getNextChapter(genericVerse)).toBeNull()
  })
})
