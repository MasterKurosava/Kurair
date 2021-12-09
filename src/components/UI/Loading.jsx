import React from "react";

const Loading=()=>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "transparent", display: "block", shapeRendering: "auto"}} width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g>
      <path d="M50 19A31 31 0 1 0 81 50.00000000000001" fill="none" stroke="#00a942" strokeWidth="8"></path>
      <path d="M49 4L49 34L64 19L49 4" fill="#00a942"></path>
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.075268817204301s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </g>
    </svg>
  )
}

export default Loading;