import React, { useEffect, useRef, useState } from "react";
import { checkRegister } from "../../../../utils/checkAuntification";
import sl from "../Authentication.module.css";
import er from "../../../../styles/errors.module.css";

import userImg from "../../../../images/user.png";
import passwordImg from "../../../../images/password.png";
import emailImg from "../../../../images/email.png";

import { setUser } from "../../../../utils/usersWork";

const RegisterForm=({changeForm})=>{
  const [login, setLogin]=useState("");
  const [password, setPassword]=useState("");
  const [repeatPas, setRepeatPas]=useState("");
  const [email, setMail]=useState("");

  const logLabel=useRef();
  const pasLabel=useRef();
  const repeatLabel=useRef();
  const mailLabel=useRef();

  //ставим галочки
  const setSuccess=()=>{
    [logLabel ,pasLabel ,repeatLabel ,mailLabel].forEach(label=>{
      label.current.classList.add(sl.successLabel);
    });
  }
  //проверяем длину логина
  const checkLength=(value)=>{
    if(value.length<=20){
      setLogin(value);
    }
  }
  const activeInput=(ref)=>{
    for(let error in er){
      ref.current.classList.remove(er[error]);
    }
    ref.current.classList.add(sl.active);
  }
  const deactiveInput=(ref)=>{
    ref.current.classList.remove(sl.active);
  }

  //проверяем форму
  const getForm=()=>{
    const error=checkRegister(login, password, repeatPas, email, logLabel, pasLabel,repeatLabel, mailLabel);
    if(error) return;
    setUser(login, password, email);
    setSuccess();
    setTimeout(()=> changeForm('login'),1500);
  }
  return(
    <div className={sl.formContainer}>
          <div className={sl.formLabel}>
            <span className={sl.titleIcon} style={{backgroundImage: `url(${userImg})`}}/>
            <span className={sl.formTitle}>Логин</span>
            <div ref={logLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>checkLength(e.target.value)}
                onFocus={()=>activeInput(logLabel)}
                onBlur={()=>deactiveInput(logLabel)}
                className={sl.formInput} 
                type="text" 
                value={login}
                placeholder="Обычно совпадает с номером договора" />    
            </div>
          </div>

          <div className={sl.formLabel}>
            <span className={sl.titleIcon} style={{backgroundImage: `url(${passwordImg})`}}/>
            <span className={sl.formTitle}>Пароль</span>
            <div ref={pasLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>setPassword(e.target.value)}
                onFocus={()=>activeInput(pasLabel)}
                onBlur={()=>deactiveInput(pasLabel)}
                className={sl.formInput} 
                type="password"
                value={password}
                placeholder="Ваш пароль" />    
            </div>
          </div>

          <div className={sl.formLabel}>
            <span className={sl.titleIcon} style={{backgroundImage: `url(${passwordImg})`}}/>
            <span className={sl.formTitle}>Повторите пароль</span>
            <div ref={repeatLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>setRepeatPas(e.target.value)}
                onFocus={()=>activeInput(repeatLabel)}
                onBlur={()=>deactiveInput(repeatLabel)}
                className={sl.formInput} 
                type="password"
                value={repeatPas}
                placeholder="Ваш пароль" />    
            </div>
          </div>

          <div className={sl.formLabel}>
            <span className={sl.titleIcon} style={{backgroundImage: `url(${emailImg})`}}/>
            <span className={sl.formTitle}>Ваша почта</span>
            <div ref={mailLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>setMail(e.target.value)}
                onFocus={()=>activeInput(mailLabel)}
                onBlur={()=>deactiveInput(mailLabel)}
                className={sl.formInput} 
                type="email"
                value={email}
                placeholder="Почта" />    
            </div>
          </div>
          
          <button onClick={()=>getForm()} className={sl.submitBtn}>Зарегистрироваться</button>
        </div>
  )
}
export default RegisterForm;