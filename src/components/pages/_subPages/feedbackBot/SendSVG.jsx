import React from "react";

const SendSvg=React.forwardRef(({style, send, value}, ref)=>{
  return(
  <svg
    ref={ref} className={style} onClick={()=>send(value)}
    xmlns="http://www.w3.org/2000/svg" xmlnslink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-send-circle"
    width="35" height="35" viewBox="0 0 24 24">
    <path
      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z" 
    />
  </svg>
  )
})

export default SendSvg;