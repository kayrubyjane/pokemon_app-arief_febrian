import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducers";

const store = configureStore({
     reducer: {
          app: appReducer
     }
})

export default store