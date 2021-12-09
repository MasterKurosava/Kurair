import sl from "../Juridical.module.css";
import fourPages from "../../../../images/fourPages.png";
import React from "react";



const Comfort = () =>{
  return(
    <div className={sl.comfort}>
      <div className={sl.comfortHeader}>
        <h2>Удобно для вас и получателя</h2>
        <p>Будьте всегда в курсе о статусе доставки благодаря нашим сервисам:</p>
      </div>
      <div className={sl.comfortImgs}>
        <img src={fourPages}/>
      </div>
    </div>
  )
}

export default Comfort;