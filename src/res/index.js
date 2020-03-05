import { LANGUAGES } from '../helpers/constants';

import en from './en.json';
const language = JSON.parse(localStorage.getItem('language')) || {language: LANGUAGES.ENGLISH};

let languageSingleton = {};

if (language.language === LANGUAGES.ENGLISH) {
  languageSingleton = en;
}

export default languageSingleton
