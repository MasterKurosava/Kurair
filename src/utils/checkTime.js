import React from "react";
import sl from "../components/pages/_subPages/adresses/Adresses.module.css";

const checkTime=(weekdaysMin, weekdaysMax, weekendsMin, weekendsMax)=>{
  const date=new Date();
  const hours=date.getHours();
  const minutes=date.getMinutes();
  let result;
  if(date.getDay()==0 || date.getDay()==6){//если выходные
    const min= +weekendsMin.split(':')[0];
    const max= +weekendsMax.split(':')[0];
    const minMinute= +weekendsMin.split(':')[1] || 60;
    const maxMinute= +weekendsMax.split(':')[1] || 60 ;
    if(hours>=min && hours<max){//если все ок
      if(max-hours>2){
        result=<span className={sl.open}>Открыто</span>
      }
      else{
        result=<span className={sl.closing}>Закроется через {max-hours-1 ? max-hours-1 + "ч. " : ""}{Math.abs(maxMinute-minutes)}мин.</span>
      }
    }else{//если не ок
      if(hours>=max){
        result=<span className={sl.close}>Закрыт до завтра</span>
      }else{
        result=<span className={sl.opening}>Откроется через {min-hours-1 ? min-hours-1 + "ч. " : ""} {Math.abs(minMinute-minutes)}мин.</span>
      }
    }
  }else{
    const min= +weekdaysMin.split(':')[0];
    const max= +weekdaysMax.split(':')[0];
    const minMinute= +weekdaysMin.split(':')[1] || 60;
    const maxMinute= +weekdaysMax.split(':')[1] || 60 ;
    if(hours>=min && hours<max){//если все ок
      if(max-hours>2){
        result=<span className={sl.open}>Открыто</span>
      }
      else{
        result=<span className={sl.closing}>Закроется через {max-hours-1 ? max-hours-1 + "ч. " : ""}{Math.abs(maxMinute-minutes)}мин.</span>
      }
    }else{//если не ок
      if(hours>=max){
        result=<span className={sl.close}>Закрыт до завтра</span>
      }else{
        result=<span className={sl.opening}>Откроется через {min-hours-1 ? min-hours-1 + "ч. " : ""} {Math.abs(minMinute-minutes)}мин.</span>
      }
    }
  }
  return result;
}

export default checkTime;