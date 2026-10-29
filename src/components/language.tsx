"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language } from "../translations";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (value: Language) => void;
}>({ language: "nb", setLanguage: () => {} });
export const useLanguage = () => useContext(LanguageContext);
export function Copy({ id }: { id: string }) {
  const { language } = useLanguage();
  return (
    <>
      {(translations[language][id] ?? "").split("<br>").map((line, index) => (
        <span key={index}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </>
  );
}
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nb");
  useEffect(() => {
    try {
      if (localStorage.getItem("izakaya-language") === "en") setLanguage("en");
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    const keyboard = () => {
      document.documentElement.dataset.input = "keyboard";
    };
    const pointer = () => {
      document.documentElement.dataset.input = "pointer";
    };
    document.addEventListener("keydown", keyboard, true);
    document.addEventListener("pointerdown", pointer, true);
    return () => {
      document.removeEventListener("keydown", keyboard, true);
      document.removeEventListener("pointerdown", pointer, true);
    };
  }, []);
  function chooseLanguage(value: Language) {
    setLanguage(value);
    try {
      localStorage.setItem("izakaya-language", value);
    } catch {}
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage: chooseLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
