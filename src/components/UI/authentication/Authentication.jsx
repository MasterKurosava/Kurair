import React, { useRef, useState } from "react";

import sl from "./Authentication.module.css";
import LoginForm from "./comps/LoginForm";
import RegisterForm from "./comps/RegisterForm";

const Authentication=({setCurrentUser,close})=>{
  const [form, setForm]=useState('login');
  const loginWindow=useRef()

  const closeWindow=()=>{
    loginWindow.current.classList.add(sl.hiding);
    setTimeout(()=>close(),450);
  }
  return(
    <div ref={loginWindow} className={sl.loginWindow} onClick={()=>closeWindow(false)}>
      <div className={sl.container} onClick={(e)=>e.stopPropagation()}>
        <div className={sl.description}>
          <h3 className={sl.accessTitle}>Личный кабинет позволяет:</h3>
          <ul className={sl.accessList}>
            <li className={sl.accessItem}>отследить заказы;</li>
            <li className={sl.accessItem}>самостоятельно оформить и распечатать заполненные для отправки накладные;</li>
            <li className={sl.accessItem}>произвести расчет стоимости доставки с учетом предоставленных скидок по одному или нескольким направлениям;</li>
            <li className={sl.accessItem}>получить информацию о состоянии счета;</li>
            <li className={sl.accessItem}>получить информацию о контактах закрепленных сотрудников;</li>
            <li className={sl.accessItem}>получить акты оказанных услуг за весь период;</li>
            <li className={sl.accessItem}>сформировать акт сверки;</li>
            <li className={sl.accessItem}>получить информацию по реестрам перечисления наложенных платежей.</li>
          </ul>
        </div>
        {form=="login"
         ?<LoginForm setCurrentUser={setCurrentUser} changeForm={setForm} closeWindow={closeWindow}/>
         :<RegisterForm  changeForm={setForm} closeWindow={closeWindow}/>
        }

      </div>
    </div>
  )
}

export default Authentication;