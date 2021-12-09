import React from "react";
import sl from "./Feedback.module.css";

const Feedback=()=>{
  return(
    <div className={sl.feedbackPage}>
      <div className={sl.title}>
        <h2>Справка</h2>
      </div>
      <div className={sl.info}>
        <h2>Тарифы и документы</h2>
        <a className={sl.contracts} href="#">Типовой договор</a>
        <a className={sl.contracts} href="#">Типовой договор для И-М</a>
        <a className={sl.contracts} href="#">Регламент оказания услуг</a>
        <a className={sl.contracts} href="#">Анкета для заключения договора</a>
      </div>

    </div>
  )
}
export default Feedback;