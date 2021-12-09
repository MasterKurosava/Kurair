import React from "react";
import sl from "../Adresses.module.css";
import YandexMap from "./Map/YandexMap";

const PointsMap=({points})=>{
  const allCords=points.map(el=>{return el.cords});
  const allDescribtions=points.map(el=>{return el.adress})
  return(
    <div className={sl.mapOffices}>
      <YandexMap
        cords={allCords}
        describtions={allDescribtions}
        cityCenter={[43.240808, 76.917892]}
      />
    </div>
  )
}
export default PointsMap;