const _default={
  from:'',
  to:'',
  orders:[]
}
const SET_OFFICE="SET_OFFICE_PARAMS";
const setPriceParams=(state=_default, action)=>{
  switch (action.type) {
    case SET_OFFICE:
      return {...state, 
        from: action.payload.from,
        to: action.payload.to,
        orders: action.payload.orders,
      }
    default:
      return state;
  }
}

export default setPriceParams;