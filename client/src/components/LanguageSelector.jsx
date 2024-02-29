import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { /*t,*/ i18n } = useTranslation();

  //     const changeLanguage = (language) => {
  //     i18n.changeLanguage(language);
  // };

  return (
    <div
      className="fixed bottom-4 right-4 glass p-2 rounded"
      style={{ zIndex: 51 }} // Pour assurer que le composant est au-dessus du reste de votre application
    >
      <button
        className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        onClick={() => i18n.changeLanguage("fr")}
      >
        FR
      </button>
    </div>
  );
}

export default LanguageSelector;
