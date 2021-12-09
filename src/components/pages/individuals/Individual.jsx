import sl from "./Individual.module.css";

import React from "react";
import Slider from "../../UI/slider/Slider";
import About from "./comps/About";
import Offices from "./comps/Offices";
import View from "../_repeatComps/View";
import News from "./comps/News";

import FromTo from "../Activity/FromTo";
import FindOrder from "../Activity/FindOrder";

import appStore from "../../../images/appstore.png";
import googlePlay from "../../../images/google_play.png";


const Individual=()=>{
  const activityForms=[
    {name:"Рассчитать стоимость", form:<FromTo action={"Рассчитать стоимость"} link="/individual/calculate"/>},
    {name:"Вызвать курьера", form:<FromTo action={"Вызвать курьера"} link="/individual/calculate"/>},
    {name:"Отследить заказ", form:<FindOrder action={"Отследить"} link="/individual/track"/>},
  ];
  
  return(
    <div className={sl.page}>
      <View
        videoLink="https://cdek.kz/storage/source/components/Cover/1/FD77iddakQpf3RUrpiLBARfhJs6sDqji.mp4"
        headText="Доставим быстро, бережно, экономно по всему миру!"
        activityForms={activityForms}
      />
      <Slider/>
      <About/>
      <Offices/>
      <div className={sl.mobApp}>
        <span>Мобильное приложение</span>
        <p>Рассчитайте стоимость, проверьте статус заказа и узнайте адрес ближайшего пункта выдачи СДЭК. 
           Установите бесплатное приложение на ваш смартфон  и ниже будут значки app store и google.
           <br/>
           Или перейдите по ссылке
        </p>
        <div className={sl.mobIcon}>
          <a href="#"><img src={appStore} alt="App Store"></img></a>
          <a href="#"><img src={googlePlay} alt="Google Play"></img></a>
        </div>
      </div>
      <News/>
    </div>
  ) 
}

export default Individual;