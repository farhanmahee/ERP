import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './public/locales/en/translation.json';
import es from './public/locales/es/translation.json';
import fr from './public/locales/fr/translation.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
