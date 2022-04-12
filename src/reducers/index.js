import {CustomerBalanceReducer} from "./Customer/CustomerBalance"
import { auth } from "./auth"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
	CustomerBalanceReducer,auth
})

export default rootReducer
