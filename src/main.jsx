import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App"));
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
// styles
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icons.min.css";

// i18next multi language
i18next
  // initReactI18next ni ishlatish
  .use(initReactI18next)
  // tillarni ozgarishini kuzatish uchun LanguageDetector
  .use(LanguageDetector)
  // tillarni json filarini ishlatish uchun HttpApi
  .use(HttpApi)
  .init({
    // web site qanday tilarni tarjima qilishi munkun shuni korsatish kerak
    supportedLngs: ["en", "uz", "ar"],
    // hozirda turgan til korsatiladi youki ozgartiriladi
    fallbackLng: "en",
    detection: {
      // tilni ozgartirish usullari
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
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

const loadingMarkup = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      position: "absolute",
      top: "0px",
      left: "0px",
    }}
  >
    <div className="loader"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={loadingMarkup}>
      <App />
    </Suspense>
  </React.StrictMode>
);
