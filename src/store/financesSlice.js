import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions : [
          {
      id: 1,
      date: "2026-04-01",
      category: "Salary",
      type: "income",
      amount: 5000
    },
    {
      id: 2,
      date: "2026-04-03",
      category: "Food",
      type: "expense",
      amount: 800
    }
    ],
    filter : "all",
    role: "viewer"
}

const financeSlice = createSlice({
    name : "finance",
    initialState,
reducers: {
    addTransaction : (state, action) => {
        state.transactions.push(action.payload)
    },
    setFilter : (state, action) => {
        state.filter = action.payload
    },
    setRole : (state, action)=>{
        state.role = action.payload
    },
    
    deleteTransaction: (state, action) => {
  state.transactions = state.transactions.filter(
    t => t.id !== action.payload
  )
}
}
})

export const {addTransaction, setFilter, setRole} = financeSlice.actions
export default financeSlice.reducer