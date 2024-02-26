import { useTranslation } from 'react-i18next';

const LanguageManager = () => {
    const { t,i18n } = useTranslation();
  
  const changeLanguage = async (language:string) => {
    i18n.changeLanguage(language);
  };

  const translate = (key:string):string => {
    return  t(key);
  };

  const getLanguage = ():string => {
    return  i18n.language;
  };

  return {
    changeLanguage,
    getLanguage,
    translate
  };
};

export default LanguageManager;