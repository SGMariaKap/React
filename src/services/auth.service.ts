import axios from "axios";

const API_URL = "https://dev-sg.azurewebsites.net/api/AccountLoginApi/Login";
const languageVar = localStorage.getItem("languageVar");

class AuthService {
  login(username: string, password: string, rememberMe: boolean, language: string) {
    return axios
      .post(API_URL, null, {params: {
        username: username,
        password: password,
        language: language,
        rememberMe: rememberMe
      }})
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.setCurrentLanguage(language);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("usertoken");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("usertoken");
    if (userStr !== null ) return "1";
    
    return null;
  }
  setCurrentUser(userset: string) {
   localStorage.setItem("usertoken", (userset));
  }
  getCurrentLanguage () {
    const languageVar = localStorage.getItem("languageVar");
    if (languageVar) return JSON.parse(languageVar);
    return null;
  }

  setCurrentLanguage (language: string) {
    localStorage.setItem("languageVar", JSON.stringify(language));

    //if user connected, make [POST] Setlanguage call
    //UserService.setLanguage
    
    return null;
  }
}

export default new AuthService();
