import React from "react";
import sl from "./FeedbackBot.module.css";

import viber from "./comps/appSvg/viber.svg";
import telegram from "./comps/appSvg/telegram.svg";
import vk from "./comps/appSvg/vk.svg";
import apple from "./comps/appSvg/apple.svg";
import watsapp from "./comps/appSvg/watsapp.svg";

const Apps= () =>{
  return(
    <div className={sl.appsBlock}>
      <h3 className={sl.appsTitle}>Продолжите говорить в любимом канале</h3>
      Вы можете общаться в любимом канале на любом устройстве, будь то ноутбук, планшет или мобильный телефон.
      <div className={sl.apps}>
        <ul className={sl.appsList}>
          <li className={sl.appItem}>
            <img src={viber} className={sl.appImg}/> Viber
          </li>
          <li className={sl.appItem}>
            <img src={telegram} className={sl.appImg}/> Telegram
          </li>
          <li className={sl.appItem}>
            <img src={vk} className={sl.appImg}/> VK
          </li>
          <li className={sl.appItem}>
            <img src={apple} className={sl.appImg}/> AppleMessages
          </li>
          <li className={sl.appItem}>
            <img src={watsapp} className={sl.appImg}/> WhatsApp
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Apps;