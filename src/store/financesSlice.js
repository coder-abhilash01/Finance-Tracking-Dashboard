import { createSlice } from "@reduxjs/toolkit";


const transactionData = [
    { id: '1', date: '2026-03-28', category: 'Salary', type: 'income', amount: 85000 },
    { id: '2', date: '2026-03-30', category: 'Rent', type: 'expense', amount: 15000 },
    { id: '3', date: '2026-04-01', category: 'Freelance', type: 'income', amount: 12000 },
    { id: '4', date: '2026-04-02', category: 'Shopping', type: 'expense', amount: 4500 },
    { id: '5', date: '2026-04-03', category: 'Stocks', type: 'income', amount: 8000 },
    { id: '6', date: '2026-04-04', category: 'Groceries', type: 'expense', amount: 3200 },
    { id: '7', date: '2026-04-05', category: 'Dining', type: 'expense', amount: 2100 },
    { id: '8', date: '2026-04-06', category: 'Subscription', type: 'expense', amount: 999 },
    { id: '9', date: '2026-04-07', category: 'Consultation', type: 'income', amount: 5500 },
    { id: '10', date: '2026-04-08', category: 'Fuel', type: 'expense', amount: 3000 },
  ]

const initialState = {
    transactions : JSON.parse(localStorage.getItem("transactions")) || transactionData,
    filter : "all",
    role: localStorage.getItem("role") || "user",
    isMobileMenuOpen: false,
}

const financeSlice = createSlice({
    name : "finance",
    initialState,
reducers: {
    addTransaction : (state, action) => {
    
        state.transactions.push(action.payload)
        localStorage.setItem("transactions", JSON.stringify(state.transactions))
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
  localStorage.setItem("transactions", JSON.stringify(state.transactions))
},

toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = true;

        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;

        }


}
})

export const {addTransaction, setFilter, setRole, toggleMobileMenu, closeMobileMenu, deleteTransaction} = financeSlice.actions
export default financeSlice.reducer