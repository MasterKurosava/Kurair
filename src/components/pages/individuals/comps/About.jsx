import React from "react";
import { Link, useHistory } from "react-router-dom";
import { setPage } from "../../../../utils/windowChange";
import sl from "../Individual.module.css";

const About=()=>{
  const history=useHistory();
  return(
    <div className={sl.about}>
      <div className={sl.aboutContainer}>
        <div className={sl.aboutInfo}>
          <div className={sl.stat}>
            <div className={sl.statText}>
              <div>2 000</div>
              <span>год основания компании</span>
            </div>
            <div className={sl.statText}>
              <div>6 000+</div>
              <span>курьеров</span>
            </div>
            <div className={sl.statText}>
              <div>36 000</div>
              <span>населенных пунктов</span>
            </div>
            <div className={sl.statText}>
              <div>200 000+</div>
              <span>отправлений в день</span>
            </div>
          </div>
          <p className={sl.aboutText}>Мы оказываем людям и компаниям спектр услуг своевременной и гарантированной доставки,
            постоянно повышая уровень сервиса, внедряя новые технологии, эффективно используя внутренний
            потенциал и внешние ресурсы.
          </p>
          <Link className={sl.more} to={'/about'} onClick={(e)=>setPage(e, '/about', history)}>Узнать больше</Link>
        </div>
      </div>
    </div>
  )
}
export default About;