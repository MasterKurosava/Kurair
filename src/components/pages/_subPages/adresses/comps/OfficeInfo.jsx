import React from "react";
import sl from "./OfficeInfo.module.css";
import wayIcon from "./way.svg";
import YandexMap from "./Map/YandexMap";
import OfficeSlider from "../../../../UI/officeSlider/OfficeSlider";

const OfficeInfo=()=>{
  const office= JSON.parse(localStorage.getItem('currentOffice'));
  return(
    <div className={sl.officeData}>
      <div className={sl.textInfo}>
        <h1>Пункт {office.code}</h1>

        <div className={sl.classific}>
          <ul className={sl.classificList}>
            <li className={sl.classificItem}>Приём отправлений</li>
            {office.classific.map((el,index)=>{
              return  <li key={index} className={[sl.classificItem, sl.added].join(' ')}>{el}</li>
            })}
          </ul>
        </div>

        <div className={[sl.adress, sl.infoBlock].join(' ')}>
          <strong>Как добраться</strong>
          {office.adress}
        </div>

        <div className={[sl.busStops, sl.infoBlock].join(' ')}>
          <h3 className={sl.stopsTitle}>Ближайшие остановки</h3>
          {office.undeground
            ? <ul className={sl.undegroundList}>
              {office.undeground.map((el,index)=>{
                return <li key={index} className={sl.undeground}>{el}</li>
              })}
            </ul>
            :<div/>
          }
          {office.busStops.map((el,index)=>{
            return <div key={index}>{el} <br/><br/></div>
          })}
          <div className={sl.way}>
            <img src={wayIcon}/>
            <a className={sl.buildWay}>Построить маршрут</a>
          </div>
        </div>

        <div className={[sl.work, sl.infoBlock].join(' ')}>
          <strong>Режим работы</strong>
          <p>Пн-Пт {office.weekdaysTime.min}-{office.weekdaysTime.max}</p>
          <p>Сб-Вс {office.weekendsTime.min}-{office.weekendsTime.max}</p>
          <span className={sl.close}>Откроется через 9 ч. 45 мин</span>
        </div>

        <div className={[sl.payment, sl.infoBlock].join(' ')}>
          <strong>Способы оплаты</strong>
          {office.money.map((el,index)=>{
            if(el=="cash"){
              return  <div key={index} className={sl.payVariant}>
                <div className={sl.icon} style={{backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSIgZmlsbD0iIzMzMyI+PHBhdGggZD0iTTE4Ljk1IDQuNTE4di4wMjhsLjAyNC4wMTVjLjYxLjM2MSAxLjAzMiAxLjAxIDEuMDMyIDEuNzcydjYuMzM0YzAgLjc2MS0uNDIyIDEuNDEtMS4wMzIgMS43NzJsLS4wMjQuMDE1djIuNDM1YTIuMDY3IDIuMDY3IDAgMDEtMi4wNjEgMi4wNjFIMi4xMWEyLjA2IDIuMDYgMCAwMS0yLjA2LTIuMDYxVjIuMTFBMi4wNiAyLjA2IDAgMDEyLjExMS4wNUgxNi44OWMxLjEzMyAwIDIuMDYxLjkyOCAyLjA2MSAyLjA2MXYyLjQwN3ptLS45NTYgMS44MTV2LS4wNWgtNy40ODh2Ni40MzRoNy40ODhWNi4zMzN6TTIuMDYxIDE2Ljg5di4wNUgxNi45NHYtMi4yMTFoLTYuMzgzYTIuMDY3IDIuMDY3IDAgMDEtMi4wNjItMi4wNjFWNi4zMzNjMC0xLjEzMy45MjgtMi4wNiAyLjA2Mi0yLjA2aDYuMzgzVjIuMDZIMi4wNnYxNC44M3oiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuMSIvPjxwYXRoIGQ9Ik0xMy43MjIgMTEuMDgzYTEuNTgzIDEuNTgzIDAgMTAwLTMuMTY2IDEuNTgzIDEuNTgzIDAgMDAwIDMuMTY2eiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDIwLjA1NnYxOUgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==)"}}/>
                Наличные
              </div>
            }else if(el=="bank"){
              return<div key={index} className={sl.payVariant}>
                <div className={sl.icon} style={{backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iLjgiIHk9Ii44IiB3aWR0aD0iMTkuMjU5IiBoZWlnaHQ9IjEzLjc3IiByeD0iMS43IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMS42Ii8+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTAgNC4zOTFoMTkuNzYxdjIuMTk2SDB6Ii8+PHJlY3QgeD0iMTMuMTc0IiB5PSI5Ljg4MSIgd2lkdGg9IjQuMzkxIiBoZWlnaHQ9IjIuMTk2IiByeD0iMSIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjEzLjE3NCIgeT0iOS44ODEiIHdpZHRoPSI0LjM5MSIgaGVpZ2h0PSIyLjE5NiIgcng9IjEiIHN0cm9rZT0iI2ZmZiIvPjwvc3ZnPg==)"}}/>
                Банковской картой
              </div>
            }else{
              return <div key={index} className={sl.payVariant}>
                <div className={sl.icon} style={{backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iLjgiIHk9Ii44IiB3aWR0aD0iMTkuMjU5IiBoZWlnaHQ9IjEzLjc3IiByeD0iMS43IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMS42Ii8+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTAgNC4zOTFoMTkuNzYxdjIuMTk2SDB6Ii8+PHJlY3QgeD0iMTMuMTc0IiB5PSI5Ljg4MSIgd2lkdGg9IjQuMzkxIiBoZWlnaHQ9IjIuMTk2IiByeD0iMSIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjEzLjE3NCIgeT0iOS44ODEiIHdpZHRoPSI0LjM5MSIgaGVpZ2h0PSIyLjE5NiIgcng9IjEiIHN0cm9rZT0iI2ZmZiIvPjwvc3ZnPg==)"}}/>
                Наложенный платёж
              </div>
            }
          })}
        </div>

        <div className={[sl.contacts, sl.infoBlock].join(' ')}>
          <strong>Контакты</strong>
          {office.contacts.telephone.map((el,index)=>{
            return <div key={index} className={sl.contactPhone}>
              <div className={sl.icon} style={{backgroundImage:"url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1IDEyaDJjMC0yLjc2LTIuMjQtNS01LTV2MmMxLjY2IDAgMyAxLjM0IDMgM3ptNCAwaDJhOSA5IDAgMDAtOS05djJjMy44NyAwIDcgMy4xMyA3IDd6bTEgMy41Yy0xLjI1IDAtMi40NS0uMi0zLjU3LS41Ny0uMS0uMDMtLjIxLS4wNS0uMzEtLjA1LS4yNiAwLS41MS4xLS43MS4yOWwtMi4yIDIuMmExNS4wNDUgMTUuMDQ1IDAgMDEtNi41OS02LjU5bDIuMi0yLjIxYS45Ni45NiAwIDAwLjI1LTFBMTEuMzYgMTEuMzYgMCAwMTguNSA0YzAtLjU1LS40NS0xLTEtMUg0Yy0uNTUgMC0xIC40NS0xIDEgMCA5LjM5IDcuNjEgMTcgMTcgMTcgLjU1IDAgMS0uNDUgMS0xdi0zLjVjMC0uNTUtLjQ1LTEtMS0xek01LjAzIDVoMS41Yy4wNy44OC4yMiAxLjc1LjQ1IDIuNThsLTEuMiAxLjIxYy0uNC0xLjIxLS42Ni0yLjQ3LS43NS0zLjc5ek0xOSAxOC45N2MtMS4zMi0uMDktMi42LS4zNS0zLjgtLjc2bDEuMi0xLjJjLjg1LjI0IDEuNzIuMzkgMi42LjQ1djEuNTF6IiBmaWxsPSIjMzMzIi8+PC9zdmc+)"}}/>
              {el}
            </div>
          })}
          {office.contacts.mail.map((el,index)=>{
            return <div key={index} className={sl.contactMail}>
              <div className={sl.icon} style={{backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4LjA1MyAyLjA4NWwuMjk2LS4xODVIMS42NWwuMjk2LjE4NSA4IDUgLjA1My4wMzMuMDUzLS4wMzMgOC01ek0xOCAxNC4xaC4xVjQuODJsLS4xNTMuMDk1TDEwIDkuODgyIDIuMDUzIDQuOTE1IDEuOSA0LjgydjkuMjhIMTh6bTAtMTRjMS4wNDUgMCAxLjkuODU1IDEuOSAxLjl2MTJjMCAxLjA0NS0uODU1IDEuOS0xLjkgMS45SDJDLjk1NSAxNS45LjEgMTUuMDQ1LjEgMTRWMkMuMS45NTUuOTU1LjEgMiAuMWgxNnoiIGZpbGw9IiMzMzMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuMiIvPjwvc3ZnPg==)"}}/>
              <a href="#">{el}</a>
            </div>
          })}
        </div>
      </div>
      
      <div className={sl.imgInfo}>
        <div className={sl.mapData}>
          <YandexMap 
            cords={[office.cords]}
            describtions={office.adress}
          />
        </div>
        <div className={sl.sliderBlock}>
          <OfficeSlider imgs={office.photos}/>
        </div>
      </div>
    </div>
  )
}

export default OfficeInfo;