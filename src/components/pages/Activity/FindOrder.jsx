import sl from "./Activity.module.css";
import er from "../../../styles/errors.module.css";
import React, { useRef, useState } from "react";
import OrderInput from '../_repeatComps/OrderInput'
import BtnSubmit from "../../UI/btnSubmit/BtnSubmit";
import { setPage } from "../../../utils/windowChange";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const FindOrder=({action,link})=>{
  const history=useHistory()
  const dispatch=useDispatch();
  const [orderNum, setOrder]=useState('');
  const numLabel=useRef('');

  const getId=()=>{
    if(orderNum.length==8){
      dispatch({type:"SET_ORDER_ID", payload:orderNum});
      setPage('',link, history)
    }else if(!orderNum){
      numLabel.current.classList.add(er.InputError)
    }else{
      numLabel.current.classList.add(er.lessOrderSymbol)
    }
  }

  return(
    <div className={sl.container}>
      <div className={sl.from}>
        <OrderInput
          ref={numLabel}
          change={setOrder}
          placeholder={"Номер заказза"}
          value={orderNum}
        />
      </div>
      <BtnSubmit
        click={getId}
        value={action}
      />
    </div>
  )
}

export default FindOrder;