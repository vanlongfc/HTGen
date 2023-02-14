import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import roleReducer from "./roleReducer";
import customerReducer from "./customerReducer";

const rootReducers = combineReducers({
  accountReducer,
  roleReducer,
  customerReducer,
});
export default rootReducers;
