import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
// import App from "./App";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// i18next multi language
i18next
  // initReactI18next ni ishlatish
  .use(initReactI18next)
  // tillarni ozgarishini kuzatish uchun LanguageDetector
  .use(LanguageDetector)
  // tillarni json filarini ishlatish uchun HttpApi
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "uz"],
    // hozirda turgan til korsatiladi youki ozgartiriladi
    fallbackLng: "en",
    detection: {
      // tilni ozgartirish usullari
      order: ["cookie", "htmlTag", "localStorage", "subdomain", "path"],
      // bravzerni kashi
      caches: ["cookie"],
    },
    backend: {
      // tarjima json filelar resources
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });
document.documentElement.lang = localStorage.getItem("i18nextLng");

function App() {
  const { t } = useTranslation();

  return <h2>{t("welcome_to_react")}</h2>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
