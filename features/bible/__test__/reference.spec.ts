import { auth } from '../../../lib/firebase-app'
import { findReference } from '../bible.utils'

describe('Find reference - fr', () => {
  beforeEach(async () => {
    await auth.signInAnonymously()
  })

  it('genèse', async () => {
    const response = await findReference('genèse')
    expect(response).toMatchObject({
      book: 1,
      chapter: 1,
      verse: 1,
    })
  })

  it('fail - gernèse', async () => {
    const response = await findReference('gernèse')
    expect(response).toBeNull()
  })

  it('Genèse 50', async () => {
    const response = await findReference('Genèse 50')
    expect(response).toMatchObject({
      book: 1,
      chapter: 50,
      verse: 1,
    })
  })

  it('fail - Genèse 70', async () => {
    const response = await findReference('Genèse 70')
    expect(response).toBeNull()
  })

  it('Genèse 10:4', async () => {
    const response = await findReference('Genèse 10:4')
    expect(response).toMatchObject({
      book: 1,
      chapter: 10,
      verse: 4,
    })
  })

  it('Genèse 10:342 -> Genèse 10:1', async () => {
    const response = await findReference('Genèse 10:342')
    expect(response).toMatchObject({
      book: 1,
      chapter: 10,
      verse: 1,
    })
  })

  it('Genèse 10.12', async () => {
    const response = await findReference('Genèse 10.12')
    expect(response).toMatchObject({
      book: 1,
      chapter: 10,
      verse: 12,
    })
  })
})
