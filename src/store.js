import { configureStore } from "@reduxjs/toolkit";
import cuteCatsReducer from "./features/cuteCats/cuteCatsSlice"

const store = configureStore({
  reducer: {
    cuteCats: cuteCatsReducer,
    // users: usersReducer
  }
})

export default store