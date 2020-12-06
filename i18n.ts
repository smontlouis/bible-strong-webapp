import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './public/locales/en/common.json'
import fr from './public/locales/fr/common.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: 'fr',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
