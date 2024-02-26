// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('../../../public/locales/en/translation.json'),
  },
  tr: {
    translation: require('../../../public/locales/tr/translation.json'),
  } 
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'tr', // Düşük dil desteği durumunda kullanılacak dil
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
