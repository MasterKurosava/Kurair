import React from "react";
import sl from "../Individual.module.css";
import offices from "../../../../images/offices.jpg"
import {setPage} from "../../../../utils/windowChange"
import { Link, useHistory } from "react-router-dom";

const Offices=()=>{
  const history=useHistory();
  return(
    <div className={sl.offices}>
      <div style={{background:`url(${offices})`}} className={sl.officesBlock}>
        <div className={sl.inTown}>
          <p>В вашем городе <span>29</span> офисов</p>
          <Link 
            to={'/individual/adresses'} 
            onClick={(e)=>setPage(e, '/individual/adresses', history)} 
            className={sl.button}
          >Посмотреть все</Link>
        </div>
      </div>
    </div>
  )
}
export default Offices;