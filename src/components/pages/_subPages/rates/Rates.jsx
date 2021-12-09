import classNames from "classnames";
import React, { useEffect, useState } from "react";
import allRates from "../../../../data/rates.json";
import sl from "./Rates.module.css";

const Rates = () =>{
  const [rates, setRates]=useState([]);
  const [sortedRates, sortRates]=useState([]);

  useEffect(()=>{
    setRates(allRates.rates);
    sortRates(allRates.rates);
  },[])
  
  const setFilter=(param,e)=>{
    setActive(e);
    if(param==="all") sortRates(rates);
    else sortRates(rates.filter(el=>el.filter[param]))
  }

  const setActive=(e)=>{
    const target=e.currentTarget;
    target.parentNode.childNodes.forEach(el=>{
      el.classList.remove(sl.active);
    });
    target.classList.add(sl.active);
  }
  return(
    <div className={sl.ratesPage}>
      <h2>Тарифы для частных лиц</h2>
      <p className={sl.pre}>Сроки доставки даны в рабочих днях</p>
      <div className={sl.rates}>
        <div className={sl.ratesFiltres}>
          <div onClick={(e)=>setFilter("all",e)} className={[sl.setting, sl.active].join(' ')}><p>Все тарифы</p></div>
          <div onClick={(e)=>setFilter("inCountry",e)} className={sl.setting}><p>По Казахстану</p></div>
          <div onClick={(e)=>setFilter("fastDevelery",e)} className={sl.setting}><p>Быстрая доставка</p></div>
          <div onClick={(e)=>setFilter("hightWeight",e)} className={sl.setting}><p>Тяжелый груз</p></div>
          <div onClick={(e)=>setFilter("outContry",e)} className={sl.setting}><p>За рубеж</p></div>
        </div>
      </div>
      <div className={sl.ratesList}>
        {sortedRates.map((rate,index)=>{
          return <div  key={index} className={sl.rateRow}>
            <div className={[sl.rate, classNames({"Rates-module_top_Zv":rate.top},{"Rates-module_fast_Nr":rate.fast})].join(' ')}>
              <div className={sl.rateName}>
                <span>{rate.name}</span>
                {rate.description}
              </div>
              <div className={sl.rateWeight}>{rate.maxWeight}</div>
              <div className={sl.rateTime}>{rate.minTime}</div>
              <div className={sl.rateCountry}>{rate.cities}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Rates;