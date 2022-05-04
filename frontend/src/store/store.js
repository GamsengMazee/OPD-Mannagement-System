import { createStore, combineReducers } from "redux";
import reducer from './reducer/reducer';

const rootReducer = combineReducers({
    reducer: reducer
})

const store = createStore(rootReducer)

export default store;