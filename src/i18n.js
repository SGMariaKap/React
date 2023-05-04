import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    //fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          usernameLabel: 'Username',
          passwordLabel: 'Password',
          languageLabel: 'Language',
          rememberMeLabel: 'Remember me',
          usernameRequired: 'Please fill in the username field',
          passwordRequiredMessage: 'Please fill in the password field',
          login: 'Login',
          logout: 'Logout',
          sitelabel: 'SG React Test'
        },
      },
      fr: {
        translation: {
          usernameLabel: 'Nom d\'utilisateur',
          passwordLabel: 'Mot de passe',
          languageLabel: 'Langue',
          rememberMeLabel: 'Se souvenir de moi',
          usernameRequired: 'Veuillez saisir le nom d\'utilisateur',
          passwordRequiredMessage: 'Veuillez saisir le mot de passe',
          login: 'Se connecter',
          logout: 'Se déconnecter',
          sitelabel: 'Test de SG React'
        },
      },
    },
  });


export default i18n;