const _default={
  id:''
}
const SET_ORDER_ID="SET_ORDER_ID";
const setOrderId=(state=_default, action)=>{
  switch (action.type) {
    case SET_ORDER_ID:
      return {...state, id:action.payload
      }
    default:
      return state;
  }
}

export default setOrderId;