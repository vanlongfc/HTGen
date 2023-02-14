import { all, fork } from "redux-saga/effects";

import accountSaga from "./accountSaga";
import roleSaga from "./roleSaga";
import customerSaga from "./customerSaga";

export function* rootSagas() {
  yield all([fork(accountSaga)]);
  yield all([fork(roleSaga)]);
  yield all([fork(customerSaga)]);
}
export default rootSagas;
