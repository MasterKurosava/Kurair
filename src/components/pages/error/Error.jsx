import React from "react";
import { useHistory } from "react-router";
import { windowChanging } from "../../../utils/windowChange";
import sl from "./Error.module.css";

const Error=()=>{
  const history=useHistory();
  
  const goBack=()=>{
    windowChanging()
    setTimeout(()=>history.goBack(), 1200);
  }
  const goMain=()=>{
    windowChanging()
    setTimeout(()=>history.push('/'), 1500);
  }
  return(
    <div className={sl.notFound}>
      <span className={sl.title}>404</span>
      <h3 className={sl.message}>Страница не найдена</h3>
      <p className={sl.description}>
       Запрашиваемая страница не найдена, либо произошла ошибка. Вы можете 
       <span className={sl.back} onClick={()=>goBack()}> вернуться назад</span>, или перейти на 
      <span className={sl.back} onClick={()=>goMain()}>  главную страницу </span> сайта.
      </p>
    </div>
  )
}

export default Error;