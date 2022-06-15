import cartHandler from "./CartHandeler";

import { combineReducers } from "redux";

const rootReducer=combineReducers(
    {cart_state :cartHandler}
);

export default rootReducer;