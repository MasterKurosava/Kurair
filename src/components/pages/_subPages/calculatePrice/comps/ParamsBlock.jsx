import React from "react";
import sl from "../CalculatePrice.module.css";

const ParamsBlock = ({approxList, setApprox, index}) =>{
  
  const setActive=(target, value)=>{ 
    target.parentNode.childNodes.forEach((el)=>{ //удаляем везде активный стиль
      el.classList.remove(sl.active);
    })
    target.classList.add(sl.active); //ставим стиль на 1 блок
    approxList=approxList.map(el=>{ //Устанавливаем выбранный элемент
      if(el.index===index)  return {...el,params: value}
      else return el; 
    })
    setApprox(approxList);
  }
  return(
    <div className={sl.wrapper}>
      <div onClick={(e)=>setActive(e.currentTarget, {w:35,l:25,h:5,wt:2})} className={sl.row}>
        <div className={sl.type}>Конверт</div>
        <div className={sl.size}>35x25x5 см</div>
        <div className={sl.weight}>до 2 кг</div>
        <div className={sl.description}>Маленькие предметы:бижутерия, аксессуары, документы</div>
      </div>

      <div onClick={(e)=>setActive(e.currentTarget, {w:40,l:30,h:20,wt:5})} className={sl.row}>
        <div className={sl.type}>Пакет</div>
        <div className={sl.size}>40х30х20 см</div>
        <div className={sl.weight}>до 5 кг</div>
        <div className={sl.description}>Небольшие отправления: обувь, одежда, мелкая техника</div>
      </div>

      <div onClick={(e)=>setActive(e.currentTarget, {w:60,l:40,h:30,wt:20})} className={sl.row}>
        <div className={sl.type}>Коробка</div>
        <div className={sl.size}>60x40x30 см</div>
        <div className={sl.weight}>до 20 кг</div>
        <div className={sl.description}>Средний размер: набор посуды, домашний текстиль</div>
      </div>

      <div onClick={(e)=>setActive(e.currentTarget, {w:100,l:50,h:50,wt:50})} className={sl.row}>
        <div className={sl.type}>Тележка</div>
        <div className={sl.size}>100х50х50 см</div>
        <div className={sl.weight}>до 50 кг</div>
        <div className={sl.description}>Тяжелая большая посылка: велосипед, крупная кухонная техника</div>
      </div>

      <div onClick={(e)=>setActive(e.currentTarget, {w:120,l:80,h:80,wt:50})} className={sl.row}>
        <div className={sl.type}>Палета</div>
        <div className={sl.size}>120х80х80 см</div>
        <div className={sl.weight}>более 50 кг</div>
        <div className={sl.description}>Крупный груз: крупная бытовая техника, домашняя библиотека</div>
      </div>
    </div>
  )
}

export default ParamsBlock;