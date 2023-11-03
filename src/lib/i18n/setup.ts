import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';
import translationEN from '@/lib/i18n/translations/en/general.json';
import resourcesToBackend from 'i18next-resources-to-backend';

const RESOURCES = {
  en: {
    general: translationEN,
  },
};

export const setupI18Next = async (callback?: () => void) => {
  await i18next
    .use(initReactI18next)
    .use(resourcesToBackend(RESOURCES))
    .init({
      compatibilityJSON: 'v3',
      resources: RESOURCES,
      fallbackLng: 'en',
      returnNull: false,
      react: {
        useSuspense: false,
      },
    });
  if (callback) {
    return callback();
  }
};
