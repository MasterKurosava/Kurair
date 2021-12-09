import sl from "../Juridical.module.css";
import logistic from "../../../../images/logistic.png";
import React from "react";
import { Link,useHistory } from "react-router-dom";
import { setPage } from "../../../../utils/windowChange";

const Buisnes = () =>{
  const history=useHistory();
  return(
    <div className={sl.buisnes}>
      <div className={sl.buisnesImgs}>
        <img src={logistic}/>
      </div>
      <div className={sl.buisnesBody}>
        <h2>Работаем с бизнесом любого размера</h2>
        <p>Индивидуальный предприниматель или международная корпорация: 
        широкий спектр и высокое качество услуг доставки доступно всем.
        </p>
        <br/> 
        <Link to={'/contract'} onClick={(e)=>setPage(e,'/contract', history)}>
        Заключить договор
        </Link>
      </div>

    </div>
  )
}

export default Buisnes;