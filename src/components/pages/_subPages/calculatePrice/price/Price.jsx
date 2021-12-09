import React, { useEffect, useMemo, useState } from "react";
import sl from "./Price.module.css";

import ratesJSON from "../../../../../data/rates.json";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {windowChanging} from "../../../../../utils/windowChange";
import { Link } from "react-router-dom";

const Price=()=>{
  const history=useHistory();
  const store=useSelector(store=>store.priceParams);
  const [rates,setRates]=useState([]);
  const [filter, setFilter]=useState('');
  
  useEffect(()=>{
    const rates=ratesJSON.rates;
    setRates(rates);
  },[]);

  //если информации нет, то идем обратно
  useEffect(()=>{
    scrollTo(0,0)
    if(!store.from || !store.to || store.orders.length==0){
      history.goBack(); 
    }
  },[store])

  //филтруем тарифы
  const filteredRates=useMemo(()=>{
    if(!filter) return rates;
    return rates.filter(el=>{
      if(el.fromTo.indexOf(filter)>=0){
        return el;
      }
    })
  },[filter, rates]);
  
  //добавляем стили выбранному
  const setActive=(target)=>{ 
    target.parentNode.childNodes.forEach((el)=>{ //удаляем везде активный стиль
      el.classList.remove(sl.active);
    })
    target.classList.add(sl.active); //ставим стиль на 1 блок
  }
  //кнопка Изменить
  const returnToChange=(e)=>{
    e.preventDefault();
    windowChanging();
    setTimeout(()=>{ history.goBack('/individual/calculate')},1500);
  }
  return(
    <div className={sl.PricePage}>
      <div className={sl.titleBlock}>
        <h2 className={sl.headerTitle}>Расчёт стоимости доставки</h2>
      </div>
      <p className={sl.describtion}>Сроки доставки даются в рабочих днях без учета дня
       приема отправления. Вызов курьера доступен после расчета при выборе тарифа от двери
      </p>
      <div className={sl.orders}>
        <div className={sl.points}>
          <strong>
            {store.from.split(',')[0]} - {store.to.split(',')[0]}
          </strong>
        </div>
        <div className={sl.packages}>
          {store.orders.map((el,index)=>{
            return <div key={index} className={sl.packageItem}>
            <span className={sl.property}><strong>Вес:</strong> {el.params.wt}кг</span> 
            <span className={sl.property}><strong>Габариты:</strong> {el.params.w}x{el.params.l}x{el.params.h}см</span>
          </div>
          })}
        </div>
        <div className={sl.rightItem}>
          <Link className={sl.change} to={'/individual/calculate'} onClick={(e)=> returnToChange(e)}>Изменить</Link>
        </div>
      </div>

      <div className={[sl.delivery, sl.priceSection].join(' ')}>
        <h3 className={sl.title}>Доставка</h3>
        <hr/>
        <div className={sl.deliveryContainer}>
          <div className={sl.leftBlock}>
            Варианты
          </div>
          <div className={sl.variants}>
            <ul className={sl.variantsList}>
              <li className={sl.variant}>
                <input className={sl.variantInput} onClick={()=>setFilter('От двери до двери')} type="radio" id="DD" name="variant"/>
                <label className={sl.variantLabel} htmlFor="DD">От двери до двери</label>
              </li>
              <li className={sl.variant}>
                <input className={sl.variantInput} onClick={()=>setFilter('От пункта СДЭК до двери')} type="radio" id="PD" name="variant"/>
                <label className={sl.variantLabel} htmlFor="PD">От пункта СДЭК до двери</label>
              </li>
              <li className={sl.variant}>
                <input className={sl.variantInput} onClick={()=>setFilter('От двери до пункта СДЭК')} 
                type="radio" id="DP" name="variant"/>
                <label className={sl.variantLabel} htmlFor="DP">От двери до пункта СДЭК</label>
              </li>
              <li className={sl.variant}>
                <input className={sl.variantInput} onClick={()=>setFilter('От пункта СДЭК до пункта СДЭК')} type="radio" id="PP" name="variant"/>
                <label className={sl.variantLabel} htmlFor="PP">От пункта СДЭК до пункта СДЭК</label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={[sl.types, sl.priceSection].join(' ')}>
        <h3 className={sl.title}>Услуга доставки</h3>
        <hr/>
        <div className={sl.typesTable}>
          {filteredRates.map((el,index)=>{
            return <div key={index} className={sl.typesRow} onClick={(e)=>setActive(e.currentTarget)}>
            <div className={sl.name}>{el.name} </div>
            <div className={sl.type}>{filter}</div>
            <div className={sl.time}>{el.minTime}</div>
            <div className={sl.price}>2000р.</div>
          </div>
          })}
        </div>
      </div>
      <div className={sl.warning}>
        Стоимость услуг и товаров указанных на сайте в том числе в разделе 
        калькулятор являются примерными. Точная стоимость услуг определяется 
        применительно к конкретному отправлению в момент оформления заказа
      </div>
      <div className={sl.submitBtn}>Далее</div>
    </div>
  )
}

export default Price;