import React from "react";
import st from "./BtnSubmit.module.css";

const BtnSubmit=({value, click})=>{

  return(
    <button  onClick={click} className={st.submit}>{value}</button>
  )
}

export default BtnSubmit;