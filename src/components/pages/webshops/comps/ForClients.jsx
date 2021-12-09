import React from "react";
import { Link, useHistory } from "react-router-dom";
import { setPage } from "../../../../utils/windowChange";
import sl from "../Webshops.module.css";

const reqIntegration=require.context('./images',true,/\.int\.(png|jpg)$/);
const allIntegration=reqIntegration.keys();

const reqAtivity=require.context('./images',true,/\.act\.(png|jpg)$/);
const allAtivity=reqAtivity.keys();

const ForClients=()=>{
  const history=useHistory()
  return(
    <div className={sl.conveniences}>
      <h4>Удобно для вас и ваших клиентов</h4>
      <div className={sl.forContainer}>
        <div className={sl.forYou}>
          <h4>Для вас</h4>
          <div className={sl.forYouData}>
            <Link to={'/cabinet'} onClick={(e)=>setPage(e,'cabinet', history)}>
              <div className={sl.forYouBlock}>
                <img src={reqAtivity(allAtivity[0]).default}/>
                Личный кабинет
              </div>
            </Link>
            <div className={sl.intsBlock}>
              <h4>Интеграция с вашим ПО</h4>
              <div className={sl.ints}>
                {allIntegration.map((link, index)=>{
                  return <a key={index} href="#"><img src={reqIntegration(allIntegration[index]).default}/></a>
                })}
                <div className={sl.more}><a href="#">И еще более 10 CMS</a></div>
              </div>
            </div>
          </div>
        </div>

        <div className={sl.forClients}>
          <h4>Для клиентов</h4>
          <div className={sl.acts}>
            <Link to={'/individual/track'} onClick={(e)=>setPage(e,'/individual/track', history)}>
              <div className={sl.activity}>
                <img src={reqAtivity(allAtivity[1]).default}/>
                Отследить заказ
              </div>
            </Link>
            <a href="">
              <div className={sl.activity}>
                <img src={reqAtivity(allAtivity[2]).default}/>
                Мобильное приложение
              </div>
            </a>
            <a href="">
              <div className={sl.activity}>
                <img src={reqAtivity(allAtivity[3]).default}/>
                Уведомление в мессенджер
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForClients;