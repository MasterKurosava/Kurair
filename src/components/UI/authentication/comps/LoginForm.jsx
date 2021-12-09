import React, { useRef, useState } from "react";
import { getLoginForm } from "../../../../utils/checkAuntification";
import sl from "../Authentication.module.css";
import er from "../../../../styles/errors.module.css";

import userImg from "../../../../images/user.png";
import passwordImg from "../../../../images/password.png";

const LoginForm=({setCurrentUser,changeForm, closeWindow})=>{
  const [login, setLogin]=useState("");
  const [password, setPassword]=useState("");

  const [remember, setRemember]=useState(false);
  const [passType, setPassType]=useState("password");
  const [result, setResult]=useState("");

  const logLabel=useRef();
  const pasLabel=useRef();

  const activeInput=(ref)=>{
    setResult("");
    ref.current.classList.remove(er.auntError);
    ref.current.classList.add(sl.active);
  }
  const deactiveInput=(ref)=>{
    ref.current.classList.remove(sl.active);
  }
  const changePasVisible=(value)=>{
    value ? setPassType("text") : setPassType("password")
  }
  //проверяем данные
  const checkUser=()=>{
    if(!login || !password){
      if(!login) logLabel.current.classList.add(er.auntError);
      if(!password) pasLabel.current.classList.add(er.auntError);
      return
    }
    setUser(getLoginForm(login, password, setResult))
  }

  //устанавливаем нового пользователя
  const setUser=(user)=>{
    if(!user) return;
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');
    if(remember){
      localStorage.setItem('session',JSON.stringify(user));
    }else{
      sessionStorage.setItem('session',JSON.stringify(user));
    }
    setCurrentUser(user);
    closeWindow(false);
    window.location.reload();
  }
  return(
    <div className={sl.formContainer}>
          <div className={sl.formLabel}>
            <span className={sl.titleIcon} style={{backgroundImage: `url(${userImg})`}}/>
            <span className={sl.loginTitle}>Логин</span>
            <div ref={logLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>setLogin(e.target.value)}
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
            <span className={sl.passwordTitle}>Пароль</span>
            <div ref={pasLabel} className={sl.inputArea}>
              <input 
                onChange={(e)=>setPassword(e.target.value)}
                onFocus={()=>activeInput(pasLabel)}
                onBlur={()=>deactiveInput(pasLabel)}
                className={sl.formInput} 
                type={passType} 
                value={password}
                placeholder="Ваш пароль" />    
            </div>
          </div>
          <div className={sl.settings}>
            <div className={sl.checkboxContainer}>
              <input onChange={(e)=>setRemember(e.target.checked)} className={sl.checkbox} type="checkbox" id="remember" name="remember"/>
              <label className={sl.checkboxLabel} htmlFor="remember">Запомнить меня</label>
            </div>
            <div className={sl.showContainer}>
              <input onChange={(e)=>changePasVisible(e.target.checked)} className={sl.checkbox} type="checkbox" id="show" name="show"/>
              <label className={sl.checkboxLabel} htmlFor="show">Показать пароль</label>
            </div>
          </div>

          {/*Показывается или загрузка, или ошибка  */}
          <div className={sl.loading}>
           {result}
          </div>

          <button onClick={()=>checkUser()} className={sl.submitBtn}>Войти</button>

          <div className={sl.help}>
            <p className={sl.forgot}>Забыли пароль?</p>
            <p onClick={()=>changeForm("register")} className={sl.register}>Зарегистрироваться</p>
          </div>
        </div>
  )
}
export default LoginForm;