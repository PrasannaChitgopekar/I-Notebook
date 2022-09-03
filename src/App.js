// import logo from './logo.svg';
//npm install react-router-dom@5.2.0 -> react router dom install
//context api ->  if i logged in one component which is present at last of right part tree ,and i want to verifie user in left corner of left tree then so defulclt to identifie the user so go for context api . So i will create one context so i can use in any of component by contex hook(like funtion call) 
//uselocationhook -> from this we can make respective link active(dark color)
//font awesome -> os for ahce ache icons
// npm install cors -> should install in backend


import "./App.css";
import {useState} from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      tp: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
    <NoteState>
      <Router>
        <Navbar about = "About"/>
        <Alert alert={alert}/>
       <div className="container">
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
         
        </Switch>

        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
