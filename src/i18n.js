import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

var countries = require("i18n-iso-countries");

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //fallbackLng: 'en', Disabled temporarily for more visibility into missed translastions
    react: { 
      useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // resources: {
    //   en: {
    //     countries: countries.getNames('en', { select: 'official' }),
    //   }
    // }
  });


export default i18n;