import React from "react";
import sl from "./Callback.module.css";


const ThemeList=({close})=>{

  return(
    <div className={sl.themeList} onClick={(e)=>e.stopPropagation()}>
      <ul>
        <li onClick={(e)=>close(e.target.textContent)} className={sl.theme}>Оформить заявку на вызов курьера</li>
        <li onClick={(e)=>close(e.target.textContent)} className={sl.theme}>Отследить состояние доставки</li>
        <li onClick={(e)=>close(e.target.textContent)} className={sl.theme}>Вопрос сотрудничества</li>
        <li onClick={(e)=>close(e.target.textContent)} className={sl.theme}>Взаиморасчеты, звонок кредитного контролера</li>
        <li onClick={(e)=>close(e.target.textContent)} className={sl.theme}>Другое</li>
      </ul>
    </div>
  )
}

export default ThemeList;