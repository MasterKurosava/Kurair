import React from "react";
import sl from "./Services.module.css";
import ServicesForm from "../../_repeatComps/ServicesForm";
import FromTo from "../../Activity/FromTo";
import FindOrder from "../../Activity/FindOrder";
import Contract from "../../Activity/Contract";


const Services =({activityForms})=>{
  if(!activityForms){
    activityForms=[
      {name:"Рассчитать стоимость", form:<FromTo action={"Рассчитать стоимость"} link="/individual/calculate"/>},
      {name:"Вызвать курьера", form:<FromTo action={"Вызвать курьера"} link="/individual/calculate"/>},
      {name:"Отследить заказ", form:<FindOrder action={"Отследить"} link="/individual/track"/>},
      {name:"Заключить договор", form:<Contract action={"Отправить"}/>},
    ];
  }
  return(
    <div className={sl.servicesPage}>
      <h1 className={sl.title}>Сервисы</h1>
      <div className={sl.servicesContainer}>
        <ServicesForm
          activityForms={activityForms}
        />
      </div>
    </div>
  )
}
export default Services;