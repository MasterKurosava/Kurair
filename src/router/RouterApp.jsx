import React from "react";
import {Route, Switch,Redirect } from 'react-router-dom';
import OfficeInfo from "../components/pages/_subPages/adresses/comps/OfficeInfo";
import pages from "./routers";

const RouterApp=()=>{
  return(
    <Switch>
      <Route path="/posts/:code" exact={true}> <OfficeInfo/> </Route>
      {pages.mainPages.map(route=>
      
        <Route key={route.name} component={route.component} path={route.path} exact={true}/>
      )}
      {pages.subPages.map(route=>
        <Route key={route.name} component={route.component} path={route.path} exact={true}/>
      )}
      {pages.additionally.map(route=>
        <Route key={route.path} component={route.component} path={route.path} exact={true} />
      )}
      <Redirect to={"/404"}/>
    </Switch>
  )
}
export default RouterApp;