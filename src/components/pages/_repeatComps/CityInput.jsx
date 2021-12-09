import React, { useEffect, useMemo, useRef, useState } from "react";
import Cansel from "../../UI/Cansel";
import Loading from "../../UI/Loading";
import SearchSvg from "../../UI/SearchSvg";
import citiesJSON from "../../../data/cities.json";
import useDebounce from "../../../utils/debounce";

import sl from "./CityInput.module.css";
import er from "../../../styles/errors.module.css";

const cities=citiesJSON.cities;

const CityInput=React.forwardRef(({change, placeholder, value},ref)=>{
  const [inputStatus, setStatus]=useState('');
  const [listVisible, setListVisible]=useState(false);
  const list=useRef();

  useDebounce(value,showList, 700);

  const activeZone=()=>{ 
    ref.current.classList.add(sl.active) ;
    ref.current.classList.remove(er.InputError) ;
  }
  const deactiveZone=()=>{ 
    if(ref.current) ref.current.classList.remove(sl.active);
  }

  function showList(){
    if(value){    //если поле не пустое
      setStatus(<Cansel close={()=>change('')} className={sl.cansel}/>)
      if(!sortedCities.indexOf(value)==0 && sortedCities.length){
        setListVisible(true)
      }
    }
  }
  //вешаем обработчик на закрытие списка
  const hideList=useMemo(()=>{
    if(listVisible){
      document.addEventListener('click',()=>{
        setListVisible(false);
        deactiveZone();
      },{once:true});
    }
  },[listVisible])

  //фильтруем
   const sortedCities=useMemo(()=>{
    return cities.filter(city=>city.includes(value));
  },[value]);

  //меняем значение
  useEffect(()=>{
    if(value) activeZone();
    setListVisible(false);//убираем список
    if(sortedCities.indexOf(value)==0) return;
    if(value===''){ setStatus('') }
    else if(value) setStatus(<Loading/>) 
  }, [value]);

  return(
    <div className={sl.cityContent}>
      <div className={sl.inputArea} ref={ref} onClick={(e)=>e.stopPropagation()}>
        <button className={sl.search}>
          <SearchSvg/>
        </button>
        <input
          onChange={(e)=>change(e.target.value)}
          onFocus={()=>activeZone()}
          onBlur={()=>deactiveZone()} 
          value={value}
          type="text" 
          placeholder={placeholder}
          />
        <div className={sl.loading}>
          {inputStatus}
        </div>
      </div>

      {listVisible
        ?<div className={sl.cities} ref={list}>
          <ul className={sl.cities_list}>
            {sortedCities.map((city,index)=>{
            return <li 
            key={index} 
            onClick={(e)=>change(e.target.textContent)} 
            className={sl.cities_item}>{city}</li>
          })}
          </ul>
        </div>
        :<div/>
      }
    </div>
  )
})

export default CityInput;