import React from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useTranslation } from 'react-i18next';

// export default function LanguageSwitcher(props: Props) {
//     const { t, i18n } = useTranslation();
//     interface Lngs {
//       [key: string]: {
//         nativeName: string;
//       };
//     }
    
//     const lngs: Lngs = {
//       en: { nativeName: "EN" },
//       fr: { nativeName: "FR" },
//     };
// function handleSetLanguage(language: string){
//     AuthService.setCurrentLanguage(language);
//     i18n.changeLanguage(language);
//     initialValues.language = language; // update the language in the initialValues object
//     console.log(`Language changed to ${i18n.language}`);
//     }

// {Object.keys(lngs).map((lng: string) => (
//     <button
//       type="button"
//       key={lng}
//       onClick={() => handleSetLanguage(lng)}
//       disabled={i18n.resolvedLanguage === lng}
//       value={lngs[lng].nativeName}>
//       {lngs[lng].nativeName}
      
//     </button>
//   ))
//   }
// }