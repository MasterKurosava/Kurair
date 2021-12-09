import {createStore} from "redux";
import { combineReducers } from "redux";
import setPriceParams from "./reducers/priceParams";
import setFromTo from "./reducers/setFromTo";
import setOrderId from "./reducers/setOrderId";

const rootReducer=combineReducers({
  priceParams:setPriceParams,
  fromTo:setFromTo,
  orderId:setOrderId
});

export const store=createStore(rootReducer);