import React from "react";
import sl from "./Webshops.module.css";

import View from "../_repeatComps/View";
import FromTo from "../Activity/FromTo";
import Contract from "../Activity/Contract";
import Information from "./comps/Information";
import ForClients from "./comps/ForClients";

const Webshops=()=>{
  const activityForms=[
    {name:"Рассчитать стоимость", form:<FromTo action={"Рассчитать стоимость"} link={"/individual/calculate"}/>},
    {name:"Заключить договор", form:<Contract action={"Отправить"}/>},
  ];
  return(
    <div className={sl.webshopsPage}>
      <View
        videoLink="https://cdek.kz/storage/source/components/Cover/1/UEZeFtwpOGi_iZBcQjU955PtGUejyJPB.mp4"
        headText="Каждый третий интернет-магазин в Казахстане выбирает СДЭК"
        activityForms={activityForms}
      />
      <Information/>
      <ForClients/>
    </div>
  )
}

export default Webshops;