"use client"
import { useSelector, useDispatch } from "react-redux";
import { toggleLanguage } from "@/store/slices/languageSlice"; // Caminho para o slice
import { FaFlagUsa } from "react-icons/fa";

import EUA from '../../public/eua.png'
import Brazil from '../../public/brasil.png'
import Image from "next/image";

const LanguageToggle = () => {
  const language = useSelector((state) => state.language.language); // Estado global do idioma
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggle}
    >
      {language === "pt" ? (
        <>
          <Image src={Brazil} alt="Brazil PT-br"/>
        </>
      ) : (
        <>
          <Image src={EUA} alt="United States En"/>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;
