import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component"; 
import Home from "./components/home.component";
import Profile from "./components/crops.component";
// import BoardUser from "./components/board-user.component";

import EventBus from "./common/EventBus";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faWheatAwn, faGlobe, faDroplet, faEarthEurope, faCow, faHouse, faChartLine, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

type Props={}
type State = {
 // currentUser: IUser | undefined,
  userToken: string
}
const thisuser= AuthService.getCurrentUser();

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
     // currentUser: undefined,
      userToken: ""
    };
  }
  componentDidMount() {
    const user1 = AuthService.getCurrentUser();

    if (user1) {
      this.setState({
      //  currentUser: undefined,
        userToken: user1
      });
    }

    EventBus.on("logout", this.logOut);
  }

    componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      // currentUser: undefined,
       userToken: ""
     });
   }

  render() {
 //    const userToken = AuthService.getCurrentUser();
 const userStr = localStorage.getItem("usertoken");
     const { userToken} = this.state;

    return ( 
      <main className="flex-1">
        
          {(userToken !== "") ? (

            <header className="page-header">
              <div className="page-header__bar">
              <div className="page-header__bar-wrapper">
                <a href="/" className="page-header__logo-link">
                  <img src="/img/logo.svg"/>
                </a>
              
              {/* <div className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </div> */}
              <div>
                <button className="language-picker__toggler">
                <FontAwesomeIcon icon={faChevronDown} className="icon-arrow-top" style={{paddingRight: "0.5rem"}}/> 
                <img src="/img/fr-flag.svg" className="language-picker__flag"/>
                </button>

                <div className="language-picker__dropdown" style={{display: "none"}}>
                    <div className="language-picker__dropdown-content">
                      <ul className="language-picker__list">
                        <li className="language-picker__item">
                          <a href="/" className="language-picker__link">
                            <img src="/img/fr-flag.svg" alt="" className="language-picker__flag" />
                          Français
                          </a>
                        </li>                
                </ul>
                </div>
                </div>
              </div>
             <div className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                {/* {t("logout")} */}Logout
                </a>
              </div>
              
            </div>
            </div>
            </header>
          ) : (
            <header className="page-header">
               <div className="page-header__bar">
              <div className="page-header__bar-wrapper">
                <a href="/" className="page-header__logo-link">
                  <img src="/img/logo.svg"/>
                </a>
              <Link to={"/"} className="navbar-brand">
                {/* {t("sitelabel")} */}Pre-paywall header
              </Link>
              <div>
                <button className="language-picker__toggler">
                <FontAwesomeIcon icon={faChevronDown} className="icon-arrow-top" style={{paddingRight: "0.5rem"}}/> 
                <img src="/img/fr-flag.svg" className="language-picker__flag"/>
                </button>

                <div className="language-picker__dropdown" style={{display: "none"}}>
                    <div className="language-picker__dropdown-content">
                      <ul className="language-picker__list">
                        <li className="language-picker__item">
                          <a href="/" className="language-picker__link">
                            <img src="/img/fr-flag.svg" alt="" className="language-picker__flag" />
                          Français
                          </a>
                        </li>                
                </ul>
                </div>
                </div>
              </div>
              <div className="nav-item">
                <Link to={"/login"} className="nav-link">
                {/* {t("login")} */}Login
                </Link>
              </div>
              </div>
            </div>
            </header>
          )}

           <div className="container site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/home" element={<Home />} />*/}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
             {/* <Route path="/user" element={<BoardUser />} /> */}
          </Routes>
        </div>
   {/* MENU */}
   {(userToken !== "") ? (
            <div className="navbar js-menu-overlay">
              <ul className="navbar__nav">
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                    <FontAwesomeIcon icon={faHouse} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">Home</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                    <FontAwesomeIcon icon={faChartLine} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">Supply and demand</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                    <FontAwesomeIcon icon={faFileInvoice} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">Reports</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                    <FontAwesomeIcon icon={faWheatAwn} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                  <span className="navbar__nav-item-text">Crops</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                   <FontAwesomeIcon icon={faGlobe} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                  <span className="navbar__nav-item-text">World trade</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                   <FontAwesomeIcon icon={faEarthEurope} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">EU trade</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                    <FontAwesomeIcon icon={faDroplet} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">EU biofuels</span>
                  </a>
                </li>
                <li className="navbar__nav-item">
                  <a href="/" className="navbar__nav-link">
                   <FontAwesomeIcon icon={faCow} style={{fontSize: "1rem", paddingBottom: "0.5rem"}} />
                    <span className="navbar__nav-item-text">Animal feed</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar js-menu-overlay">
            <ul className="navbar__nav">
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">Home</span>
                </a>
              </li>
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">About us</span>
                </a>
              </li>
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">Reports and publications</span>
                </a>
              </li>
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">Data modules</span>
                </a>
              </li>
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">Api dictionnary</span>
                </a>
              </li>
              <li className="navbar__nav-item">
                <a href="/" className="navbar__nav-link">
                  <i className="icon icon-home"></i>
                  <span className="navbar__nav-item-text">Free demo</span>
                </a>
              </li>
              
            </ul>
          </div>
          )}

        { /*<AuthVerify logOut={this.logOut}/> */}
      </main>

      
    );
  }
}

export default App;