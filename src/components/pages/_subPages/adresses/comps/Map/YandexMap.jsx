import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import placemark from "./placemark.png"

const YandexMap=({cords, cityCenter, describtions})=>{
  if(cords.length==1){
    return(
      <YMaps>
        <Map 
        width="100%" 
        height="100%"
        defaultState={{ center:cords[0], zoom:13, controls:['zoomControl','searchControl']}}
        modules={['control.ZoomControl','control.SearchControl']}
        >
          <Placemark
            modules={['geoObject.addon.balloon']}
            defaultGeometry={cords[0]}
            options={{
              iconLayout: 'default#image',
              iconImageHref: placemark,
              iconImageSize:[60,60],
              iconImageOffset: [-30, -60]
            }}
          />
        </Map>
      </YMaps>
    )
  }else{
    return(
      <YMaps>
      <Map 
      width="100%" 
      height="100%"
      defaultState={{ center:cityCenter, zoom:12, controls:['zoomControl','searchControl']}}
      modules={['control.ZoomControl','control.SearchControl']}
      >
      {cords.map((cord,index)=>{
        console.log(cord);
        return <Placemark
          modules={['geoObject.addon.balloon']}
          defaultGeometry={cord}
          properties={{
            balloonContentBody: describtions[index],
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: placemark,
            iconImageSize:[40,40],
            iconImageOffset: [-20, -40]
          }}
        />})
        }
      </Map>
    </YMaps>
    )
  }
  return(
    <YMaps>
      <Map 
      width="100%" 
      height="100%"
      defaultState={{ center:cords[0], zoom:13, controls:['zoomControl','searchControl']}}
      modules={['control.ZoomControl','control.SearchControl']}
      >
        {cords.length==1
          ? <Placemark
            modules={['geoObject.addon.balloon']}
            defaultGeometry={cords[0]}
            options={{
              iconLayout: 'default#image',
              iconImageHref: placemark,
              iconImageSize:[80,80],
              iconImageOffset: [-40, -80]
            }}
          />
        : cords.map((cord,index)=>{
          console.log(cord);
          return <Placemark
            modules={['geoObject.addon.balloon']}
            defaultGeometry={[cord]}
            properties={{
              balloonContentBody: describtions[index],
            }}
            options={{
              iconLayout: 'default#image',
              iconImageHref: placemark,
              iconImageSize:[80,80],
              iconImageOffset: [-40, -80]
            }}
          />
        })
        }
      </Map>

    </YMaps>
  )
}
export default YandexMap;