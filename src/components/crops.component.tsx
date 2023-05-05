import { Component } from "react";
import { Navigate } from "react-router-dom";
//import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import UserService from "../services/user.service";

import EventBus from "../common/EventBus";
type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUserLang: string,
  currentUserModulePermission:string,
  currentUser: IUser & { accessToken: string},
  content: string
}


export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUserLang: "",
      currentUserModulePermission: "",
      currentUser: { accessToken: "" },
      content: ""
    };
  }

  componentDidMount() {
    UserService.getLanguage().then(
      response => {
        console.log("componentDidMount, language = ", response.data);

        this.setState({
          currentUserLang: response.data,
          currentUserModulePermission: response.data,

        });
      },
      error => {
        this.setState({
          currentUserLang:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
     UserService.getModulePermission().then(
      response => {
        console.log("componentDidMount, module permission = ", response.data);

        this.setState({
          currentUserModulePermission: response.data,

        });
      },
      error => {
        this.setState({
          currentUserModulePermission:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
      // UserService.getLanguage();
      // console.log(this.state);

    //if (!currentUser) this.setState({ redirect: "/home" });
    //this.setState({ currentUserLang: currentUserLang.data, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container container-fluid">
        <div className="content-nav__wrapper">
          <ul className="content-nav">
            <li className="content-nav__item">
              <a href="/" className="content-nav__link">Europe crops</a>
            </li>
          </ul>
          <div className="contenu">

            <div className="component component-text">
            <h1>Crops - Areas, yields and production</h1>
            </div>
        
        <div className="container overflow-hidden">
        <div className="row text-center pb-3 g-5">
          <div className="col-md-6 encartTutoriel">
            <p className="pt-2 pb-3 px-3">Discover the new interactive table</p>
            <a href="https://www.strategie-grains.com/content_x_548" target="_blank" className="button button-green" style={{textDecoration: "none", WebkitAppearance: "button-bevel"}}>Explore tutorial</a>
          </div>
          <div className="col-md-6 encartDownload">
          <p className="pt-2 pb-3 px-3">Download the raw data in CSV, XLS formats</p>
          <form action="" method="POST"><input type="submit" className="button " value="Access to download menu"/>
		      </form>
          </div>
        </div>
        </div>

        <h2 className="texteBandTableau1 py-3"><strong>Interactive table</strong></h2>
     <div className="section group menuCrop">
      <form action="" name="formProd1" method="POST">
        <div className="col mescols4">
          <label>Product</label>
          <select name="codepro" id="">
            <option value="">All products</option>
            <option value="">Soft Wheat</option>
            <option value="">Durum Wheat</option>
          </select>
        </div>
        <div className="col mescols4">
          <label>Country</label>
          <select name="codep" id="">
            <option value="">All countries</option>
            <option value="">Germany</option>
            <option value="">Belgium</option>
          </select>
        </div>
        <div className="col mescols4">
          <label>Marketing year</label>
          <select name="AnneeRec" id="">
            <option value="">2023</option>
            <option value="">2022</option>
            <option value="">2021</option>
          </select>
        </div>
        
        <div className="col mescols4">
          <label>Data</label>
          <select name="TypeDonneeProd" id="">
            <option value="">Output</option>
            <option value="">Area</option>
            <option value="">Field</option>
          </select>
        </div>
        </form>
        <div className="col monbouton">
          <form action="">
            <input type="submit" className="submit" value="Submit"/>

          </form>
        </div>
      
     </div>
     <h3 className="texteBandTableau1">2023/Output: detailed (kt)</h3>
        {/* <p>Hello world {this.state.currentUserLang}</p> */}
        {/* {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <p>
              <strong>Language:</strong>{" "}
            </p>
            {/*<strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
          </div> : null} */}
      </div>
      </div>
      </div>
      
    );
  }
}
