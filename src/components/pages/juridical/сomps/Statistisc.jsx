import sl from "../Juridical.module.css";

import React from "react";
import statMap from "../../../../images/statMap.png";

const Statistic = () =>{
  return(
    <div className={sl.statistic}>
      <h4>Цифры</h4>
      <div className={sl.statContainer}>
        <div className={sl.numbers}>
          <div>2000<span>год основания компании</span></div>
          <div>1000000<span>активных пользователей</span></div>
          <div>6000<span>курьеров</span></div>
          <div>150000<span>отправлений в день</span></div>
          <div>25<span>стран</span></div>
          <div>36000<span>населенных пунктов по России</span></div>
        </div>
        <div className={sl.statImg}>
          <img src={statMap}/>
        </div>
      </div>
    </div>
  )
}

export default Statistic;