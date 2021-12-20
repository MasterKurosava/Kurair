import React, {useEffect, useRef, useState } from "react";
import sl from "./Callback.module.css";
import er from "../../../styles/errors.module.css";

import Cansel from "../Cansel";
import PrenumberList from "../../pages/Activity/PrenumbersList";


import string from "../../../images/string.png";
import ThemeList from "./ThemeList";
import checkCallback from "../../../utils/сheckCallback";

const Callback=({close})=>{
  const [name, setName]=useState('');
  const [preNumber, setPreNumber]=useState('+7');
  const [number, setNumber]=useState('');
  const [theme, setTheme]=useState('');
  const [contract, setContract]=useState('');
  const [comment, setComment]=useState('');
  const [policy, setPolicy]=useState(false);

  const [preNumberVisable, setNumberVisible]=useState(false);
  const [themeVisable, setThemeVisible]=useState(false);

  const background=useRef();

  const nameLabel=useRef();
  const preNumLabel=useRef();
  const numberLabel=useRef();
  const themeLabel=useRef();
  const contractLabel=useRef();
  const commentLabel=useRef();
  const policyLabel=useRef();

  const svgString=useRef();

  useEffect(()=>{
    document.addEventListener('click',(e)=>{
      if(e.target==background.current) close(false);
    },{once:true})
  },[]);


  const activeArea=(ref)=>{
    for(let style in er){
      ref.current.classList.remove(er[style]);
    }
    ref.current.classList.add(sl.active);
  }
  const deactiveArea=(ref)=>{
    ref.current.classList.remove(sl.active);
  }
  //показать номера
  const showPreNumbers=()=>{
    if(preNumberVisable){ hidePreNumbers() }
    else{ 
     setNumberVisible(true);
     svgString.current.classList.add(sl.active);
     document.addEventListener("click",()=>hidePreNumbers(), {once:true})
    }
  }
  //закрыть и вставить номер
  const hidePreNumbers=(num)=>{
    if(num) setPreNumber(num);
    setNumberVisible(false);
    svgString.current.classList.remove(sl.active);
  }

  //показываем темы
  const showThemeList=()=>{
    if(themeVisable){ hideThemeList() }
    else{ 
      setThemeVisible(true);
      activeArea(themeLabel)
      themeLabel.current.classList.add(sl.active);
      document.addEventListener("click",()=>hideThemeList(), {once:true})
    }
  }
  //скрываем темы
  const hideThemeList=(theme)=>{
    if(theme){ setTheme(theme) }
    themeLabel.current.classList.remove(sl.active);
    setThemeVisible(false);
  }
  //форма
  const getForm=()=>{
    const error=checkCallback(name, preNumber, number, theme, policy, nameLabel, preNumLabel, numberLabel, themeLabel, policyLabel);
    if(!error){
      alert("Форма принята!");
      close(false);
    }
  }

  return(
    <div className={sl.background} ref={background}>
      <div className={sl.container}>
        <div className={sl.header}>
          <h3 className={sl.title}>Оставьте запрос</h3>
          <Cansel close={close} className={sl.closeWindow}/>
        </div>
        <div className={sl.formMenu}>
          <div className={sl.fromItem}>
            <label>Ваше имя</label>
            <div ref={nameLabel} className={sl.inputArea}>
              <input  
                className={sl.formInput} 
                placeholder="Введите Ваше имя, например, Иван Иванович" 
                onFocus={()=>activeArea(nameLabel)} 
                onBlur={()=>deactiveArea(nameLabel)}
                onChange={(e)=>setName(e.target.value)} 
                value={name}
              />
              {name ?  <Cansel className={sl.closeInput} close={setName}/> : ''}
            </div>
          </div>
          
          <div className={sl.telephoneForm}>
            <label>Телефон</label>
            <div className={sl.inputArea_preTel}>
              <div ref={preNumLabel} className={sl.preNumberBlock} onClick={(e)=>{e.stopPropagation(); showPreNumbers(true)}}>
                <input 
                  className={sl.preNumberInput}
                  disabled
                  onChange={(e)=>setPreNumber(e.target.value)}
                  value={preNumber}
                />
                <svg ref={svgString} width="13" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path  d="M8 15L1 8L8 1" stroke="#ADAFB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                {preNumberVisable
                ? <PrenumberList close={hidePreNumbers} /> 
                : ''
                }
              </div>

              <div ref={numberLabel} className={sl.inputArea_tel}>
                <input 
                  className={sl.telephoneInput} 
                  placeholder="Телефон"
                  onFocus={()=>activeArea(numberLabel)} 
                  onBlur={()=>deactiveArea(numberLabel)}
                  onChange={(e)=>setNumber(e.target.value)} 
                  value={number}
                  text="number"
                />
                {number ?  <Cansel className={sl.closeInput} close={setNumber}/> : ''}
              </div>
            </div>
          </div>

          <div className={sl.fromItem}>
            <label>Тема запроса</label>
            <div ref={themeLabel} className={sl.inputArea_them} onClick={(e)=>{e.stopPropagation(); showThemeList()}}>
              <input 
                disabled 
                value={theme} 
                className={sl.formInput} 
                placeholder="Выберите из списка"
              />
              <div className={sl.themeString}>
                <img src={string}/>
              </div>
              {themeVisable ? <ThemeList close={hideThemeList}/> : ''}
            </div>
          </div>

          <div className={sl.fromItem}>
            <label>Номер договора</label>
            <div ref={contractLabel} className={sl.inputArea}>
              <input 
                onFocus={()=>activeArea(contractLabel)} 
                onBlur={()=>deactiveArea(contractLabel)}
                onChange={(e)=>setContract(e.target.value)} 
                value={contract} 
                className={sl.formInput}
                placeholder="Выберите номер"
                type="number"
              />
              {contract ?  <Cansel className={sl.closeInput} close={setContract}/> : ''}
            </div>
          </div>

          <div className={sl.fromItem}>
            <label>Комментарий</label>
            <div ref={commentLabel} className={sl.inputArea_check}>
              <textarea 
                onFocus={()=>activeArea(commentLabel)} 
                onBlur={()=>deactiveArea(commentLabel)}
                onChange={(e)=>setComment(e.target.value)} 
                value={comment} 
                className={sl.comment} 
                placeholder="Введите текст"
              />
            </div>
          </div>
        </div>

      <div className={sl.checkBlock} ref={policyLabel} >
        <input 
          id="policy" 
          onClick={()=>activeArea(policyLabel)}
          onClick={(e)=>setPolicy(e.target.checked)}  
          className={sl.checkbox} 
          type="checkbox"
        />
        <label className={sl.checkLabel} htmlFor="policy"></label>
        <p className={sl.warning}>Отправляя сообщение, я подтверждаю, что ознакомлен и согласен с <a href="#">политикой конфиденциальности</a> данного сайта.</p>
      </div>

      <button onClick={()=>getForm()} className={sl.submit}>Отправить</button>
      </div>
    </div>
  )
}

export default Callback;