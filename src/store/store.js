import { configureStore } from "@reduxjs/toolkit";

import financeReducer from "./financesSlice"



export const store = configureStore({
    reducer: {
        finance : financeReducer
    }
})