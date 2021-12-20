import React, { useEffect, useRef, useState } from "react";
import sl from "./TrackOrder.module.css";
import er from "../../../../styles/errors.module.css";

import Cansel from "../../../UI/Cansel";
import SearchSvg from "../../../UI/SearchSvg";
import AppStoreQR from "./svgs/AppStoreQR.svg";
import GogglePlayQR from "./svgs/GogglePlayQR.svg";

import AppStore from "../../../../images/appStore_dark.png";
import GooglePlay from "../../../../images/googlePlay_dark.png";
import { getSession } from "../../../../utils/usersWork";
import { useSelector } from "react-redux";

const TrackOrder = () =>{
  scrollTo(0,0)
  const session=getSession();
  const defaultId=useSelector(state=>state.orderId.id) || '';
  const [orderNum, setOrderNum]=useState(defaultId);
  const orderLabel=useRef();

  const setActivInput=()=>{ 
    orderLabel.current.classList.remove(er.InputError)
    orderLabel.current.classList.remove(er.lessOrderSymbol)
    orderLabel.current.classList.toggle(sl.active)
  }

  const checkLength=(value)=>{
    if( /^[0-9]{0,8}$/.test(value)) { setOrderNum(value) }
  }

  const getForm=()=>{
    if(orderNum.trim().length==8){
      //находим заказ
    }else{
      if(!orderNum) orderLabel.current.classList.add(er.InputError)
      else if(orderNum!=8) orderLabel.current.classList.add(er.lessOrderSymbol)
    }
  }

  return(
    <div className={sl.trackPage}>
      <h2 className={sl.title}>Отследить заказ</h2>
      <div className={sl.container}>

        <div className={sl.inputBlock}>
          <div className={sl.inputData}>
            <div className={sl.inputArea} ref={orderLabel}>
              <SearchSvg/>
              <input 
                value={orderNum} 
                onChange={(e)=>checkLength(e.target.value)} 
                onFocus={(e)=>setActivInput(e)}
                onBlur={(e)=>setActivInput(e)}
                type="number" placeholder="Укажите номер заказа"
                />
              <div className={sl.cancel}>
                {orderNum
                  ? <Cansel close={setOrderNum}/>
                  : <div/>
                }

              </div>
            </div>
            <button className={sl.submitBtn} onClick={()=>getForm()}>Отследить</button>
          </div>
          
          {session
          ? <p className={sl.joke}>Здесь <span className={sl.jokeAccent}>могла бы</span>  быть история ваших отправлений :)</p>
          : <div className={sl.warning}>
              <div className={sl.warnIcon}>!</div>
              <a href="#">Войдите</a>, чтобы видеть историю ваших отправлений
            </div>
          }
        </div>
        
        <div className={sl.phoneTrack}>
          <h4>Отслеживайте посылку у себя в телефоне</h4>
          Просто отсканируйте код и установите приложение
          <div className={sl.qrBlocks}>
            <div className={sl.qrBlock}>
              <img className={sl.qr} src={AppStoreQR}/>
              <a href="#"><img  src={AppStore} className={sl.app}/></a>
            </div>
            <div className={sl.qrBlock}>
              <img className={sl.qr} src={GogglePlayQR}/>
              <a href="#"><img src={GooglePlay} className={sl.app}/></a>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
export default TrackOrder;