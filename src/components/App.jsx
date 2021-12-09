import "../styles/app.css";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";


import { HashRouter  } from "react-router-dom";
import RouterApp from "../router/RouterApp";


const App=()=>{
  return(
    <HashRouter >
      <Header/>
      <div className="App">
        <RouterApp/>
      </div>
      <Footer/>

    </HashRouter >
  )
}

export default App;