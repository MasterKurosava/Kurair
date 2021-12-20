import sl from "./Activity.module.css";
import er from "../../../styles/errors.module.css";
import React, { useMemo, useRef, useState } from "react";
import PrenumberList from "./PrenumbersList";
import BtnSubmit from "../../UI/btnSubmit/BtnSubmit";

const Contract=({action})=>{
  const [name,setName]=useState('');
  const [lastNumber, setLastNumber]=useState('');
  const [preNumInput,setPreNumInput]=useState('+7');
  const [preNumVisible, setNumVisible]=useState(false);

  const nameLabel=useRef();
  const lastNumberLabel=useRef();
  const svgString=useRef();

  const activeZone=(target)=>{ 
    target.classList.remove(er.InputError);
    target.classList.remove(er.lessOrderSymbol)
    target.classList.add(sl.active)
  }
  const deactiveZone=(target)=>{ 
    target.classList.remove(sl.active)
  }
  const unfocus=useMemo(()=>{
    document.addEventListener("click",()=>hidePreNumbers(), {once:true})
  },[preNumVisible])

  const showPreNumbers=()=>{//показать номера
    if(preNumVisible){ setNumVisible(false) }
    else{ setNumVisible(true) }
    svgString.current.classList.toggle(sl.down);
    svgString.current.firstChild.classList.toggle(sl.down);
  }

  const hidePreNumbers=(num)=>{ //закрыть и вставить номер
    if(num) setPreNumInput(num)
    setNumVisible(false);
    svgString.current.classList.remove(sl.down);
    svgString.current.firstChild.classList.remove(sl.down);
  }

  const getForm=()=>{
    const normalNumber=11;
    const currentNumber=preNumInput.length + lastNumber.trim().length - 1;
    if(name.trim() && lastNumber && currentNumber==normalNumber){ //если все ок
      setLastNumber('');
      setName('');
      alert("Заявка принята!");
    }else{
      if(!name.trim()){nameLabel.current.classList.add(er.InputError) }             //если нет имени
      if(!lastNumber){ lastNumberLabel.current.classList.add(er.InputError) } //если нет номера
      else if(currentNumber!=normalNumber){                                   //если номер слишком короткий
        lastNumberLabel.current.classList.add(er.lessOrderSymbol)
      }
    }
  }

  return(
    <div className={sl.container}>
      <div className={sl.contractArea}>
        <div className={sl.inputArea} ref={nameLabel}>
          <input 
            className={sl.name}
            onChange={(e)=>setName(e.target.value)}
            onFocus={()=>activeZone(nameLabel.current)} 
            onBlur={()=>deactiveZone(nameLabel.current)} 
            type="text" 
            placeholder="Имя"
            value={name}
          />
        </div>
        <div className={sl.preNumberBlock}  onClick={(e)=>{e.stopPropagation(); showPreNumbers()}}>
          <input 
            className={sl.preNumberInput}
            onChange={(e)=>setPreNumInput(e.target.value)}
            disabled
            type="text" 
            value={preNumInput}
          />
          <svg ref={svgString} width="13" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M8 15L1 8L8 1" stroke="#ADAFB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          {preNumVisible ? <PrenumberList close={hidePreNumbers}/>  : ''}
        </div>

        <div className={sl.inputArea} ref={lastNumberLabel}>
          <input 
            className={sl.telephone}
            onChange={(e)=>setLastNumber(e.target.value)}
            onFocus={()=>activeZone(lastNumberLabel.current)} 
            onBlur={()=>deactiveZone(lastNumberLabel.current)} 
            type="number" 
            placeholder="Телефон"
            value={lastNumber}
          />
        </div>
      </div>
      <BtnSubmit
        click={getForm}
        value={action}
      />
    </div>
  )
}

export default Contract;