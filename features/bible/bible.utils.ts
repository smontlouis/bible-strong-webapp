import { VerseBase, Version } from '../../common/types'
import { firestore } from '../../lib/firebase-app'
import books from './books'
import i18n from '../../i18n'

export const getPreviousChapter = (
  basicVerse: Omit<VerseBase, 'verse'> | null
) => {
  if (!basicVerse) return null
  const { book, chapter } = basicVerse
  if (chapter === 1) {
    if (book === 1) {
      return null
    }
    return {
      book: book - 1,
      chapter: books[book - 1 - 1].Chapitres,
      hasNewBook: books[book - 1 - 1].Chapitres === 1,
    }
  }

  return {
    book,
    chapter: chapter - 1,
    hasNewBook: chapter - 1 === 1,
  }
}

export const getNextChapter = (basicVerse: Omit<VerseBase, 'verse'> | null) => {
  if (!basicVerse) return null
  const { book, chapter } = basicVerse
  if (chapter === books[book - 1].Chapitres) {
    if (book === 66 && chapter === books[65].Chapitres) {
      return null
    }
    return {
      book: book + 1,
      chapter: 1,
      hasNewBook: true,
    }
  }

  return {
    book,
    chapter: chapter + 1,
    hasNewBook: false,
  }
}

export const findReference = async (ref: string): Promise<VerseBase | null> => {
  let reference = ref.trim().toLowerCase()

  const findBook = books.find((book) =>
    reference.includes(i18n.t(book.Nom).toLowerCase())
  )

  if (!findBook) {
    return null
  }

  if (reference === i18n.t(findBook.Nom).toLowerCase()) {
    return {
      book: findBook.Numero,
      chapter: 1,
      verse: 1,
    }
  }

  const numbers = reference
    .replace(i18n.t(findBook.Nom).toLowerCase(), '')
    .trim()
    .match(/\d+/g)
    ?.map(Number)

  if (!numbers?.length) {
    return null
  }

  if (numbers.length === 1) {
    if (numbers[0] <= findBook.Chapitres) {
      return {
        book: findBook.Numero,
        chapter: numbers[0],
        verse: 1,
      }
    } else {
      const snapshot = await firestore
        .collection(findBook.Numero < 40 ? 'lsgsat2' : 'lsgsnt2')
        .doc(`${findBook.Numero}-${findBook.Chapitres}`)
        .get()
      const { count } = snapshot.data() as { count: number }

      return {
        book: findBook.Numero,
        chapter: findBook.Chapitres,
        verse: count,
      }
    }
  }

  if (numbers.length > 1) {
    const [chapter, verse] = numbers
    if (chapter <= findBook.Chapitres) {
      const snapshot = await firestore
        .collection(findBook.Numero < 40 ? 'lsgsat2' : 'lsgsnt2')
        .doc(`${findBook.Numero}-${chapter}`)
        .get()
      const { count } = snapshot.data() as { count: number }

      return {
        book: findBook.Numero,
        chapter,
        verse: verse > count ? count : verse,
      }
    } else {
      return null
    }
  }

  return null
}

export const getReferenceChapter = ({
  book,
  chapter,
}: {
  book: number
  chapter: number
}) => {
  return `${i18n.t(books[book - 1].Nom)} ${chapter}`
}

export const getReferenceByObject = (verses: VerseBase[]) =>
  getReference(
    verses.map(({ book, chapter, verse }) => `${book}-${chapter}-${verse}`)
  )

/**
 * Get reference of given verses
 * eg: ['1-1-1', '1-1-2', '1-1-4'] : Genèse 1:1-2,4
 * @param verses
 */
export const getReference = (verses: string[]) => {
  const [book, chapter] = verses[0].split('-').map(Number)

  const title: string = verses
    .map((v) => Number(v.split('-')[2]))
    .reduce((acc, v, i, array) => {
      if (v === array[i - 1] + 1 && v === array[i + 1] - 1) {
        // if suite > 2
        return acc
      }
      if (v === array[i - 1] + 1 && v !== array[i + 1] - 1) {
        // if endSuite
        return `${acc}-${v}`
      }
      if (array[i - 1] && v - 1 !== array[i - 1]) {
        // if not preceded by - 1
        return `${acc},${v}`
      }
      return acc + v
    }, `${i18n.t(books[book - 1].Nom)} ${chapter}:`)

  return title
}

