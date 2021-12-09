const _default={
  from:'',
  to:'',
}
const SET_FROMTO="SET_FROMTO";
const setFromTo=(state=_default, action)=>{
  switch (action.type) {
    case SET_FROMTO:
      return {...state, 
        from: action.payload.from,
        to: action.payload.to,
      }
    default:
      return state;
  }
}

export default setFromTo;