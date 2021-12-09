import "../styles/app.css";
import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { setPage } from "../utils/windowChange";
import Callback from "./UI/callback/Callback";

const Footer=()=>{
  const history=useHistory();
  const [callbackVisible, setCallback]=useState(false);

  return(
    <footer>
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_forPeople">
            <h3>Частным лицам</h3>
            <div className="footer_activity">
              <ul className="footer_activiyList">
                <li><Link to={"/individual/track"} onClick={(e)=>setPage(e, "/individual/track", history)}>Отследить заказ</Link></li>
                <li><Link to={"/individual/calculate"} onClick={(e)=>setPage(e, "/individual/calculate", history)}>Расчитать стоимость</Link></li>
                <li><Link to={"/individual/rates"} onClick={(e)=>setPage(e, "/individual/rates", history)}>Тарифы</Link></li>
                <li><Link to={"/individual/services"} onClick={(e)=>setPage(e, "/individual/services", history)}>Сервисы</Link></li>
                <li><Link to={"/individual/feedback"} onClick={(e)=>setPage(e, "/individual/feedback", history)}>Справка</Link></li>
                <li><Link to={"/individual/adresses"} onClick={(e)=>setPage(e, "/individual/adresses", history)}>Адреса офисов</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer_call">
            <input type="text" placeholder="Поиск"></input>
            <h2>Онлайн звонок</h2>
            <h2>8 777 307-84-05</h2>
            <p onClick={()=>setCallback(true)}>Заказать звонок</p>
            <Link to={"/feedback"} onClick={(e)=>setPage(e,'/feedback',history)}>Обратная связь</Link>
          </div>
        </div>
        <div className="footer_bot">
          <p>©2000 — 2021, Курьерская компания СДЭК</p>
          <a href="https://www.e-disclosure.ru/portal/company.aspx?id=38284">Адрес раскрытия информации</a>
          <p>Дизайн сайта <a href="https://www.uprock.ru/">UPROCK</a></p>
        </div>
      </div>
      {callbackVisible
      ? <Callback close={setCallback}/>
      : ''
      }
    </footer>
  )
}

export default Footer;