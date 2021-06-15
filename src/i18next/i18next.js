import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import {en, ar} from './locales'

i18next.use(initReactI18next).init({
    cleanCode: true,
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    react: {useSuspense: false},
    whitelist: ['en', 'at'],
    resources: {
        at: {translation: ar},
        en: {translation: en},
    },
})

export default i18next
