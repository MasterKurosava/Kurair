import React, { useRef, useState } from "react";
import sl from "../Cabinet.module.css";
import { useHistory } from "react-router";

import userPhoto from "../../../../images/userPhoto.png";
import {getSession} from "../../../../utils/usersWork";
import { changeUser } from "../../../../utils/usersWork";


const Profile=()=>{
  const history=useHistory();
  const data=getSession();
  if(!data){
    history.push("/");
    return ''
  }

  const [adress, setAdress]=useState(data.adress || '');
  const [telephone, setTelephone]=useState(data.telephone || '');
  const [email, setEmail]=useState(data.email)
  const [secondEmail, setSecondEmail]=useState(data.secondEmail || '')
  const [disabled, setDisabled]=useState(true);

  //включаем режим изменения
  const setChangeStyle=()=>{
    document.querySelectorAll(`.${sl.inputArea}`).forEach(el=>{
      el.classList.add(sl.active);
    })
    setDisabled(false);
  }
  //выключаем режим изменения
  const setReadStyle=()=>{
    document.querySelectorAll(`.${sl.inputArea}`).forEach(el=>{
      el.classList.remove(sl.active);
    })
    changeUser({login:data.login, email, secondEmail, adress, telephone});
    setDisabled(true);
  }

  const checkTelephone=(value)=>{
    const normalNum=11;
    if(value.length-1<=normalNum && /^(?:[0-9]{0,11}|\s)$/gm.test(value)){
      setTelephone(value)
    }
  }

  return(
    <div className={sl.profile}>
      <h3 className={sl.title}>Информация профиля</h3>
      <div className={sl.profileContainer}>
        <div className={sl.photo} style={{backgroundImage: `url(${userPhoto})`}}/>
        <div className={sl.infoList}>
          <div className={sl.infoItem}>
            <p className={sl.infoName}>Логин</p>
            <p className={sl.infoDescription}>{data.login}</p>
          </div>
          <div className={sl.infoItem}>
            <p className={sl.infoName}>Адрес</p>
            <input 
              disabled={disabled} 
              value={adress} 
              onChange={(e)=>setAdress(e.target.value)} 
              className={sl.inputArea} 
              type="text"
              maxLength="30"
            />
          </div>
          <div className={sl.infoItem}>
            <p className={sl.infoName}>Телефон</p>
            <input 
              disabled={disabled}
              value={telephone} 
              onChange={(e)=>checkTelephone(e.target.value)} 
              className={sl.inputArea}
              type="number"
            />
          </div>
          <div className={sl.infoItem}>
            <p className={sl.infoName}>Email</p>
            <input 
              disabled={disabled}
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              className={sl.inputArea} 
              type="email"
              maxLength="30"
            />
          </div>
          <div className={sl.infoItem}>
            <p className={sl.infoName}>Email для восстановления пароля</p>
            <input 
              disabled={disabled}
              value={secondEmail} 
              onChange={(e)=>setSecondEmail(e.target.value)} 
              className={sl.inputArea} 
              type="email"
              maxLength="30"
            />
          </div>
        </div>
      </div>

      <div className={sl.profileFooter}>
        {disabled
        ? <button className={sl.changeBtn} onClick={()=>setChangeStyle()}>Редактировать профиль</button>
        : <button className={sl.changeBtn} onClick={()=>setReadStyle()}>Сохранить</button>
        }
        <p className={sl.message}>В данном разделе Вы можете изменить пароль доступа к личному кабинету, email (в том числе, для восстановления пароля), а также, адрес без изменения города.
          <br/>
          <br/>
          <span className={sl.warning}>Обращаем внимание</span>, что изменить номер телефона возможно только через менеджеров и сотрудников компании.(но тут можно)
        </p>
      </div>
    </div>
  )
}

export default Profile;