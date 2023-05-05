import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://dev-sg.azurewebsites.net/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
 //to change language once connected
  getUserBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getLanguage(){
    return axios.get(API_URL + 'LanguageApi/GetLanguage', { headers: authHeader() });
  }
  getModulePermission(){
    return axios.get(API_URL + 'Module/GetModulePermission', { headers: authHeader() });
  } 
  setLanguage(language: string){
    return axios.post(API_URL + 'LanguageApi/SetLanguage', { headers: authHeader(), language: language });
  }
}

export default new UserService();
