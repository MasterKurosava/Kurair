import React from "react";
import { useHistory } from "react-router";
import {windowChanging} from "../../../../../utils/windowChange";
import sl from ".././Adresses.module.css";

import checkTime from "../../../../../utils/checkTime.js"

const PointsList=({points})=>{
  const history=useHistory();

  const openOffice=(el)=>{
    localStorage.setItem('currentOffice',JSON.stringify(el));
    windowChanging();
    setTimeout(()=>history.push(`/posts/${el.code}`),1500);
  }

  return(
    <div className={sl.pointsList}>
      {points.map((el,index)=>{
       return <div key={index} className={sl.pointBlock} onClick={()=>openOffice(el)}>
        <div className={sl.adress}>
        {/* Адресс */}
          <span className={sl.code}>{el.code}</span>
          {el.adress}
        </div>
        {/* Метро */}
        <div className={sl.undeground}>
          {el.undeground
          ? el.undeground.map(el=>{return <span key={el} className={sl.undegroundName}>{el}</span>})
          : <span></span>
          }
        </div>
        {/* Часы работы */}
        <div className={sl.workDays}>
          <span className={sl.weekdays}>Пн-Пт {el.weekdaysTime.min}-{el.weekdaysTime.max}</span>
          <span className={sl.weekends}>Сб-Вс {el.weekendsTime.min}-{el.weekendsTime.max}</span>
        </div>
        {/* Статус */}
        <div className={sl.status}>
          {checkTime(el.weekdaysTime.min, el.weekdaysTime.max, el.weekendsTime.min, el.weekendsTime.max)}
        </div>
      </div>        
      })}
    </div>
  )
}

export default PointsList;