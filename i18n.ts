import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './public/locales/en/common.json'
import enBooksTranslation from './public/locales/en/translation_book.json'
import fr from './public/locales/fr/common.json'
import commonManualEn from './public/locales/en/common_manual.json'
import commonManualFr from './public/locales/fr/common_manual.json'

i18n.use(initReactI18next).init({
  keySeparator: '.',
  nsSeparator: '|',
  resources: {
    en: {
      translation: { ...en, ...enBooksTranslation, ...commonManualEn },
    },
    fr: {
      translation: { ...fr, ...commonManualFr },
    },
  },
  lng: 'fr',

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
