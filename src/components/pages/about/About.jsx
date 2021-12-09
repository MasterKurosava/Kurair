import sl from "./About.module.css";

import React from "react";

import Statistic from "../juridical/сomps/Statistisc";
import Choise from "./comps/Choise";
import Client from "./comps/Client";

import aboutPoster from "../../../images/aboutPoster.png";
import ASlider from "../../UI/aSlider/aSlider"
import { Link,useHistory } from "react-router-dom";
import { setPage } from "../../../utils/windowChange";

const About =()=>{
  const history=useHistory();
  return(
    <div className={sl.aboutPage}>
      <div className={sl.preView}>
        <video autoPlay="autoplay" poster={aboutPoster} muted loop ></video>
      </div>
      <div className={sl.informationContainer}>
        <div className={sl.intering}>
          <h4>Введение</h4>
          CDEK узнают на всех континентах земного шара.
          Мы – сплоченная команда единомышленников, которые работают с удовольствием и интересом.
          Опыт CDEK перенимают те, кто хочет создать успешный бизнес в сфере логистики.<br/>
          Цель нашей работы – доверие и счастливые улыбки клиентов.
          Мы опережаем рынок, постоянно открывая новые возможности для жизни и бизнеса.
        </div>
        
        <div className={sl.mission}>
          <h4>Миссия</h4>
          Мы оказываем людям и компаниям спектр услуг своевременной и гарантированной доставки, 
          постоянно повышая уровень сервиса, внедряя новые технологии, эффективно используя 
          внутренний потенциал и внешние ресурсы.
        </div>

        <div className={sl.values}>
          <h4>Ценности</h4>
          <div className={sl.valuesData}>
            <div className={sl.valuesItem}>
              <strong>За посылкой – человек.</strong> В каждом отправлении судьба, история, значимое 
              событие для компании, человека и его близких. Именно это определяет все наши действия.
            </div>
            <div className={sl.valuesItem}>
              <strong>Держим слово.</strong> Чтобы держать своё слово, мы готовы делать больше, находить 
              нестандартные решения для клиентов коллег и партнеров.
            </div>
            <div className={sl.valuesItem}>
              <strong>СДЭК – это МЫ.</strong>  Мы любим свою работу и делаем ее хорошо. Мы помогаем и 
              поддерживаем друг друга. От каждого из нас зависит результат.
            </div>
            <div className={sl.valuesItem}>
              <strong>Открытость.</strong>  Мы открыто делимся нашими достижениями и честно говорим об 
              ошибках. Мы искренны с нашими клиентами и коллегами.
            </div>
            <div className={sl.valuesItem}>
              <strong>Становимся лучше. </strong> Каждый день мы получаем новые знания, находим новые 
              идеи, возможности и решения. Внедряем их в жизнь.
            </div>
          </div>
        </div>
        <Statistic/>
      </div>

      <ASlider></ASlider>

      <div className={sl.informationContainer}>
        <div className={sl.advantages}>
          <h4>Преимущества работы с нами</h4>
          <div className={sl.advantageItem}>
            <span className={sl.siteNum}>1</span>
            <span className={sl.advantageTitle}>Цены</span>
            Постоянно улучшаем тарифы и внедряем новые: быстрее, дешевле, с доставкой курьером или в пункт выдачи заказов.
          </div>
          <div className={sl.advantageItem}>
            <span className={sl.siteNum}>2</span>
            <span className={sl.advantageTitle}>Сеть офисов</span>
            Более 2900 уникальных пунктов выдачи в 21 стране. С примерочной и детским уголком: ребенку не будет скучно, пока вы проверяете покупки.
          </div>
          <div className={sl.advantageItem}>
            <span className={sl.siteNum}>3</span>
            <span className={sl.advantageTitle}>Информирование</span>
            Мы всегда на связи, если нужна помощь с оформлением заявки, вызовом курьера или отслеживанием груза. Позвоните по телефону горячей линии или напишите в официальных аккаунтах в социальных сетях.
          </div>
          <div className={sl.advantageItem}>
            <span className={sl.siteNum}>4</span>
            <span className={sl.advantageTitle}>Оплата</span>
            Принимаем оплату удобным способом: картой и наличными, на сайте и в пунктах выдачи, до получения посылки и после.
          </div>
          <div className={sl.advantageItem}>
            <span className={sl.siteNum}>5</span>
            <span className={sl.advantageTitle}>Сервисы</span>
            Специальные услуги для всех клиентов: бесплатная интеграция для интернет-магазинов, личный кабинет для бизнеса, простой возврат и наложенный платеж для частных лиц.
          </div>
        </div>
        <div className={sl.ending}>
          Мы — надежный партнер: <strong>отправляем посылки бережно</strong>, помогаем <strong>увеличить прибыль</strong> бизнеса или <strong>открыть собственный</strong> по франшизе.
        </div>
        <div className={sl.actions}>
          <Link to={'/individual/services'} onClick={(e)=>setPage(e,'/individual/services', history)}>
            <div className={sl.actionItem}>
              <div className={sl.svgBlock}><Choise/></div>
              <span>Подобрать услугу</span>
              Выберете подходящую услугу
            </div>
          </Link>
          <Link to={'/contract'} onClick={(e)=>setPage(e,'/contract', history)}>
            <div className={sl.actionItem}>
              <div className={sl.svgBlock}><Client/></div>
              <span>Стать клиентом</span>
              Заключить договор
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About;