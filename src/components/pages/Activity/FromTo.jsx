import React, {useRef, useState } from "react";
import refresh from "../../../images/refresh.png";
import CityInput from "../_repeatComps/CityInput";
import BtnSubmit from "../../UI/btnSubmit/BtnSubmit";

import sl from "./Activity.module.css";
import er from "../../../styles/errors.module.css";
import { useHistory } from "react-router";
import {windowChanging} from "../../../utils/windowChange";
import { useDispatch } from "react-redux";

const FromTo = ({action, link}) =>{
  const dispatch=useDispatch();
  const history=useHistory();
  const [fromInput, setFrom]=useState('');
  const [toInput, setTo]=useState('');
  const fromLabelRef=useRef();
  const toLabelRef=useRef();

  const replaceInput=()=>{
    let temp=fromInput;
    setFrom(toInput);
    setTo(temp);
  }
  
  const getForm=()=>{
    const from=fromInput.trim();
    const to=toInput.trim();
    if(from && to){
      dispatch({type:"SET_FROMTO", payload:{from:from, to:toInput}})
      windowChanging();
      setTimeout(()=>history.push(link),1500);
    }else{
      if(!from){
        fromLabelRef.current.classList.add(er.InputError);
      }
      if(!to){
        toLabelRef.current.classList.add(er.InputError);
      }
    }
  }

  return(
    <div className={sl.container}>
      <div className={sl.from}>
        <CityInput
          ref={fromLabelRef}
          change={setFrom}
          placeholder={"Откуда"}
          value={fromInput}
        />
        <ul className={sl.popularSity}>
          <li onClick={(e)=>setFrom(e.target.textContent)}>Алматы</li>
          <li onClick={(e)=>setFrom(e.target.textContent)}>Москва</li>
          <li onClick={(e)=>setFrom(e.target.textContent)}>Санкт-Петербург</li>
          <li onClick={(e)=>setFrom(e.target.textContent)}>Новосибирск</li>
        </ul>
      </div>

      <div className={sl.replace} onClick={()=>replaceInput()}>
        <img src={refresh} alt="поменять" />
      </div>

      <div className={sl.to}>
      <CityInput
          ref={toLabelRef}
          change={setTo}
          placeholder={"Куда"}
          value={toInput}
        />
        <ul className={sl.popularSity}>
          <li onClick={(e)=>setTo(e.target.textContent)}>Алматы</li>
          <li onClick={(e)=>setTo(e.target.textContent)}>Москва</li>
          <li onClick={(e)=>setTo(e.target.textContent)}>Санкт-Петербург</li>
          <li onClick={(e)=>setTo(e.target.textContent)}>Новосибирск</li>
        </ul>
      </div>
      <BtnSubmit 
        click={getForm} 
        value={action}
      />
    </div>
  )
}
export default FromTo;