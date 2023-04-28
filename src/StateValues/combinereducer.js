import { combineReducers } from "redux";
import contractreducer from "./contractreducer";
import ownerreducer from "./ownerreducer";
import userActivityreducer from "./userActivityreducer";
const reducer = combineReducers({
    contractreducer : contractreducer,
    ownerreducer:ownerreducer,
    userActivityreducer : userActivityreducer
})
export default reducer;