import React, { useEffect, useState } from "react";
import sl from "./Adresses.module.css";

import SearchSvg from "../../../UI/SearchSvg";
import ListSVG from "./svgs/ListSVG";
import MapSVG from "./svgs/MapSVG";
import Cansel from "../../../UI/Cansel";
import PointsList from "./comps/PointsList";

import pointsJSON from "../../../../data/pointsList.json";
import filterList from "./hooks/filterList";
import PointsMap from "./comps/PointsMap";


const Adresses = () =>{
  scrollTo({top:0, behavior:"smooth"})
  const [pointsList,setPoints]=useState([]);
  const [sortedList,setSorted]=useState([]);

  const [adress,setAdress]=useState('');
  const [cancelVisible, setCancel]=useState(false);
  const [viewStyle,setStyle]=useState('list');
  const [filters,setFilter]=useState([]);

  useEffect(async()=>{
    setPoints(pointsJSON.points);
    setSorted(pointsJSON.points);
  },[]);

  useEffect(()=>{
    if(pointsList.length){
      setSorted( filterList(pointsList,filters) );
    }
  },[filters])

  const settingChange=(setting)=>{
    if(filters.indexOf(setting)!=-1){
      setFilter(filters.filter(el=>el!=setting))
    }else{
      setFilter([...filters, setting]);
    }
  }
  const inputChange=(e)=>{
    setAdress(e.target.value);
    adress ? setCancel(true) : setCancel(false);
  }
  const setActive=(e)=>{
    (e.target).parentNode.classList.toggle(sl.active);
  }
  const setActiveStyle=(e,style)=>{
    setStyle(style);
    const target=e.currentTarget;
    (target).classList.add(sl.active);
    
    (target).nextSibling ? 
    (target).nextSibling.classList.remove(sl.active) :
    (target).previousSibling.classList.remove(sl.active) ;
  }
  return(
    <div className={sl.adressesPage}>
      <div className={sl.officesSelect}>
        <p>Пункты выдачи в <span className={sl.cityCount}> 
          <span className={sl.currentCity}>Алматы </span>
          <span className={sl.countOffuces}> ({sortedList.length})</span> 
        </span></p>
      </div>
      <div className={sl.selectSettings}>
        <div className={sl.selectAdress}>
          <SearchSvg/>
          <input 
            value={adress}
            onChange={(e)=>inputChange(e)}
            onFocus={(e)=>setActive(e)}
            onBlur={(e)=>setActive(e)} 
            type="text" 
            placeholder="Укажите ближайший адрес или метро"
          />
          {cancelVisible
          ?<Cansel close={setAdress} className={sl.closeBtn}/> : <div/>
          }
        </div>
        <div className={sl.settings}>
          <div className={sl.filters}>
            <div className={sl.postamatFilter}>
              <input onChange={()=>settingChange('postamat')} type="checkbox" id="postamat" name="postamat"/>
              <label htmlFor="postamat">Постамат</label>
            </div>
            <div className={sl.postamatFilter}>
              <input onChange={()=>settingChange('highWeight')} type="checkbox" id="highWeight" name="highWeight"/>
              <label htmlFor="highWeight">Прием посылок тяжелее 35 кг</label>
            </div>
            <div className={sl.postamatFilter}>
              <input onChange={()=>settingChange('workSunday')} type="checkbox" id="workSunday" name="workSunday"/>
              <label htmlFor="workSunday">Работает в воскресенье</label>
            </div>
          </div>
          <div className={sl.viewStyle}>
            <div className={sl.mapStyle} onClick={(e)=>setActiveStyle(e,'map')}>
              <div onClick={()=>style} className={sl.mapIconBlock}><MapSVG className={sl.mapIcon}/></div>
              На карте
            </div>
            <div className={[sl.listStyle,sl.active].join(' ')} onClick={(e)=>setActiveStyle(e,'list')}>
              <ListSVG className={sl.listIcon}/>
              Списком
            </div>
          </div>
        </div>
      </div>
      {viewStyle=='map'
      ? <PointsMap points={sortedList}/>
      : <PointsList points={sortedList}/>
      }



    </div>
  )
}

export default Adresses;