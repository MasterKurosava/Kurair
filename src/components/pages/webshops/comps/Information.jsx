import sl from "../Webshops.module.css";
import React from "react";

const reqImg= require.context('./images',true,/\.comp\.(png|jpg)$/);
const allImgs= reqImg.keys(); 

const Information = () =>{
  return(
    <div className={sl.information}>
      <div className={sl.text}>
        <h4>Почему интернет-магазины выбирают СДЭК?</h4>
        <strong>Выкупаемость</strong> до 95% заказов.<br/>
        <strong>Доставка по России от 125 рублей и 2 дней.</strong> Лично в руки получателю или в пункт выдачи.<br/>
        <strong>Собственная уникальная сеть офисов:</strong>  более 1700 по России. В каждом есть примерочная и стол для осмотра посылки.<br/>
        <strong>Возможность возврата:</strong>  полного или частичного.<br/>
        <strong>Прием платежей любым способом:</strong>  онлайн, картой, наличными, после получения заказа.<br/>
        <strong>Бесплатная интеграция.</strong>  Установите виджет на сайте: он сразу рассчитает стоимость доставки, покажет ближайшие к клиенту офисы СДЭК, примет заявку на выезд курьера.<br/>
        <strong>Поддержка 24/7.</strong>  Отслеживание посылок онлайн и в приложении, горячая линия, информирование удобным способом: робозвонок, смс, уведомления в мессенджерах.<br/>
      </div>
      <div className={sl.companies}>
        <div className={sl.imgs}>
          {allImgs.map((link,index)=>{
             return <div key={index} className={sl.imgBlock}><img src={reqImg(allImgs[index]).default}></img></div>
          })}
        </div>
        и еще 30 000 интернет-магазинов
      </div>
    </div>
  )
}

export default Information;