export const versions: Version[] = [
  {
    id: 'LSG',
    name: 'Bible Segond 1910',
    c: '1910 - Libre de droit',
    type: 'fr',
    collection: 'bible-lsg-1910',
  },
  {
    id: 'NBS',
    name: 'Nouvelle Bible Segond',
    c: '© 2002 Société Biblique Française',
    type: 'fr',
    collection: 'bible-nbs',
  },
  {
    id: 'NEG79',
    name: 'Nouvelle Edition de Genève 1979',
    c: '© 1979 Société Biblique de Genève',
    type: 'fr',
    collection: 'bible-neg79',
  },
  {
    id: 'NVS78P',
    name: 'Nouvelle Segond révisée',
    c: '© Alliance Biblique Française',
    type: 'fr',
    collection: 'bible-nvs78p',
  },
  {
    id: 'S21',
    name: 'Bible Segond 21',
    c: '© 2007 Société Biblique de Genève',
    type: 'fr',
    collection: 'bible-s21',
  },
  {
    id: 'KJF',
    name: 'King James Française',
    c: '© 1611 Traduction française, Bible des réformateurs 2006',
    type: 'fr',
    collection: 'bible-kjf',
  },
  {
    id: 'DBY',
    name: 'Bible Darby',
    c: '1890 Libre de droit',
    type: 'fr',
    collection: 'bible-dby',
  },
  {
    id: 'OST',
    name: 'Ostervald',
    c: '1881 Libre de droit',
    type: 'fr',
    collection: 'bible-ost',
  },
  {
    id: 'CHU',
    name: 'Bible Chouraqui 1985',
    c: '© 1977 Editions Desclée de Brouwer',
    type: 'fr',
    collection: 'bible-chu',
  },
  {
    id: 'BDS',
    name: 'Bible du Semeur',
    c: '© 2000 Société Biblique Internationale',
    type: 'fr',
    collection: 'bible-bds',
  },
  {
    id: 'FMAR',
    name: 'Martin 1744',
    c: '1744 Libre de droit',
    type: 'fr',
    collection: 'bible-fmar',
  },
  {
    id: 'BFC',
    name: 'Bible en Français courant',
    c: '© Alliance Biblique Française',
    type: 'fr',
    collection: 'bible-bfc',
  },
  {
    id: 'FRC97',
    name: 'Français courant',
    c: '© Alliance Biblique Française',
    type: 'fr',
    collection: 'bible-frc97',
  },
  {
    id: 'NFC',
    name: 'Nouvelle Français courant',
    c: "Alliance biblique française Bibli'0, ©2019",
    type: 'fr',
    collection: 'bible-nfc',
  },
  {
    id: 'KJV',
    name: 'King James Version',
    c: '1611 Libre de droit',
    type: 'en',
    collection: 'bible-kjv',
  },
  {
    id: 'NKJV',
    name: 'New King James Version',
    c: '© 1982 Thomas Nelson, Inc',
    type: 'en',
    collection: 'bible-nkjv',
  },
  {
    id: 'ESV',
    name: 'English Standard Version',
    c: '© 2001 Crossway Bibles',
    type: 'en',
    collection: 'bible-esv',
  },
  {
    id: 'NIV',
    name: 'New International Version',
    c: '© NIV® 1973, 1978, 1984, 2011 Biblica',
    type: 'en',
    collection: 'bible-niv',
  },
  {
    id: 'BCC1923',
    name: 'Bible catholique Crampon 1923',
    c: '© mission-web.com',
    type: 'fr',
    collection: 'bible-bcc1923',
  },
  {
    id: 'PDV2017',
    name: 'Parole de Vie 2017',
    c: "© 2000 Société biblique française - Bibli'O",
    type: 'fr',
    collection: 'bible-pdv2017',
  },
  {
    id: 'POV',
    name: 'Parole vivante (NT)',
    c: '© 2013',
    type: 'fr',
    collection: 'bible-pov',
  },
  {
    id: 'BHS',
    name: 'Biblia Hebraica Stuttgartensia (AT)',
    name_en: 'Biblia Hebraica Stuttgartensia (OT)',
    c: '© Deutsche Bibelgesellschaft, Stuttgart 1967/77',
    collection: 'bible-hebrew',
  },
  {
    id: 'LXX',
    name: 'Septante (AT)',
    name_en: 'Septuagint (OT)',
    collection: 'bible-lxx',
  },
  {
    id: 'SBLGNT',
    name: 'SBL NT. Grec (NT)',
    name_en: 'SBL NT. Greek (NT)',
    c: '© 2010 Society of Bible Litterature',
    collection: 'bible-greek',
  },
  {
    id: 'TR1624',
    name: 'Elzevir Textus Receptus 1624 (NT)',
    collection: 'bible-TR1624',
  },
  {
    id: 'TR1894',
    name: 'Scrivener’s Textus Receptus 1894 (NT)',
    collection: 'bible-TR1894',
  },
]

export const isElementVisible = (el: Element) => {
  const rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight = window.innerHeight || document.documentElement.clientHeight,
    efp = function (x: number, y: number) {
      return document.elementFromPoint(x, y)
    }

  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  )
    return false

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  )
}
