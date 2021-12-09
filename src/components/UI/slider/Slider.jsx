import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../../utils/debounce";
import sl from "../../UI/slider/Slider.module.css";

const reqSliderImg= require.context('./sliderImages/',true,/\.(png|jpg)/);
const allSliderImg= reqSliderImg.keys();

const imgs=allSliderImg.map((link,index)=>{
  return reqSliderImg(allSliderImg[index]).default;
});

const Slider=()=>{
  const row=useRef();
  const [current,setCurrent]=useState(0);
  const prevImg=()=>{
    current-1==-1 ? setCurrent(imgs.length-2) : setCurrent(current-1);
  }
  const nextImg=()=>{
    current+1==imgs.length-1 ? setCurrent(0) : setCurrent(current+1);
  }

  const timer=useDebounce(current, nextImg,8000);

  useEffect(()=>{
    row.current.style.transform=`translate3d(${current*-550}px, 0, 0)`;
    row.current.style.transition="300ms";
  },[current]);

  

  return(
    <div className={sl.slider}>
      <div className={sl.container}>
        <div className={sl.sliderBlock}>
          <img onClick={()=>prevImg()} className={sl.string} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABkUlEQVRoge3aP0oDQRTH8e+YWRD7CN7AIn+IEXuNleJRAgreIhaCN7GwMoXWSURNIDdQ9AibzXoDIZP3Z4v99TO8D2x2Z94L1KlT57+E1IWdyc0rsEfWuPjo3v0I1pSUndSFZQi7QJ98Ne683+4L1pSUZEgM+SXwCaFFXrz0J9cHgnVtnORHC6A3GzaLdRwDbWCZUZ5Nj++/ZErbLFtBoDqYrSFQDYwIBPwxYhDwxYhCwA8jDgEfjAoE7DFqELDFqELADqMOARuMCQT0MWYQ0MWYQkAPYw4BHYwLBOQxbhCQxSTfECXydvTwS9Y4h3IOHOZleEzdyxUiGVdIbzZskhfPEFrAsijjVepelfmxF+t4ujgZfafuV4nX77YIqMAHUQIBzkcUKQQ4HholEeB0jJdGgMPFSgMBxlddLQQYNh80EWDUDtJGgEGDzgIByi1TKwQoNrEtEaA0VrBGgMKgxwMBwqM3LwRsAakSAiCmLiyK+ESgDeWcLA4W3ZHrrD39qhtYAVOyOKjCHwbq1Knzf/4ABl9vSaaN9G0AAAAASUVORK5CYII="></img>
          <div className={sl.photoData}>
            <div ref={row} className={sl.photosRow}>
              {imgs.map(el=>{
                return <div key={el} className={sl.photo}><img src={el}/></div>
              })}
            </div>
          </div>
          <img onClick={()=>nextImg()} className={sl.string} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABkUlEQVRoge3aP0oDQRTH8e+YWRD7CN7AIn+IEXuNleJRAgreIhaCN7GwMoXWSURNIDdQ9AibzXoDIZP3Z4v99TO8D2x2Z94L1KlT57+E1IWdyc0rsEfWuPjo3v0I1pSUndSFZQi7QJ98Ne683+4L1pSUZEgM+SXwCaFFXrz0J9cHgnVtnORHC6A3GzaLdRwDbWCZUZ5Nj++/ZErbLFtBoDqYrSFQDYwIBPwxYhDwxYhCwA8jDgEfjAoE7DFqELDFqELADqMOARuMCQT0MWYQ0MWYQkAPYw4BHYwLBOQxbhCQxSTfECXydvTwS9Y4h3IOHOZleEzdyxUiGVdIbzZskhfPEFrAsijjVepelfmxF+t4ujgZfafuV4nX77YIqMAHUQIBzkcUKQQ4HholEeB0jJdGgMPFSgMBxlddLQQYNh80EWDUDtJGgEGDzgIByi1TKwQoNrEtEaA0VrBGgMKgxwMBwqM3LwRsAakSAiCmLiyK+ESgDeWcLA4W3ZHrrD39qhtYAVOyOKjCHwbq1Knzf/4ABl9vSaaN9G0AAAAASUVORK5CYII="></img>
        </div>
        <div className={sl.navigation}>
          {imgs.map((el,index)=>{
            if(index==imgs.length-1) return
            return <div key={index} onClick={()=>setCurrent(index)} className={classNames(sl.navItem, {'Slider-module_active_Ve':current==index})}/>
          })}
        </div>
      </div>
    </div>
  )
}
export default Slider;