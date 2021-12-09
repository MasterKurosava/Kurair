import React, { useEffect, useRef, useState } from "react";
import sl from "./OfficeSlider.module.css";


const OfficeSlider=({imgs})=>{  
  const [current,setCurrent]=useState(0);
  const row=useRef();
  const prevBtn=useRef();
  const nextBtn=useRef();

  const checkDisable=()=>{
    prevBtn.current.classList.remove(sl.disabled);
    nextBtn.current.classList.remove(sl.disabled);
    if(imgs.length<3){
      prevBtn.current.classList.add(sl.disabled);
      nextBtn.current.classList.add(sl.disabled);
      return;
    }
    else if(current==0)              prevBtn.current.classList.add(sl.disabled);
    else if(current==imgs.length-2)  nextBtn.current.classList.add(sl.disabled);
  }
  const prevImg=()=>{
    if(current-1!=-1) setCurrent(current-1)
  }

  const nextImg=()=>{
    if(current!=imgs.length-2) setCurrent(current+1)
  }
  useEffect(()=>{
    checkDisable();
    (row.current).style.transform=`translate3d(${current*-390}px,0,0)`;
    (row.current).style.transition=`300ms`;
  },[current])

  return(
    <div className={sl.sliderContainer}>
      <div className={sl.buttonsRow}>
        <div className={sl.buttons}>
          <button ref={prevBtn} className={sl.buttonPre} onClick={()=>prevImg()}>
            <svg  width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M8 15L1 8L8 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <button ref={nextBtn} className={sl.buttonNext} onClick={()=>nextImg()}>
            <svg  width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 15L1 8L8 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={sl.slider}>
        <div ref={row} className={sl.imgsRow}>
          {imgs.map((el,index)=>{
            return <div key={index} className={sl.sliderBlock}><img src={el}/></div>
          })}
        </div>
      </div>
    </div>
    )
}

export default OfficeSlider;