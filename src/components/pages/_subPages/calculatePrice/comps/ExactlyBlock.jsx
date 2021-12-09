import React from "react";
import sl from "../CalculatePrice.module.css";

const ExactlyBlock = ({exactlyList, setExactly, index, currentParams}) =>{
  (exactlyList);
  const setActivInput=(e)=>{
    (e.target).parentNode.classList.toggle(sl.active);
  }
  const changeProps= async (value, param)=>{
    exactlyList= await exactlyList.map(el=>{
      if(el.index===index){
        return {...el, params:{...el.params, [param]:value}}
      }else{
        return el;
      }
    })
    setExactly(exactlyList);
  }
  
  return(
    <div className={sl.calcSection}>
      <div className={sl.inputBlock}>
        <div className={sl.select}>
          <p className={sl.settingTittle}>Вес, килограммы</p>
          <div className={sl.inputArea}>
            <input 
            type="number" 
            placeholder="Введите вес посылки, кг"
            value={currentParams.weight}
            onFocus={(e)=>setActivInput(e)}
            onBlur={(e)=>setActivInput(e)}
            onChange={(e)=>changeProps(e.target.value, "wt")}
            />
          </div>
        </div>
        <div className={sl.select}>
          <p className={sl.settingTittle}>Габариты, сантиметры</p>
          <div className={sl.inputSize}>
            <input
              type="number" 
              placeholder="Длина"
              value={currentParams.length}
              onFocus={(e)=>setActivInput(e)}
              onBlur={(e)=>setActivInput(e)}
              onChange={(e)=>changeProps(e.target.value, "l")}
            />
          </div>
          <div className={sl.inputSize}>
            <input 
              type="number" 
              placeholder="Ширина"
              value={currentParams.width}
              onFocus={(e)=>setActivInput(e)}
              onBlur={(e)=>setActivInput(e)}
              onChange={(e)=>changeProps(e.target.value, "w")}
            />
          </div>
          <div className={sl.inputSize}>
            <input 
              type="number" 
              placeholder="Высота"
              value={currentParams.height}
              onFocus={(e)=>setActivInput(e)}
              onBlur={(e)=>setActivInput(e)}
              onChange={(e)=>changeProps(e.target.value, "h")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExactlyBlock;