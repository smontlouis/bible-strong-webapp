import books from './books'

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
    }, `${books[book - 1].Nom} ${chapter}:`)

  return title
}

export interface Version {
  id: string
  name: string
  name_en?: string
  c?: string
  type?: 'en' | 'fr'
  collection: string
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
