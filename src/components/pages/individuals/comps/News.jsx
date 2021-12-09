import React from "react";
import sl from "../Individual.module.css";

const News=()=>{
  return(
    <div className={sl.news}>
      <div className={sl.newsHeader}>
        <span>Новости</span>
        <a href="#">Все новости</a>
      </div>

      <div className={sl.newsContainer}>
        <a href="#">
          <div className={sl.newsItem}>
              <div className={sl.newName}>
                <p>Открытие офиса г.Алматы</p>
                <span>18 октября 2021</span>
              </div>
          </div>
        </a>

        <a href="#">
          <div className={sl.newsItem}>
              <div className={sl.newName}>
                <p>Открытие офиса г.Алматы</p>
                <span>18 октября 2021</span>
              </div>
          </div>
        </a>

        <a href="#">
          <div className={sl.newsItem}>
              <div className={sl.newName}>
                <p>Открытие офиса г.Алматы</p>
                <span>18 октября 2021</span>
              </div>
          </div>
        </a>


      </div>
    </div>
  )
}

export default News