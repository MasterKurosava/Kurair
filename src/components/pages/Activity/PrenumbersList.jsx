import sl from "./Activity.module.css";
import React from "react";

//1. Собираем все файлы, подходящие по регулярному выражению. 2.Находим пути к файлам
const reqFlags = require.context('./flags',true,/\.svg$/);
const allFlags=reqFlags.keys();

const flags=[
  {flag: reqFlags(allFlags[3]).default, num:"+7"},//rus
  {flag: reqFlags(allFlags[2]).default, num:"+7"},//kz
  {flag: reqFlags(allFlags[0]).default, num:"+375"},//belorus
  {flag: reqFlags(allFlags[4]).default, num:"+380"},//ukraine
  {flag: reqFlags(allFlags[1]).default, num:"+49"},//deutch
]

const PrenumberList=React.forwardRef(({close},ref)=>{
  return(
    <div ref={ref} className={sl.prenumberList} onClick={(e)=>e.stopPropagation()}>
      <ul>
        {flags.map((el,index)=>{
          return <li key={index} onClick={()=>close(el.num)}><img src={el.flag} />{el.num}</li>
        })}
      </ul>
    </div>
  )
})

export default PrenumberList;