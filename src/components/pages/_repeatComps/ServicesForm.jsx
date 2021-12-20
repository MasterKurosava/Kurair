import sl from "./View.module.css";

import React, { useState } from "react"; 

const ServicesForm = ({activityForms}) =>{
  const [currentActive, setCurrentActive]=useState(activityForms[0].name);
   
  return(
    <div className={sl.findOrder}>
    <div className={sl.orderActivity}>
     {activityForms.map(e=>{
       return <div 
          className={e.name==currentActive ? sl.active : ''} 
          onClick={()=>setCurrentActive(e.name)} 
          key={e.name}
        >{e.name}</div>
        })
      }
    </div>
    <div className={sl.fromTo}>
      {activityForms.map((e,index)=>{
        if(e.name==currentActive){ return <div key={index}>{e.form}</div> }
      })}
    </div>
  </div>
  )
}
export default ServicesForm;