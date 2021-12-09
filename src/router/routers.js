import Individual from "../components/pages/individuals/Individual";
import Juridical from "../components/pages/juridical/Juridical";
import Webshops from "../components/pages/webshops/Webshops";
import About from "../components/pages/about/About";
import Contract from "../components/pages/contract/Contract";

import TrackOrder from "../components/pages/_subPages/trackOrder/TrackOrder";
import CalculatePrice from "../components/pages/_subPages/calculatePrice/CalculatePrice";
import Rates from "../components/pages/_subPages/rates/Rates";
import Services from "../components/pages/_subPages/services/Services";
import Feedback from "../components/pages/_subPages/feedback/Feedback";
import Adresses from "../components/pages/_subPages/adresses/Adresses";
import Price from "../components/pages/_subPages/calculatePrice/price/Price";
import Cabinet from "../components/pages/cabinet/Cabinet";
import Error from "../components/pages/error/Error";
import FeedbackBot from "../components/pages/_subPages/feedbackBot/FeedbackBot";

const pages={
  mainPages:[
    {name:'ЧАСТНЫМ ЛИЦАМ', path:'/', component:Individual},
    {name:'ЮРИДИЧЕСКИМ ЛИЦАМ', path:'/juridical', component:Juridical},
    {name:'ИНТЕРНЕТ-МАГАЗИНАМ', path:'/webshops', component:Webshops},
    {name:'О КОМПАНИИ', path:'/about', component:About },
    // {name:'ФРАНЧАЙЗИНГ', path:'/franchising', component:Franchising, exact:false},]
    {name:'ЗАКЛЮЧИТЬ ДОГОВОР', path:'/contract', component:Contract},
  ],

  subPages:[
    {name:'Отследить заказ', path:'/individual/track', component: TrackOrder},
    {name:'Рассчитать стоимость', path:'/individual/calculate', component:CalculatePrice},
    {name:'Тарифы', path:'/individual/rates', component:Rates},
    // {name:'Посылочка', path:'/individual/posilochka', component:Posilochka, exact:true},
    {name:'Сервисы', path:'/individual/services', component:Services},
    {name:'Справка', path:'/individual/feedback', component:Feedback},
    {name:'Адреса офисов', path:'/individual/adresses', component:Adresses},
  ],
  additionally:[
    {path:'/price', component: Price},
    {path:'/cabinet', component: Cabinet},
    {path:'/feedback', component: FeedbackBot},
    {path:'/404', component:Error},
  ]
}


export default pages;
