import React, { useEffect, useMemo, useRef, useState } from "react";
import sl from "./UserCity.module.css";
import er from "../../../styles/errors.module.css";

import CityInput from "../../pages/_repeatComps/CityInput";
import Cansel from "../Cansel";

import countryJSON from "../../../data/selectCity.json";

const countryList=countryJSON.country;

const UserCity=({closeWindow, changeCity})=>{
  const [location, setLocation]=useState('');
  const [currentCountry, setCountry]=useState('Россия');
  const [listVisable, setVisable]=useState(false);
  const locationLabel=useRef();
  const unFocusPart=useRef();

  //при выборе закрываем список
  useEffect(()=>{
    setVisable(false);
  },[currentCountry])
  //Прячем список стран
  const hideList=useMemo(()=>{
    if(listVisable){
      document.addEventListener('click',()=>{setVisable(false)},{once:true})
    }
  },[listVisable])

  //делаем расфокус при клике на свободную часть
  const unFocus=(e)=>{
    if(e.target == unFocusPart.current){
      closeWindow(false)
    }
  }
  //проверяем локацию и ставим новую
  const getLocation=()=>{
    if(location){
      const city=location.split(',')[0];
      changeCity(city);
      closeWindow(false);
    }else{
      locationLabel.current.classList.add(er.InputError)
    }
  }
  return(
    <div ref={unFocusPart} className={sl.userCity} onClick={(e)=>unFocus(e)}>
      <div className={sl.conteiner}>
        <div className={sl.headerTitle}>
          <h3>Выбор региона</h3>
          <Cansel close={()=>closeWindow(false)}/>
        </div>
        <div className={sl.cityForm}>
          <div className={sl.country} onClick={(e)=>e.stopPropagation()}> 
            <p className={sl.countryLabel}> Выберите страну:</p>
            <div className={sl.inputArea} onClick={()=>listVisable ? setVisable(false) : setVisable(true)}>
              <input value={currentCountry} className={sl.countryInput} disabled />
              <svg width="13" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M8 15L1 8L8 1" stroke="#ADAFB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              {listVisable
              ?<div className={sl.coutryDrop}>
                <ul className={sl.countryList}>
                  {countryList.map((el,index)=>{
                    return <li key={index} onClick={(e)=>setCountry(e.target.textContent)} className={sl.coutryItem}>{el.name}</li>
                  })}
                </ul>
              </div>
              :''
              }
            </div>
          </div>

          <div className={sl.popular}>
            <p>Популярные города:</p>
            <ul className={sl.cityList}>
              {countryList.map(el=>{
                if(el.name==currentCountry){
                  return el.popularCity.map((city,index)=>{
                    return <li key={index} 
                      onClick={(e)=>setLocation(e.target.textContent)} 
                      className={sl.cityItem}>{city}
                    </li>
                  })
                }
              })}

            </ul>
          </div>

          <div className={sl.selectCity}>
            <p className={sl.countryLabel}>Или укажите в поле:</p>
            <CityInput
              ref={locationLabel}
              value={location}
              change={setLocation}
              placeholder={''}
            />
          </div>
        </div>
        <button onClick={()=>getLocation()} className={sl.submitBtn}>Подтвердить</button>
      </div>
    </div>
  )
}

export default UserCity;