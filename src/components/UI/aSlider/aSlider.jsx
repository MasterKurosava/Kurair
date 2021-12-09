import React, { useEffect, useRef, useState } from "react";

import sl from "./aSlider.module.css";
import string from "../../../images/string.png";
import stringWhite from "../../../images/stringWhite.png";
import useDebounce from "../../../utils/debounce";

const reqASliderImgs=require.context('./aSliderImgs/',true, /\.jpg$/);
const allASliderImgs=reqASliderImgs.keys();
const imgs=allASliderImgs.map((link,index)=>{return reqASliderImgs(allASliderImgs[index]).default})

let delayPhoto=null;
let animDelay=null;

const ASlider=()=>{
  const [prev,setPrev]=useState(0);
  const [current,setCurrent]=useState(1);
  const [next, setNext]=useState(2);
  const [blockAnimStyle, setBlockStyle]=useState('');

  const prevImg=()=>{
    if (animDelay) return;
    clearTimeout(delayPhoto);
    startAnimation(sl.toRight);
    setNext(current);
    setCurrent(prev);
    if(prev-1<0) setPrev(imgs.length-1);
    else setPrev(prev-1);
  }

  const nextImg=()=>{
    if (animDelay) return;
    clearTimeout(delayPhoto);
    startAnimation(sl.toLeft);
    setPrev(current);
    setCurrent(next);
    if(next+1==imgs.length) setNext(0);
    else setNext(next+1);
  }

  const startAnimation=(direction)=>{
    setBlockStyle(direction);
    animDelay=setTimeout(()=>{
      animDelay=null;
      setBlockStyle(null);
    },500)
  }

  const activeString=(e)=>{ 
    if ((e.target).firstChild) (e.target).firstChild.src=stringWhite; 
    else (e.target).src=stringWhite;
  }
  const deactiveString=(e)=>{ 
    if ((e.target).firstChild) (e.target).firstChild.src=string;
    else (e.target).src=string;
  }
  const timer=useDebounce(next, nextImg,5000);

  return(
    <div className={sl.aSlider}>
      <div className={sl.sliderContainer}>

        <div className={sl.sliderButtons}>
          <div className={sl.prevButton} 
            onMouseEnter={(e)=>activeString(e)} 
            onMouseLeave={(e)=>deactiveString(e)}
            onClick={()=>prevImg()}
          >
            <img src={string}/>
          </div>
          <div className={sl.nextButton} 
            onMouseEnter={(e)=>activeString(e)} 
            onMouseLeave={(e)=>deactiveString(e)}
            onClick={()=>nextImg()}
          >
            <img src={string}/>
          </div>
        </div>

        <div className={[blockAnimStyle ,sl.sliderBlocks].join(' ')}>
          <div className={[sl.sliderBlock, sl.siteBlock].join(' ')}>
            <img src={imgs[prev]}/>
          </div>
          <div className={[sl.sliderBlock, sl.mainBlock].join(' ')}>
            <img src={imgs[current]}/>
          </div>
          <div className={[sl.sliderBlock, sl.siteBlock].join(' ')}>
            <img src={imgs[next]}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ASlider