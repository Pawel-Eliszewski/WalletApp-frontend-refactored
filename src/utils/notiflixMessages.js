import translationsPL from "../translations/pl.json";
import translationsEN from "../translations/en.json";

const translations = {
  pl: translationsPL,
  en: translationsEN,
};

const getTranslation = (appLanguage) => translations[appLanguage];
const getTranslatedMessage = (appLanguage, key) =>
  getTranslation(appLanguage)[key];

export const loggingSuccessfulMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyLoggedIn");

export const welcomeMessage = (appLanguage, firstname) =>
  getTranslatedMessage(appLanguage, "notifyWelcome") + ` ${firstname}`;

export const logInAgainMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyLogInAgain");

export const sessionExpiredMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifySessionExpired");

export const loggingOutMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyLoggingOut");

export const loggedOutMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyLoggedOut");

export const registeredMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyRegistered");

export const emailInUseMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyEmailInUse");

export const registrationFailedMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyRegistrationFailed");

export const loggingFailedMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyLoggingFailed");

export const invalidCredentialsMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyInvalidCredentials");

export const tryAgainMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyTrtAgain");

export const networkErrorMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyNetworkError");

export const addTransactionMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyAdded");

export const deleteTransactionMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyDeleted");

export const updateTransactionMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyUpdated");

export const loggingMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "titleLogin");

export const noFiltersMessage = (appLanguage) =>
  getTranslatedMessage(appLanguage, "notifyNoFilters");
