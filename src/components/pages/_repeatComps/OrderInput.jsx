import React, { forwardRef } from "react";
import Cansel from "../../UI/Cansel";
import SearchSvg from "../../UI/SearchSvg";
import sl from "./CityInput.module.css";
import er from "../../../styles/errors.module.css";

const OrderInput=forwardRef(({change, placeholder, value},ref)=>{

  const activeZone=()=>{ 
    ref.current.classList.remove(er.InputError);
    ref.current.classList.remove(er.lessOrderSymbol);
    ref.current.classList.add(sl.active) 
  }
  const deactiveZone=()=>{ if(ref.current) ref.current.classList.remove(sl.active)}

  const checkLength=(value)=>{
    if( /^[0-9]{0,8}$/.test(value)) {
      change(value);
    }
  }
  return(
    <div className={sl.orderContent}>
      <div className={sl.inputArea} ref={ref}>
        <button className={sl.search}>
          <SearchSvg/>
        </button>
        <input
          onChange={(e)=>checkLength(e.target.value)}
          onFocus={()=>activeZone()}
          onBlur={()=>deactiveZone()} 
          value={value}
          type="text" 
          placeholder={placeholder}
          />
        <div className={sl.loading}>
          {value
          ?<Cansel close={()=>change('')}/>
          :''
          }
        </div>
      </div>
    </div>
  )
})

export default OrderInput;