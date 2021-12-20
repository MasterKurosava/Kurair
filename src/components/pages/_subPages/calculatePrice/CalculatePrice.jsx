import React, { useRef, useState } from "react";
import sl from "./CalculatePrice.module.css";
import er from "../../../../styles/errors.module.css";

import ParamsBlock from "./comps/ParamsBlock";
import ExactlyBlock from "./comps/ExactlyBlock";
import CityInput from "../../_repeatComps/CityInput";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {windowChanging} from "../../../../utils/windowChange";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const CalculatePrice = () =>{
  const dispatch=useDispatch()
  const data=useSelector(state=>state.fromTo);
  const history=useHistory();

  const currencyList = useRef();
  const currencyBlock= useRef();
  const fromLable=useRef();
  const toLable=useRef();
  const submitBtn=useRef();

  const [cityFrom, setCityFrom]=useState(data.from); //откуда
  const [cityTo, setCityTo]=useState(data.to); //куда
  const [currency, setCurrency]=useState('Рубли'); //валюта
  const [approxList, setApproxList]=useState(null); //список примерных настроек
  const [exactlyList, setExactlyList]=useState(null); //список точных настроек

  const [errors, setErrors]=useState('');


  const addFirstApprox=()=>{
    setExactlyList(null);
    if(!approxList){
      setApproxList([{index:0, params:{} }]);
    }
  }
  const addFirstExactly=()=>{
    setApproxList(null);
    if(!exactlyList){
      setExactlyList([{index:0, params:{w:0, h:0, l:0, wt:0} }])
    }
  }
  //Добавляем в список параметров 
  const addInList=()=>{
    approxList
    ? setApproxList([...approxList, {index:approxList[approxList.length-1].index+1, params:{} }])
    : setExactlyList([...exactlyList, {index:exactlyList[exactlyList.length-1].index+1, params:{w:0, h:0, l:0, wt:0} }])
  }
  //Удаляем из списка параметров 
  const removeListItem = (index)=>{
    approxList
    ? setApproxList(approxList.filter(el=>el.index!==index))
    : setExactlyList(exactlyList.filter(el=>el.index!==index))
  }
  //показываем выпадающий список валют
  const showList=()=>{
    currencyBlock.current.classList.toggle(sl.active);
    currencyList.current.classList.toggle(sl.active);
    document.addEventListener('click',()=>hideList(),{once:true});
  }
  //скрываем выпадающий список валют
  const hideList=(e)=>{
    if(e) setCurrency(e.target.textContent);
    currencyBlock.current.classList.remove(sl.active);
    currencyList.current.classList.remove(sl.active);
  }

  //Проверяем введенные параметры
  const checkFilledList=()=>{
    setErrors(false);
    if(approxList){ //если у нас примерные параметры
      approxList.forEach(el => {
        if(!el.params.wt || !el.params.w || !el.params.l || !el.params.h){
          return("Выберите все параметры или удалите лишние");
        }
      });
    }else if(exactlyList){//если у нас точные параметры
      exactlyList.forEach(el => {
        if(!el.params.wt || !el.params.w || !el.params.l || !el.params.h){
          return("Заполните все параметры!");
        }
      });
    }else return("Вы не выбрали параметры!"); //если у нас нет параметров
  }

  //проверяем форму
  const getForm=async (e)=>{
    e.preventDefault();
    const errors= checkFilledList(); //проверяем на ошибки
    setErrors(errors);
    if(cityFrom && cityTo && !errors){//если есть основые пункты
      const result={
        from:cityFrom, 
        to:cityTo, 
        orders: approxList || exactlyList
      }
      dispatch({type:"SET_OFFICE_PARAMS",payload:result}) //передаем в хранилище
      windowChanging();
      setTimeout(()=>history.push("/price"),1500);
    }else{//если нет основных пунктов
      if(!cityFrom){
        fromLable.current.classList.add(er.InputError);
        setErrors("Введите места доставки!");
      }
      if(!cityTo){
        toLable.current.classList.add(er.InputError);
        setErrors("Введите места доставки!");
      }
    }
  }
  return(
    <div className={sl.calculatePage}>
      <h2>Рассчитать стоимость доставки</h2>
      <p>Сроки доставки даются в рабочих днях без учета дня приема отправления. Вызов курьера доступен после расчета при выборе тарифа от двери</p>

      <div className={[sl.route, sl.calcSection].join(' ')}>
        <h3>Маршрут</h3>
        <hr/>
        <div className={sl.inputBlock}>
          <div className={sl.select}>
            <p className={sl.settingTittle}>Откуда забираем</p>
            <CityInput 
              change={setCityFrom}
              value={cityFrom}
              placeholder="Введите город"
              ref={fromLable}
            />
          </div>
          <div className={sl.select}>
            <p className={sl.settingTittle}>Куда доставляем</p>
            <CityInput 
                change={setCityTo}
                value={cityTo}
                placeholder="Введите город"
                ref={toLable}
              />
          </div>
        </div>
      </div>

      <div className={[sl.currency, sl.calcSection].join(' ')}>
        <h3>Валюта расчета</h3>
        <hr/>
        <div className={sl.select}>
          <p className={sl.settingTittle}>Валюта расчета</p>
          <div ref={currencyBlock} onClick={(e)=>e.stopPropagation()} className={sl.selectCurrency}>
            <div onClick={()=>showList()} className={sl.selectArea}>
              <input  disabled  type="text"  value={currency} />
              <svg className={sl.down} width="13" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M8 15L1 8L8 1" stroke="#ADAFB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <div onClick={(e)=>e.stopPropagation()} ref={currencyList} className={sl.currencyData}>
                <ul>
                  <li onClick={(e)=>hideList(e)}>Рубли</li>
                  <li onClick={(e)=>hideList(e)}>Доллары</li>
                  <li onClick={(e)=>hideList(e)}>Евро</li>
                  <li onClick={(e)=>hideList(e)}>Тенге</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={[sl.paramsOrder, sl.calcSection].join(' ')}>
        <h3>Вес и размер посылки</h3>
        <hr/>
        <div className={sl.setAccuracy}>
          <p className={sl.settingTittle}>Параметры</p>
          <div className={sl.settings}>
            <input 
              onClick={()=>addFirstApprox()} 
              type="radio" 
              id="ap" 
              name="settings" 
              value="approximately"/>
            <label htmlFor="ap">примерно</label>

            <input 
              onClick={()=>addFirstExactly()} 
              type="radio" 
              id="ex" 
              name="settings" 
              value="exactly"/>
            <label htmlFor="ex">точно</label>
          </div>
        </div>
      </div>
      <div className={sl.settingList}>

        {approxList
          ? <div className={sl.choiseSetting}>
              {approxList.map((el,index)=>{
                return <div key={el.index} className={sl.settingItem}>
                        {approxList.length>1
                          ?<div className={sl.removeBlock}>
                            Место {index+1} <a onClick={()=>removeListItem(el.index)}>Удалить</a>
                           </div>
                          :""
                        }
                        <ParamsBlock index={el.index} approxList={approxList} setApprox={setApproxList}/>
                      </div>
              })}
              <div className={sl.addMore}>
                <button onClick={()=>addInList()}>+ Добавить еще одну посылку</button>
              </div>
            </div>
          : ""
        }

        {exactlyList
          ? <div className={sl.choiseSetting}>
              {exactlyList.map((el,index)=>{
                return <div key={index} className={sl.settingItem}>
                        {exactlyList.length>1
                          ?<div className={sl.removeBlock}>
                            Место {index+1} <a onClick={()=>removeListItem(el.index)}>Удалить</a>
                           </div>
                          :""
                        }
                        <ExactlyBlock 
                        index={el.index} 
                        exactlyList={exactlyList} 
                        setExactly={setExactlyList}
                        currentParams={el}
                        />
                      </div>
              })}
              <div className={sl.addMore}>
                <button onClick={()=>addInList()}>+ Добавить еще одну посылку</button>
              </div>
            </div>
          : ""
        }
        
      </div>
      <Link  to={"/price"} onClick={(e)=>getForm(e)}  className={sl.calculateBtn}>
        <button ref={submitBtn}>Рассчитать</button>
      </Link>

      {errors
        ?<div className={sl.errorMsg}>{errors}</div>
        :""
      }

    </div>
  )
}

export default CalculatePrice;