import { useEffect } from "react"
import MainRoutes from './routes/MainRoutes'
import Header from "./components/Header"

const App = () => {



  return (
    <div className='bg-white dark:bg-zinc-900 text-black dark:text-white min-h-screen'>
     <Header/>
      <MainRoutes/>
    </div>
  )
}

export default App