import React from "react";
import Loading from "../components/UI/Loading";

import slReg from "../components/UI/authentication/Authentication.module.css";
import er from "../styles/errors.module.css";
import { getUsersData } from "./usersWork";

const checkFreeParam=(value,param)=>{
  let free=true;
  const users=getUsersData();
  users.forEach(user => {
    if(user[param]==value){
      free=false;
      return 
    }
  });
  return free;
}

const getLoginForm=(login, password, setResult)=>{
  let result;
  setResult(<Loading/>)
  const users=getUsersData();
  users.forEach(user => {
    if(user.login==login && user.password==password){
      setResult("");
      result = user;
      return;
    }
  });
  
  return result || setResult(<span className={slReg.notFound}>Неправильный логин или пароль</span>)
}

const checkRegister=(login, password, repeat, email, logLabel, pasLabel, repeatLabel, mailLabel,)=>{
  login=login.trim()
  password=password.trim();
  repeat=repeat.trim();
  email=email.trim();
  logLabel=logLabel;
  pasLabel=pasLabel;
  repeatLabel=repeatLabel;
  mailLabel=mailLabel;

  let error=false;
  //удаляем прошлые ошибки
  [logLabel, pasLabel, repeatLabel, mailLabel].forEach(label=>{
    for(let error in er){
      label.current.classList.remove(er[error]);
    }
  })
  //начинаем проверять
  if(!login || !password || !repeat || !email){
    if(!login) logLabel.current.classList.add(er.auntError);
    if(!password) pasLabel.current.classList.add(er.auntError);
    if(!repeat) repeatLabel.current.classList.add(er.auntError);
    if(!email) mailLabel.current.classList.add(er.auntError);
    error=true;
  }else{
    if(!/^(.[a-zA-Z0-9]*)$/.test(login)){//проверяем на валидность
      logLabel.current.classList.add(er.notValidLogin);
      error=true;
    }
    else if(login.length<5 || login.length>20){
      logLabel.current.classList.add(er.notValidLength);
      error=true;
    }else if(!checkFreeParam(login,'login')){//проверяем свободен ли логин
      logLabel.current.classList.add(er.notFree);
      error=true;
    }

    if(password.length<8){//проверяем на длину пароля
      pasLabel.current.classList.add(er.notValidPass)
      error=true;
    }
    else if(password!==repeat){ //проверка на сходства паролей
      pasLabel.current.classList.add(er.notRepeatError);
      repeatLabel.current.classList.add(er.notRepeatError)
      error=true;
    }
    if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)){ //проверка на валидность почты
      mailLabel.current.classList.add(er.notValidMail);
      error=true;
    }else if(!checkFreeParam(email,'email')){ //проверяем свободна ли почта
      mailLabel.current.classList.add(er.notFree);
      error=true;
    }  
  }
  return error;
}


export {getLoginForm,checkRegister};