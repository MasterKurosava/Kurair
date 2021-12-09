import "../styles/app.css";
import React, {useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import pages from "../router/routers";
import UserCity from "./UI/userCity/UserCity";
import Authentication from "./UI/authentication/Authentication";

import { getSession, Userlogout } from "../utils/usersWork";

import userImg from "../images/user.png";
import { setPage } from "../utils/windowChange";

const Header=()=>{
  const history=useHistory();
  const session=getSession();
  
  const mainPages=pages.mainPages;
  const subPagesGroup=pages.subPages;

  const [citySelectVisable, setCityVisable]=useState(false);
  const [auntification, setAutification]=useState(false);
  const [location, setLocation]=useState('Алматы');
  const [currentUser, setCurrentUser]=useState(session);

  const mainLabel=useRef();
  const subLabel=useRef();

  //выходим из аккаунта
  const logOut=()=>{
    Userlogout();
    setCurrentUser(null);
  }

  //Делаем активным
  const setActive=(target)=>{
    mainLabel.current.childNodes.forEach(el => {
      el.classList.remove("active")
    });
    subLabel.current.childNodes.forEach(el => {
      el.classList.remove("active")
    });
    target.classList.add("active")
  }

  return(
    <header>
      <div className="header_top">
        <div className="header_containerTop">
          <div className="header_location">
            <svg data-v-2caee680="" strokeWidth="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="header_icon-geolocation">
              <path d="M7.81818 9.37209L1 8.15116L16 1L8.67045 16L7.81818 9.37209Z" stroke="#A5A5A5" strokeWidth="1.5" strokeLinejoin="round"></path>
            </svg>
            <p className="header_city" onClick={()=>setCityVisable(true)}>{location}</p>
          </div>
          <ul className="header_offers" ref={mainLabel}>
            {mainPages.map(el=>{
              return <li key={el.name} onClick={(e)=>setActive(e.currentTarget)}>
                <Link 
                to={el.path} 
                onClick={(e)=>setPage(e, el.path,history)}
                > {el.name} </Link>
                </li>
            })}
          </ul>
        </div>
      </div>
      
      <div className="header_activityLine"> 
        <div className="header_containerBot">
          <div className="header_logo">
            <Link to='/' onClick={(e)=>setPage(e,'/',history)}><img src="https://cdek.kz/_nuxt/img/4a14227.svg" alt="logo"/></Link>
          </div>
          <ul className="header_activity"  ref={subLabel}>
              {subPagesGroup.map(el=>{
                return <li key={el.name} onClick={(e)=>setActive(e.currentTarget)}>
                  <Link 
                    to={el.path}
                    onClick={(e)=>setPage(e, el.path, history)}
                   > {el.name} </Link>
                </li>
              })}
            </ul>
            {currentUser
            ?<div className={"header_userBlock"}>
                <Link className="header_cabinet" to={"/cabinet"} onClick={(e)=>setPage(e,"/cabinet", history)}>
                  <img className="header_photo" src={userImg}/>
                  <span className="header_name">{currentUser.login}</span>
                </Link>
                <button className="header_quit" onClick={()=>logOut()}>Выйти</button>
              </div>
            :<button onClick={()=>setAutification(true)} className="header_login">Войти</button>
            }
        </div>
      </div>
      
      {citySelectVisable
      ? <UserCity closeWindow={setCityVisable} changeCity={setLocation}/> 
      : ''
      }

      {auntification
      ? <Authentication setCurrentUser={setCurrentUser} close={setAutification}/>
      : ''
      }
    </header>
  )
}

export default Header;