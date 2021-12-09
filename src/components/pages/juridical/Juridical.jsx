import sl from "./Juridical.module.css";
import React from "react";

import View from "../_repeatComps/View";
import FromTo from "../Activity/FromTo";
import FindOrder from "../Activity/FindOrder";
import Contract from "../Activity/Contract";

import Statistic from "./сomps/Statistisc";
import Comfort from "./сomps/Comfort";
import Buisnes from "./сomps/Buisnes";

const Juridical =()=>{
  const activityForms=[
    {name:"Рассчитать стоимость", form:<FromTo action={"Рассчитать стоимость"} link="/individual/calculate"/>},
    {name:"Вызвать курьера", form:<FromTo action={"Вызвать курьера"}  link="/individual/calculate"/>},
    {name:"Отследить заказ", form:<FindOrder action={"Отследить"} link="/individual/track"/>},
    {name:"Заключить договор", form:<Contract action={"Оставить заявку"}/>},
  ];
  return(
    <div className={sl.franchisingPage}>
      <View
        videoLink="https://cdek.kz/storage/source/components/Cover/1/bKvQiKj6wKvypvAHZ-EPdhXkgLEJuSew.mp4"
        headText="Доставка документов и грузов по городу, России и миру"
        activityForms={activityForms}
      />
      <Statistic/>
      <Comfort/>
      <Buisnes/>
    </div>
  )
}

export default Juridical;