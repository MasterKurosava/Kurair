import sl from "./View.module.css";

import React from "react";
import ServicesForm from "./ServicesForm";

const View=({videoLink, headText, activityForms})=>{
  return(
    <div className={sl.view}>
        <div className={sl.viewBlock}>
          <video autoPlay loop muted src={videoLink}></video>
          <h2>{headText}</h2>
        </div>
       <ServicesForm activityForms={activityForms}/>
      </div>
  )
}
export default View;