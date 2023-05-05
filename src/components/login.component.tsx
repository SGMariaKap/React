import React from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useTranslation } from 'react-i18next';

type Props = {
  
};

type State = {
  redirect: string | null,
  username: string,
  password: string,
  rememberMe: boolean,
  language: string,
  loading: boolean,
  message: string
};

export default function Login(props: Props) {
  const { t, i18n } = useTranslation();
  interface Lngs {
    [key: string]: {
      nativeName: string;
    };
  }
  
  const lngs: Lngs = {
    en: { nativeName: "EN" },
    fr: { nativeName: "FR" },
  };
  const [state, setState] = React.useState<State>({
    redirect: null,
    username: "",
    password: "",
    rememberMe: false,
    language: "", // set the initial value of language to the props value
    loading: false,
    message: ""
  });

  React.useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      setState(prevState => ({ ...prevState, redirect: "/profile" }));
    };
  }, []);

  function validationSchema() {
    const usernameRequiredMessage = t('Required');
    const passwordRequiredMessage = t('Required');

    return Yup.object().shape({
      username: Yup.string().required(usernameRequiredMessage),
      password: Yup.string().required(passwordRequiredMessage),
    });
  }
  function handleLogin(formValue: { username: string; password: string, rememberMe: boolean, language: string }) {
    const { username, password, rememberMe, language } = formValue;

    setState({
      ...state,
      message: "",
      loading: true
    });

    AuthService.login(username, password, rememberMe, AuthService.getCurrentLanguage()).then(
      (response) => {

        if (response.accessToken) {
          AuthService.setCurrentUser(response.accessToken);
          //localStorage.setItem("user", JSON.stringify(response.accessToken));
          console.log("is user", response.accessToken);

        }

      setState(prevState => ({ ...prevState, redirect: "/profile" }));
      },
      error => {
        
        const resMessage =

          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setState(prevState => ({ ...prevState, loading: false, message: resMessage }));
      }
    );
  }

  if (state.redirect) {
    return <Navigate to={state.redirect} />
  }

  const { loading, message } = state;

  const initialValues = {
    username: "",
    password: "",
    rememberMe: false,
    language: AuthService.getCurrentLanguage(), // set the initial value of language to the current language
    toggle: false,
    checked: [],
  };
  console.log("default language = ", initialValues.language);

  // const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const language = event.target.value;
  //   i18n.changeLanguage(language);
  //   initialValues.language = language; // update the language in the initialValues object
  //   console.log(`Language changed to ${i18n.language}`);
  // }
function handleSetLanguage(language: string){
AuthService.setCurrentLanguage(language);
i18n.changeLanguage(language);
initialValues.language = language; // update the language in the initialValues object
console.log(`Language changed to ${i18n.language}`);
}
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">{t("usernameLabel")}</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t("passwordLabel")}</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
              <label htmlFor="language">{t("languageLabel")}</label>
              {Object.keys(lngs).map((lng: string) => (
              <button
                type="button"
                key={lng}
                onClick={() => handleSetLanguage(lng)}
                disabled={i18n.resolvedLanguage === lng}
                value={lngs[lng].nativeName}>
                {lngs[lng].nativeName}
                
              </button>
            ))
            }
            
              {/* <Field name="language" className="form-control" as="select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => i18n.changeLanguage(e.target.value)}>
  {Object.keys(lngs).map((lng: string) => (
    <option key={lng} value={lngs[lng].nativeName}>{lngs[lng].nativeName}</option>
  ))}
</Field> */}
              </div>

              <div className="form-group">
              <Field type="checkbox" id="rememberMe" name="rememberMe"/>
              <label htmlFor="rememberMe">{t("rememberMeLabel")}</label>
              </div>


              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>{t("login")}</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          )}
          </Formik>
        </div>
      </div>
    );
  }


 